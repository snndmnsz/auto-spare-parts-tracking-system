const Part = require("../Model/Part");

exports.getStock = async (req, res, next) => {
  const allProducts = await Part.fetchAll();

  res.render("stock", {
    parts: allProducts[0],
    pageHeader: "Products in Stock",
  });
};
