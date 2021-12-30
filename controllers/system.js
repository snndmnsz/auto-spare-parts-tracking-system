const fetch = require("cross-fetch");

exports.getLoginPage = (req, res, next) => {
  res.render("login", {
    error: "hidden",
  });
};

exports.postLoginPage = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const userReq = await fetch(
    `http://127.0.0.1:3001/user/?username=${username}&password=${password}`
  );
  const [user] = await userReq.json();

  if (user) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    if (user.IsManager) {
      req.session.manager = true;
      console.log("MANAGER LOGGED IN");
    } else {
      console.log("EMPLOYEE LOGGED IN");
    }
    return req.session.save((err) => {
      res.redirect("/");
    });
  } else {
    res.render("login", {
      error: "visible",
    });
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};

exports.getMainPage = async (req, res, next) => {
  const messagesReq = await fetch("http://127.0.0.1:3001/messages");
  const messages = await messagesReq.json();

  let announcement = [];
  let systems = [];

  for (mess of messages) {
    if (mess.MessageType === "Announcement") {
      announcement.push(mess);
    } else if (mess.MessageType === "System") {
      systems.push(mess);
    }
  }
  res.render("main", {
    pageHeader: "Business Tracking Panel",
    user: req.session.user,
    announcement: announcement,
    systems: systems,
  });
};

exports.getSearch = (req, res, next) => {
  res.redirect(`/product/${req.body.search}`);
};

exports.getSettings = (req, res, next) => {
  res.render("settings", {
    pageHeader: "User Information",
    user: req.session.user,
  });
};

exports.getBills = async (req, res, next) => {
  const bills = await fetch("http://127.0.0.1:3001/bills");
  const data = await bills.json();

  var total = 0;
  data.forEach((element) => {
    total = total + Math.round(element.TotalCost * 100) / 100;
  });

  console.log(data);

  res.render("bill", {
    bills: data,
    total: total,
    pageHeader: "Bills",
  });
};
