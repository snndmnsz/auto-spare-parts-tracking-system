const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const auth = require("../auth/auth");

router.get("/new-order",auth, orderController.getCreateOrder);

router.post("/new-order",auth, orderController.postCreateOrder);

router.get("/active-orders",auth, orderController.getActiveOrders);

router.get("/bill/:id",auth, orderController.createBillForOrder);

router.post("/create-bill",auth, orderController.createABill);

router.get("/view-order",auth, orderController.getViewOrder);

router.post("/view-order",auth, orderController.postViewOrder);

router.get("/inside-order/:id",auth, orderController.getInsideOrder);

router.post("/deliver-order",auth, orderController.deliverAnOrder);

router.post("/cancel-order",auth, orderController.cancelAnOrder);

module.exports = router;