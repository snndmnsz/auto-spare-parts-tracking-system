const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storage");
const auth = require("../auth/auth");


router.get("/stock",auth, storageController.getStock);

module.exports = router;

