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

  const orderInfo = await fetch(`http://127.0.0.1:3001/order-bill/${orderId}`);
  const [orderInfoData] = await orderInfo.json();

  let total = 0;

  const parts = await fetch(
    `http://127.0.0.1:3001/order-find-parts/${orderId}`
  );
  const partsData = await parts.json();

  for (let partPrice of partsData) {
    total = total + partPrice.ActualSalesPrice * partPrice.Quantity;
  }

  const paymentMethods = await fetch(`http://127.0.0.1:3001/payment-methods`);
  const payments = await paymentMethods.json();

  res.render("createBill", {
    pageHeader: `Create Bill For ${orderId}`,
    order: orderInfoData,
    parts: partsData,
    total: total,
    payments: payments.reverse(),
  });
};

exports.createABill = async (req, res, next) => {
  const OrderID = req.body.OrderID;
  const CustomerID = req.body.CustomerID;
  const PaymentMethodStatus = req.body.PaymentMethodStatus;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const PhoneNumber = req.body.PhoneNumber;
  const TotalCost = req.body.TotalCost;

  const payment = {
    PaymentMethodStatus: PaymentMethodStatus,
    OrderID: OrderID,
    CustomerID: CustomerID,
  };

  const settingsPayment = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  };

  try {
    const postPayment = await fetch(
      `http://127.0.0.1:3001/payment/post`,
      settingsPayment
    );
  } catch (e) {
    return e;
  }

  const getAllPayments = await fetch(`http://127.0.0.1:3001/payments`);
  const paymentsList = await getAllPayments.json();

  let PaymentID;

  for (let pays of paymentsList) {
    if (pays.OrderID === OrderID) {
      PaymentID = pays.PaymentID;
    }
  }

  console.log(PaymentID);

  const BillId = randomstring.generate({
    length: 8,
  });

  const bill = {
    BillId: BillId,
    PaymentID: PaymentID,
    FirstName: FirstName,
    LastName: LastName,
    PhoneNumber: PhoneNumber,
    TotalCost: TotalCost,
    PaymentDate: new Date().toISOString(),
  };

  console.log(bill);

  const settingsBill = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bill),
  };

  try {
    const postPayment = await fetch(
      `http://127.0.0.1:3001/bill/post`,
      settingsBill
    );

    return res.redirect("/active-orders");
  } catch (e) {
    return e;
  }
};

exports.deliverAnOrder = async (req, res, next) => {
  const OrderID = req.body.OrderID;

  const settingsDeliver = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      OrderID: OrderID,
    }),
  };

  try {
    const deliverOrder = await fetch(
      `http://127.0.0.1:3001/order/deliver`,
      settingsDeliver
    );

    return res.redirect("/active-orders");
  } catch (e) {
    return e;
  }
};

exports.cancelAnOrder = async (req, res, next) => {
  const OrderID = req.body.OrderID;
  const OrderStatus = req.body.OrderStatus;

  if (OrderStatus === "Payment Received") {
    const settingsCanceled = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OrderID: OrderID,
        orderStatus: "Refunded",
      }),
    };

    try {
      const cancelOrder = await fetch(
        `http://127.0.0.1:3001/order/cancel`,
        settingsCanceled
      );
    } catch (e) {
      return e;
    }

    //! DELETE BILL AND PAYMENT

    const getAllPayments = await fetch(`http://127.0.0.1:3001/payments`);
    const paymentsList = await getAllPayments.json();

    let PaymentID;

    for (let pays of paymentsList) {
      if (pays.OrderID === OrderID) {
        PaymentID = pays.PaymentID;
      }
    }
    const settingsDeleteBill = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PaymentID: PaymentID,
      }),
    };

    try {
      const deleteBill = await fetch(
        `http://127.0.0.1:3001/bill/delete`,
        settingsDeleteBill
      );
    } catch (e) {
      return e;
    }

    const settingsDeletePayment = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OrderID: OrderID,
      }),
    };

    try {
      const deletePayment = await fetch(
        `http://127.0.0.1:3001/payment/delete`,
        settingsDeletePayment
      );
      return res.redirect("/active-orders");
    } catch (e) {
      return e;
    }
  } else if (OrderStatus === "Awaiting Payment") {
    const settingsCanceled = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OrderID: OrderID,
        orderStatus: "Cancelled",
      }),
    };

    try {
      const cancelOrder = await fetch(
        `http://127.0.0.1:3001/order/cancel`,
        settingsCanceled
      );
      return res.redirect("/active-orders");
    } catch (e) {
      return e;
    }
  }
};
