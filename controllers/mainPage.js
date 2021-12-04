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

exports.getNewProduct = (req, res, next) => {
  res.render("menuView.ejs",{
    pageHeader:'Add New Product'
  });
};

exports.getStock = (req, res, next) => {
    res.render("menuView.ejs",{
        pageHeader:'Stocks'
      });
};

exports.getEditProduct = (req, res, next) => {
    res.render("menuView.ejs",{
        pageHeader:'Edit Product'
      });
};

exports.getNewOrder = (req, res, next) => {
    res.render("menuView.ejs",{
        pageHeader:'Create New Order'
      });
};

exports.getActiveOrders = (req, res, next) => {
    res.render("menuView.ejs",{
        pageHeader:'Active Orders'
      });
};

exports.getEditOrder = (req, res, next) => {
    res.render("menuView.ejs",{
        pageHeader:'Edit Order'
      });
};

exports.getRequestProduct = (req, res, next) => {
    res.render("menuView.ejs",{
        pageHeader:'Request a Product'
      });
};

exports.getPartSearch = (req, res, next) => {
    res.render("menuView.ejs",{
        pageHeader:'Part Search System'
      });
};

exports.getCheckParts = (req, res, next) => {
    res.render("menuView.ejs",{
        pageHeader:'Check Part Compability'
      });
};