const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");
const auth = require("../auth/auth");

router.get("/add-customer",auth, customerController.getAddCustomer);

router.get("/customers",auth, customerController.getCustomers);

router.get("/edit-customer/:customerId",auth, customerController.editCustomer);

module.exports = router;