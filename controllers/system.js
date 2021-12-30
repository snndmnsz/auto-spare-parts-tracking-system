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

exports.getSearch = (req, res, next) => {
  res.redirect(`/product/${req.body.search}`);
};

exports.getSettings = (req, res, next) => {
  res.render("menuView.ejs", {
    pageHeader: "Settings",
  });
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

