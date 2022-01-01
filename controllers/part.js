const fetch = require("cross-fetch");

exports.getNewProduct = (req, res, next) => {
  res.render("newProduct.ejs", {
    pageHeader: "New Product Entry",
  });
};

exports.postNewProduct = async (req, res, next) => {
  const PartID = req.body.PartID;
  const PartName = req.body.PartName;
  const Year = req.body.Year;
  const IsSecondHand = req.body.IsSecondHand;
  const BrandID = req.body.BrandID;
  const BarcodNumber = req.body.BarcodNumber;
  const Price = req.body.Price;
  const CurrencyStatus = req.body.CurrencyStatus;
  const Quantity = req.body.Quantity;
  const RackPlace = req.body.RackPlace;
  const ShelveNumber = req.body.ShelveNumber;
  const Details = req.body.Details;

  const part = {
    PartID: PartID,
    PartName: PartName,
    Year: Year,
    IsSecondHand: IsSecondHand,
    BrandID: BrandID,
    BarcodNumber: BarcodNumber,
    Price: Price,
    CurrencyStatus: CurrencyStatus,
    Details: Details,
  };

  const stock = {
    BarcodNumber: BarcodNumber,
    Quantity: Quantity,
    RackPlace: RackPlace,
    ShelveNumber: ShelveNumber,
  };

  const settingsPart = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(part),
  };
  const settingStorage = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stock),
  };

  const allProducts = await fetch("http://127.0.0.1:3001/parts");
  const data = await allProducts.json();

  for (let part of data) {
    if (part.PartID === PartID && part.BarcodNumber === BarcodNumber) {
      try {
        const storagePost = await fetch(
          `http://127.0.0.1:3001/storage/post`,
          settingStorage
        );
        return res.redirect("/");
      } catch (e) {
        return e;
      }
    }
  }

  try {
    const partPost = await fetch(
      `http://127.0.0.1:3001/part/post`,
      settingsPart
    );
    try {
      const storagePost = await fetch(
        `http://127.0.0.1:3001/storage/post`,
        settingStorage
      );
    } catch (e) {
      return e;
    }
  } catch (e) {
    return e;
  }

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

exports.postEditProduct = async (req, res, next) => {
  const PartID = req.body.PartID;
  const PartName = req.body.PartName;
  const Year = req.body.Year;
  const IsSecondHand = req.body.IsSecondHand;
  const BrandID = req.body.BrandID;
  const BarcodNumber = req.body.BarcodNumber;
  const Price = req.body.Price;
  const CurrencyStatus = req.body.CurrencyStatus;
  const Details = req.body.Details;

  const part = {
    PartID: PartID,
    PartName: PartName,
    Year: Year,
    IsSecondHand: IsSecondHand,
    BrandID: BrandID,
    BarcodNumber: BarcodNumber,
    Price: Price,
    CurrencyStatus: CurrencyStatus,
    Details: Details,
  };

  const settingsPart = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(part),
  };

  try {
    const updatePart = await fetch(
      `http://127.0.0.1:3001/part/patch`,
      settingsPart
    );
    return res.redirect("/stock");
  } catch (e) {
    return e;
  }
};

exports.deleteAPart = async (req, res, next) => {
  const partId = req.body.PartID;

  const settingStorage = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      PartID: partId,
    }),
  };
  try {
    const deletePartPost = await fetch(
      `http://127.0.0.1:3001/part/delete`,
      settingStorage
    );
    return res.redirect("/stock");
  } catch (e) {
    return e;
  }
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
