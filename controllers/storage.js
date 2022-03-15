const fetch = require("cross-fetch");
const baseURL = "http://127.0.0.1:3001"

exports.getStock = async (req, res, next) => {
  const allProducts = await fetch(`${baseURL}/parts`);
  const data = await allProducts.json();
  res.render("stock", {
    parts: data.reverse(),
    pageHeader: "Products in Stock",
  });
};
