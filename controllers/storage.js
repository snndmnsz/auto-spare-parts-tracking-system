const fetch = require("cross-fetch");

exports.getStock = async (req, res, next) => {
  const allProducts = await fetch("http://127.0.0.1:3001/parts");
  const data = await allProducts.json();
  res.render("stock", {
    parts: data.reverse(),
    pageHeader: "Products in Stock",
  });
};
