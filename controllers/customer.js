const fetch = require("cross-fetch");

exports.getAddCustomer = (req, res, next) => {
  res.render("newCustomer", {
    pageHeader: "Add New Customer",
  });
};

exports.createNewCustomer = async (req, res, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const BirthDate = req.body.BirthDate;
  const Gender = req.body.Gender;
  const PhoneNumber = req.body.PhoneNumber;
  const IsOrganization = 0;
  const CustomerSince = new Date().toISOString();

  const newCustomer = {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    BirthDate: BirthDate,
    Gender: Gender,
    PhoneNumber: PhoneNumber,
    CustomerSince: CustomerSince,
    IsOrganization: IsOrganization,
  };

  const settingsCustomer = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCustomer),
  };

  try {
    const newCustomer = await fetch(
      `http://127.0.0.1:3001/customer/put`,
      settingsCustomer
    );
    return res.redirect("/");
  } catch (e) {
    return e;
  }
};

exports.getCustomers = async (req, res, next) => {
  const customers = await fetch("http://127.0.0.1:3001/customers");
  const data = await customers.json();

  res.render("customers", {
    customers: data.reverse(),
    pageHeader: "Customers",
  });
};

exports.getEditCustomers = async (req, res, next) => {
  const customerId = req.params.customerId;

  const customers = await fetch(`http://127.0.0.1:3001/customer/${customerId}`);
  const data = await customers.json();

  res.render("editCustomer", {
    customer: data[0],
    pageHeader: `Editing Customer: ${customerId}`,
  });
};

exports.updateACustomers = async (req, res, next) => {
  const CustomerID = req.body.CustomerID;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const BirthDate = req.body.BirthDate;
  const Gender = req.body.Gender;
  const PhoneNumber = req.body.PhoneNumber;
  const IsOrganization = 0;
  const CustomerSince = req.body.CustomerSince;

  const newCustomer = {
    CustomerID: CustomerID,
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    BirthDate: BirthDate,
    Gender: Gender,
    PhoneNumber: PhoneNumber,
    CustomerSince: CustomerSince,
    IsOrganization: IsOrganization,
  };

  const settingsCustomer = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCustomer),
  };
  try {
    const updateCustomer = await fetch(
      `http://127.0.0.1:3001/customer/patch`,
      settingsCustomer
    );
    return res.redirect("/customers");
  } catch (e) {
    return e;
  }
};

exports.deleteACustomers = async (req, res, next) => {
  const CustomerID = req.body.CustomerID;

  const deleteCustomer = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      CustomerID: CustomerID,
    }),
  };


  try {
    const deleteCustomerPost = await fetch(
      `http://127.0.0.1:3001/customer/delete`,
      deleteCustomer
    );
    return res.redirect("/customers");
  } catch (e) {
    return e;
  }
};
