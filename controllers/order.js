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

exports.postCreateOrder = async (req, res, next) => {
  const CustomerID = req.body.CustomerID;
  const OrderID = req.body.OrderID;
  const OrderPriority = req.body.OrderPriority;
  const PartID = req.body.PartID;
  const Quantity = req.body.Quantity;
  const EmployeeID = req.session.user.EmployeeID;
  const OrderDate = new Date().toISOString();

  const newOrder = {
    OrderID: OrderID,
    CustomerID: CustomerID,
    EmployeeID: EmployeeID,
    OrderDate: OrderDate,
  };

  const settingnewOrder = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  };
  try {
    const orderPost = await fetch(
      `http://127.0.0.1:3001/order/post`,
      settingnewOrder
    );

    //-------------------------------------

    if (typeof PartID === "object") {
      console.log("yess object");
      let counter = 0;
      for (const parts of PartID) {
        const getAProduct = await fetch(`http://127.0.0.1:3001/part/${parts}`);
        const [data] = await getAProduct.json();
        const price = data.Price;
        const settingsForPartOrders = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OrderID: OrderID,
            PartID: parts,
            Quantity: Quantity[counter],
            ActualSalesPrice: price,
          }),
        };
        try {
          const forOnePartOrders = await fetch(
            `http://127.0.0.1:3001/storage/post/parts-in-orders`,
            settingsForPartOrders
          );
          counter++;
        } catch (e) {
          return e;
        }
      }
    } else {
      console.log("string");
      const getAProduct = await fetch(`http://127.0.0.1:3001/part/${PartID}`);
      const [data] = await getAProduct.json();
      const price = data.Price;
      const settingsForOnePartOrder = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OrderID: OrderID,
          PartID: PartID,
          Quantity: Quantity,
          ActualSalesPrice: price,
        }),
      };
      try {
        const forOnePartOrder = await fetch(
          `http://127.0.0.1:3001/storage/post/parts-in-orders`,
          settingsForOnePartOrder
        );
      } catch (e) {
        return e;
      }
    }

    // -------------------------------

    const orderStatus = {
      OrderID: OrderID,
      OrderPriority: OrderPriority,
      OrderStatus: "Awaiting Payment",
    };
    const settingorderStatus = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderStatus),
    };
    try {
      const orderStatusPost = await fetch(
        `http://127.0.0.1:3001/storage/post/order-status`,
        settingorderStatus
      );
      return res.redirect("/active-orders");
    } catch (e) {
      return e;
    }
  } catch (e) {
    return e;
  }
};

exports.getActiveOrders = async (req, res, next) => {
  const activeOrders = await fetch("http://127.0.0.1:3001/active-orders");
  const data = await activeOrders.json();
  res.render("activeOrder", {
    orders: data.reverse(),
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


exports.createBillForOrder = async (req, res, next) => {
  const orderId = req.params.id;

  res.render("createBill", {
    pageHeader: `Create Bill For ${orderId}`,
  });
};

