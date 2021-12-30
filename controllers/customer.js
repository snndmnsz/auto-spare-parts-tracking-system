const System = require("../Model/System");

exports.getAddCustomer = (req, res, next) => {
  res.render("newCustomer", {
    pageHeader: "Add New Customer",
  });
};

exports.getCustomers = async (req, res, next) => {
  const customer = await System.getAllCustomers();

  res.render("customers", {
    customers: customer[0],
    pageHeader: "Customers",
  });
};

exports.editCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;

  const findCustomer = await System.findCustomerById(customerId);

  res.render("editCustomer", {
    customer: findCustomer[0][0],
    pageHeader: `Editing Customer: ${customerId}`,
  });
};
