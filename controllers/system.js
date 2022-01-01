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
    isManager: req.session.manager,
  });
};

exports.getSearch = (req, res, next) => {
  res.redirect(`/product/${req.body.search}`);
};

exports.getSettings = async (req, res, next) => {
  const userReq = await fetch(
    `http://127.0.0.1:3001/user/find/${req.session.user.EmployeeID}`
  );
  const [user] = await userReq.json();

  res.render("settings", {
    pageHeader: "User Information",
    user: user,
  });
};

exports.saveSettings = async (req, res, next) => {
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const Image = req.body.Image;
  const EmployeeID = req.session.user.EmployeeID;

  const currentUser = {
    EmployeeID: EmployeeID,
    Name: Name,
    Surname: Surname,
    Email: Email,
    Username: Username,
    Password: Password,
    Image: Image,
  };

  const settingsUser = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentUser),
  };

  try {
    const updateUser = await fetch(
      `http://127.0.0.1:3001/user/patch`,
      settingsUser
    );
    return res.redirect("/settings");
  } catch (e) {
    return e;
  }
};

exports.getBills = async (req, res, next) => {
  const bills = await fetch("http://127.0.0.1:3001/bills");
  const data = await bills.json();

  var total = 0;
  data.forEach((element) => {
    total = total + Math.round(element.TotalCost * 100) / 100;
  });
  res.render("bill", {
    bills: data,
    total: total,
    pageHeader: "Bills",
  });
};

exports.getEmployees = async (req, res, next) => {
  const employees = await fetch("http://127.0.0.1:3001/users");
  const data = await employees.json();

  res.render("employees", {
    emp: data,
    pageHeader: "All Employees",
  });
};


exports.getMessages = async (req, res, next) => {
  const messages = await fetch("http://127.0.0.1:3001/messages");
  const data = await messages.json();

  console.log(data);

  res.render("messages", {
    messages: data,
    pageHeader: "Admin Messages",
  });
};

