const fetch = require("cross-fetch");

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

exports.getAProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  const getAProduct = await fetch(`http://127.0.0.1:3001/part/${prodId}`);
  const data = await getAProduct.json();

  const getABrand = await fetch(
    `http://127.0.0.1:3001/brand/${data[0].BrandID}`
  );
  const dataInBrand = await getABrand.json();

  const getProductInStorage = await fetch(
    `http://127.0.0.1:3001/storage/${data[0].BarcodNumber}`
  );
  const dataInStorage = await getProductInStorage.json();

  res.render("part", {
    part: data[0],
    brand: dataInBrand[0],
    storage: dataInStorage,
    pageHeader: `${prodId}`,
  });
};

exports.editProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  const getAProduct = await fetch(`http://127.0.0.1:3001/part/${prodId}`);
  const data = await getAProduct.json();

  res.render("editProduct", {
    part: data[0],
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
  const partId = req.body.PartId;

  const part = await fetch(`http://127.0.0.1:3001/parts-for-car/${partId}`);
  const data = await part.json();

  for (const parts of data) {
    const car = await fetch(`http://127.0.0.1:3001/car/${parts.CarID}`);
    const carData = await car.json();

    const carPart = carData[0];

    const getABrand = await fetch(
      `http://127.0.0.1:3001/brand/${carPart.CarBrandID}`
    );
    const [brand] = await getABrand.json();
    carPart.Logo = brand.Logo;

    cars.push(carPart);
  }

  res.render("checkPart", {
    pageHeader: "Part Compatibility Check",
    partid: req.body.PartId,
    cars: cars,
  });
};
