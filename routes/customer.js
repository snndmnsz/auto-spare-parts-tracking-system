const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");
const auth = require("../auth/auth");

router.get("/add-customer", auth, customerController.getAddCustomer);

router.post("/add-customer", auth, customerController.createNewCustomer);

router.get("/customers", auth, customerController.getCustomers);

router.get(
  "/edit-customer/:customerId",
  auth,
  customerController.getEditCustomers
);

router.post("/update-customer", auth, customerController.updateACustomers);

router.post("/delete-customer", auth, customerController.deleteACustomers);

module.exports = router;
