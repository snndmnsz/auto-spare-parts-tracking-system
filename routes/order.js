const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.get("/new-order", orderController.getCreateOrder);

router.post("/new-order", orderController.postCreateOrder);

router.get("/active-orders", orderController.getActiveOrders);

router.get("/view-order", orderController.getViewOrder);

router.post("/view-order", orderController.postViewOrder);

module.exports = router;