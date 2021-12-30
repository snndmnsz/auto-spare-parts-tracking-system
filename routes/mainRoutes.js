const path = require("path");
const express = require("express");
const adminController = require("../controllers/mainPage");
const router = express.Router();

router.get("/login", adminController.getLoginPage);

router.post("/", adminController.postLoginPage);

router.get("/", adminController.getMainPage);

router.get("/settings", adminController.getSettings);

router.post("/search", adminController.getSearch);

router.get("/new-product", adminController.getNewProduct);

router.post("/new-product", adminController.postNewProduct);

router.get("/product/:productId", adminController.getAProduct);

router.get("/stock", adminController.getStock);

router.get("/edit-product/:productId", adminController.editProduct);

router.get("/bills", adminController.getBills);

router.get("/new-order", adminController.getCreateOrder);

router.post("/new-order", adminController.postCreateOrder);

router.get("/active-orders", adminController.getActiveOrders);

router.get("/view-order", adminController.getViewOrder);

router.post("/view-order", adminController.postViewOrder);

router.get("/add-customer", adminController.getAddCustomer);

router.get("/customers", adminController.getCustomers);

router.get("/edit-customer/:customerId", adminController.editCustomer);

router.get("/check-parts", adminController.getCheckParts);

router.post("/check-parts", adminController.postCheckParts);

module.exports = router;
