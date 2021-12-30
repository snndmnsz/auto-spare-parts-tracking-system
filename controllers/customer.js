const fetch = require("cross-fetch");

exports.getAddCustomer = (req, res, next) => {
  res.render("newCustomer", {
    pageHeader: "Add New Customer",
  });
};

exports.getCustomers = async (req, res, next) => {
  const customers = await fetch("http://127.0.0.1:3001/customers");
  const data = await customers.json();

  res.render("customers", {
    customers: data,
    pageHeader: "Customers",
  });
};

exports.editCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;

  const customers = await fetch(`http://127.0.0.1:3001/customer/${customerId}`);
  const data = await customers.json();

  res.render("editCustomer", {
    customer: data[0],
    pageHeader: `Editing Customer: ${customerId}`,
  });
};
