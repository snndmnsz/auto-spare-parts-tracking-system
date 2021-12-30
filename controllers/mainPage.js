const Part = require("../Model/Part");
const Order = require("../Model/Order");
const System = require("../Model/System");
const randomstring = require("randomstring");

exports.getLoginPage = (req, res, next) => {
  res.render("login.ejs");
};

exports.postLoginPage = (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
};

exports.getMainPage = (req, res, next) => {
  res.render("main.ejs", {
    pageHeader: "Business Tracking Panel",
  });
};

exports.getSearch = (req, res, next) => {
  res.redirect(`/product/${req.body.search}`);
};

exports.getSettings = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Settings",
  });
};

exports.getNewProduct = (req, res, next) => {
  res.render("newProduct.ejs", {
    pageHeader: "New Product Entry",
  });
};

exports.postNewProduct = (req, res, next) => {
  console.log(req.body);
  //System.insertStorage("YMZVX4C2Z8","Y",31,31);
  res.redirect("/");
};

exports.getAProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Part.findById(prodId)
    .then(([rows, fieldData]) => {
      System.getBrandById(rows[0].BrandID)
        .then(([brand, brandFieldData]) => {
          //console.log(brand[0]);

          System.getProductsInStoragebyID(rows[0].BarcodNumber)
            .then(([storage, fieldData]) => {
              res.render("part", {
                part: rows[0],
                brand: brand[0],
                storage: storage,
                pageHeader: `${prodId}`,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.getStock = (req, res, next) => {
  Part.fetchAll()
    .then(([rows, fieldData]) => {
      //console.log(rows);
      res.render("stock", {
        parts: rows,
        pageHeader: "Products in Stock",
      });
    })
    .catch((err) => console.log(err));
};

exports.editProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Part.findById(prodId)
    .then(([rows, fieldData]) => {
      console.log(rows);
      res.render("editProduct", {
        part: rows[0],
        pageHeader: `Editing ${prodId}`,
      });
    })
    .catch((err) => console.log(err));
};

exports.getBills = (req, res, next) => {
  System.getBills()
    .then(([rows, fieldData]) => {
      var total = 0;
      rows.forEach((element) => {
        total = total + Math.round(element.TotalCost * 100) / 100;
      });
      res.render("bill", {
        bills: rows,
        total: total,
        pageHeader: "Bills",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCreateOrder = (req, res, next) => {

  const OrderId = randomstring.generate({
    capitalization :"uppercase",
    length:5
  });


  res.render("createOrder", {
    pageHeader: "Create Order",
    orderId:OrderId
  });
};

exports.postCreateOrder = (req, res, next) => {
  console.log(req.body);
  res.redirect("/new-order")
};




exports.getActiveOrders = (req, res, next) => {
  Order.fetchActiveOrders()
    .then(([rows, fieldData]) => {
      //console.log(rows);
      res.render("activeOrder", {
        orders: rows,
        pageHeader: "Active Orders",
      });
    })
    .catch((err) => console.log(err));
};


exports.getViewOrder = (req, res, next) => {
  res.render("viewOrder", {
    pageHeader: "View Order",
    OrderID:'',
    parts:[]
  });
};

exports.postViewOrder = async(req, res, next) => {
  const parts = await Order.findPartsInOrder(req.body.OrderId);


  res.render("viewOrder", {
    pageHeader: "View Order",
    orderId:req.body.OrderId,
    parts:parts[0]
  });

};



exports.getAddCustomer = (req, res, next) => {
  res.render("newCustomer", {
    pageHeader: "Add New Customer",
  });
};

exports.getCustomers = (req, res, next) => {
  System.getAllCustomers()
    .then(([rows, fieldData]) => {
      res.render("customers", {
        customers: rows,
        pageHeader: "Customers",
      });
    })
    .catch((err) => console.log(err));
};

exports.editCustomer = (req, res, next) => {
  const customerId = req.params.customerId;

  System.findCustomerById(customerId)
    .then(([rows, fieldData]) => {
      res.render("editCustomer", {
        customer: rows[0],
        pageHeader: `Editing Customer: ${customerId}`,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckParts = (req, res, next) => {
  res.render("checkPart", {
    pageHeader: "Part Compatibility Check",
    partid: "",
    cars: [],
  });
};

exports.postCheckParts = async (req, res, next) => {
  const cars = [];
  const part = await Part.getPartsForCars(req.body.PartId);
  for (const parts of part[0]) {
    const car = await System.findCarById(parts.CarID);
    const carPart = car[0][0];

    const brand = await System.getBrandById(carPart.CarBrandID);
    carPart.Logo = brand[0][0].Logo;

    cars.push(carPart);
  }

  res.render("checkPart", {
    pageHeader: "Part Compatibility Check",
    partid: req.body.PartId,
    cars: cars,
  });
};
