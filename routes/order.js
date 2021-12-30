const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const auth = require("../auth/auth");

router.get("/new-order",auth, orderController.getCreateOrder);

router.post("/new-order",auth, orderController.postCreateOrder);

router.get("/active-orders",auth, orderController.getActiveOrders);

router.get("/view-order",auth, orderController.getViewOrder);

router.post("/view-order",auth, orderController.postViewOrder);

module.exports = router;