const System = require("../Model/System");
const Employee = require("../Model/Employee");

exports.getLoginPage = (req, res, next) => {
  res.render("login.ejs");
};

exports.postLoginPage = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await Employee.findByName(username, password);
  if (user[0][0]) {
    //console.log(user[0][0]);
    req.session.isLoggedIn = true;
    req.session.user = user[0][0];
    return req.session.save((err) => {
      res.redirect("/");
    });
  } else {
    res.redirect("/login");
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};


exports.getMainPage = (req, res, next) => {
  res.render("main", {
    pageHeader: "Business Tracking Panel",
    user:req.session.user,
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
