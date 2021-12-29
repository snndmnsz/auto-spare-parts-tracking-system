const path = require("path");
const express = require("express");
const adminController = require("../controllers/mainPage");
const router = express.Router();

router.get("/login", adminController.getLoginPage);

router.post("/", adminController.postLoginPage);

router.get("/", adminController.getMainPage);

router.get("/settings", adminController.getSettings);

router.get("/new-product", adminController.getNewProduct);

router.post("/new-product", adminController.postNewProduct);

router.get("/product/:productId", adminController.getAProduct);

router.get("/stock", adminController.getStock);

router.get("/edit-product/:productId", adminController.editProduct);

router.get("/bills", adminController.getBills);

router.get("/new-order", adminController.getNewOrder);

router.get("/active-orders", adminController.getActiveOrders);

router.get("/edit-order", adminController.getEditOrder);

router.get("/add-customer", adminController.getAddCustomer);

router.get("/customers", adminController.getCustomers);

router.get("/edit-customer/:customerId", adminController.editCustomer);

router.get("/check-parts", adminController.getCheckParts);

module.exports = router;
