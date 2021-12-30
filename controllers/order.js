const randomstring = require("randomstring");
const fetch = require("cross-fetch");

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
  const activeOrders = await fetch("http://127.0.0.1:3001/active-orders");
  const data = await activeOrders.json();
  res.render("activeOrder", {
    orders: data,
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
  const orderId = req.body.OrderId;

  const parts = await fetch(
    `http://127.0.0.1:3001/order-find-parts/${orderId}`
  );
  const data = await parts.json();

  res.render("viewOrder", {
    pageHeader: "View Order",
    orderId: orderId,
    parts: data,
  });
};
