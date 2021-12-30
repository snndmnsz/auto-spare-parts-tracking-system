const Part = require("../Model/Part");
const System = require("../Model/System");

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

exports.editProduct = async(req, res, next) => {
  const prodId = req.params.productId;

  const findProduct = await Part.findById(prodId);

  res.render("editProduct", {
    part: findProduct[0][0],
    pageHeader: `Editing ${prodId}`,
  });
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
