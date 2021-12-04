exports.getLoginPage = (req, res, next) => {
  res.render("login.ejs");
};

exports.postLoginPage = (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
};

exports.getMainPage = (req, res, next) => {
  res.render("main.ejs");
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
  

exports.getStock = (req, res, next) => {
  res.render("stock.ejs", {
    pageHeader: "Products in Stock",
  });
};

exports.getEditProduct = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Edit Product",
  });
};

exports.getNewOrder = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Create Order",
  });
};

exports.getActiveOrders = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "View Active Orders",
  });
};

exports.getEditOrder = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Edit Order",
  });
};

exports.getRequestProduct = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Supply Product",
  });
};

exports.getPartSearch = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Part Inquiry",
  });
};

exports.getCheckParts = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Part Compatibility Check",
  });
};
