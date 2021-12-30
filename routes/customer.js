const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

router.get("/add-customer", customerController.getAddCustomer);

router.get("/customers", customerController.getCustomers);

router.get("/edit-customer/:customerId", customerController.editCustomer);

module.exports = router;