const Part = require("../Model/Part");
const Order = require("../Model/Order");
const System = require("../Model/System");

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
                storage:storage,
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

exports.getNewOrder = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Create Order",
  });
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

exports.getEditOrder = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Edit Order",
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
  res.render("menuView.ejs", {
    pageHeader: "Part Compatibility Check",
  });
};
