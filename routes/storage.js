const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storage");


router.get("/stock", storageController.getStock);

module.exports = router;

