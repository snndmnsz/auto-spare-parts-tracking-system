const fetch = require("cross-fetch");
var path = require("path");
var pdf = require("pdf-creator-node");
var fs = require("fs");
const baseURL = "http://127.0.0.1:3001"

exports.getLoginPage = (req, res, next) => {
  res.render("login", {
    error: "hidden",
  });
};

exports.postLoginPage = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const userReq = await fetch(
    `${baseURL}/user/?username=${username}&password=${password}`
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
  const messagesReq = await fetch(`${baseURL}/messages`);
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
    announcement: announcement.slice(0, 2).reverse(),
    systems: systems.slice(0, 2).reverse(),
    isManager: req.session.manager,
  });
};

exports.getSearch = (req, res, next) => {
  res.redirect(`/product/${req.body.search}`);
};

exports.getSettings = async (req, res, next) => {
  const userReq = await fetch(
    `${baseURL}/user/find/${req.session.user.EmployeeID}`
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
      `${baseURL}/user/patch`,
      settingsUser
    );
    return res.redirect("/settings");
  } catch (e) {
    return e;
  }
};

exports.getBills = async (req, res, next) => {
  const bills = await fetch(`${baseURL}/bills`);
  const data = await bills.json();

  var total = 0;
  data.forEach((element) => {
    total = total + Math.round(element.TotalCost * 100) / 100;
  });
  res.render("bill", {
    bills: data.reverse(),
    total: total,
    manager: req.session.manager,
    pageHeader: "Bills",
  });
};

exports.getInvoice = async (req, res, next) => {
  const BillID = req.params.id;

  var filePath = path.join(
    path.resolve(__dirname, ".."),
    `/data/${BillID}.pdf`
  );

  if (!fs.existsSync(filePath)) {
    var htmlfilePath = path.join(
      path.resolve(__dirname, ".."),
      `/views/pdf.html`
    );
    var pdfPath = path.join(
      path.resolve(__dirname, ".."),
      `/data/${BillID}.pdf`
    );

    const Invoice = await fetch(`${baseURL}/invoice/${BillID}`);
    const InvoiceData = await Invoice.json();

    if (InvoiceData.length === 0) {
      return res.redirect("/bills");
    }

    const partArray = [];

    InvoiceData.forEach((element) => {
      const part = {
        PartID: element.PartID,
        Quantity: element.Quantity,
        ActualSalesPrice: element.ActualSalesPrice.toFixed(2),
        Price: (element.ActualSalesPrice / element.Quantity).toFixed(2),
        PartName: element.PartName,
      };
      partArray.push(part);
    });

    const invoiceObject = {
      fullName: InvoiceData[0].FullName,
      BillId: InvoiceData[0].BillID,
      InvoiceDate: new Date(InvoiceData[0].PaymentDate).toLocaleString(),
      InvoiceDueDate: new Date(InvoiceData[0].PaymentDate).toLocaleDateString(
        "pt-PT"
      ),
      TotalCost: InvoiceData[0].TotalCost.toFixed(2),
      PaymentID: InvoiceData[0].PaymentID,
      CustomerID: InvoiceData[0].CustomerID,
      parts: partArray,
    };

    try {
      var html = fs.readFileSync(htmlfilePath, "utf8");
      var options = {
        format: "A5",
        orientation: "portrait",
        border: "2mm",
      };
      var document = {
        html: html,
        data: invoiceObject,
        path: pdfPath,
        type: "",
      };
      const pdfCreate = await pdf.create(document, options);
    } catch (error) {
      return error;
    }
  }

  if (fs.existsSync(filePath)) {
    res.contentType("application/pdf");
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(500);
    console.log("File not found");
    res.send("File not found");
  }
};

exports.getNewEmployees = async (req, res, next) => {
  res.render("Newemployee", {
    pageHeader: "New Employee",
  });
};

exports.postNewEmployees = async (req, res, next) => {
  const EmployeeID = req.body.EmployeeID;
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const Image = req.body.Image;
  const Title = req.body.Title;
  let IsManager = "0";
  let IsSalesmen = "0";

  if (Title === "Manager") {
    IsManager = "1";
  } else if (Title === "Salesmen") {
    IsSalesmen = "1";
  }

  const employee = {
    Name: Name,
    Surname: Surname,
    Email: Email,
    Username: Username,
    Password: Password,
    Image: Image,
    IsManager: IsManager,
    IsSalesmen: IsSalesmen,
  };
  const settingsEmployee = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  };

  try {
    const postEmployee = await fetch(
      `${baseURL}/user/post`,
      settingsEmployee
    );
    return res.redirect("/employees");
  } catch (e) {
    return e;
  }
};

exports.updateAnEmployee = async (req, res, next) => {
  const EmployeeID = req.body.EmployeeID;
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const Image = req.body.Image;
  const Title = req.body.Title;
  let IsManager;
  let IsSalesmen;

  if (Title === "Manager") {
    IsManager = "1";
    IsSalesmen = "0";
  } else if (Title === "Salesmen") {
    IsSalesmen = "1";
    IsManager = "0";
  }

  const employee = {
    EmployeeID: EmployeeID,
    Name: Name,
    Surname: Surname,
    Email: Email,
    Username: Username,
    Password: Password,
    Image: Image,
    IsManager: IsManager,
    IsSalesmen: IsSalesmen,
  };
  const patchEmployeeSettings = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  };

  try {
    const patchEmployee = await fetch(
      `${baseURL}/user/update`,
      patchEmployeeSettings
    );
    return res.redirect("/employees");
  } catch (e) {
    return e;
  }
};

exports.deleteAEmployees = async (req, res, next) => {
  const EmployeeID = req.body.EmployeeID;

  const settingEmployee = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      EmployeeID: EmployeeID,
    }),
  };
  try {
    const deleteEmployee = await fetch(
      `${baseURL}/user/delete`,
      settingEmployee
    );
    return res.redirect("/employees");
  } catch (e) {
    return e;
  }
};

exports.getEmployees = async (req, res, next) => {
  const employees = await fetch(`${baseURL}/users`);
  const data = await employees.json();

  res.render("employees", {
    emp: data,
    pageHeader: "All Employees",
  });
};

exports.getEditEmployee = async (req, res, next) => {
  const EmployeID = req.params.id;

  const userReq = await fetch(`${baseURL}/user/find/${EmployeID}`);
  const [employee] = await userReq.json();

  res.render("editEmployee", {
    emp: employee,
    pageHeader: `Editing Employee with ID ${EmployeID}`,
  });
};

exports.getMessages = async (req, res, next) => {
  const messages = await fetch(`${baseURL}/messages`);
  const data = await messages.json();
  res.render("messages", {
    messages: data,
    pageHeader: "Admin Messages",
  });
};

exports.postMessages = async (req, res, next) => {
  const ManagerID = req.session.user.EmployeeID;
  const MessageType = req.body.MessageType;
  const Message = req.body.Message;
  const MessageDate = new Date().toISOString();

  const message = {
    ManagerID: ManagerID,
    MessageType: MessageType,
    Message: Message,
    MessageDate: MessageDate,
  };

  const settingsMesssage = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };

  try {
    const postMessage = await fetch(
      `${baseURL}/messages/post`,
      settingsMesssage
    );
    return res.redirect("/messages");
  } catch (e) {
    return e;
  }
};

exports.deleteMessage = async (req, res, next) => {
  const MessageID = req.body.MessageID;

  const message = {
    MessageID: MessageID,
  };

  const settingsMesssage = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  };

  try {
    const deleteMessage = await fetch(
      `${baseURL}/messages/delete`,
      settingsMesssage
    );
    return res.redirect("/messages");
  } catch (e) {
    return e;
  }
};
