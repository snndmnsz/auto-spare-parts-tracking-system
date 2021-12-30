const Order = require("../Model/Order");
const randomstring = require("randomstring");

exports.getCreateOrder = (req, res, next) => {
  const OrderId = randomstring.generate({
    capitalization: "uppercase",
    length: 5,
  });

  res.render("createOrder", {
    pageHeader: "Create Order",
    orderId: OrderId,
  });
};

exports.postCreateOrder = (req, res, next) => {
  console.log(req.body);
  res.redirect("/new-order");
};

exports.getActiveOrders = async (req, res, next) => {
  const fetchOrders = await Order.fetchActiveOrders();

  res.render("activeOrder", {
    orders: fetchOrders[0],
    pageHeader: "Active Orders",
  });
};

exports.getViewOrder = (req, res, next) => {
  res.render("viewOrder", {
    pageHeader: "View Order",
    OrderID: "",
    parts: [],
  });
};

exports.postViewOrder = async (req, res, next) => {
  const parts = await Order.findPartsInOrder(req.body.OrderId);

  res.render("viewOrder", {
    pageHeader: "View Order",
    orderId: req.body.OrderId,
    parts: parts[0],
  });
};
