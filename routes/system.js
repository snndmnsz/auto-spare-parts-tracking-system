const express = require("express");
const router = express.Router();
const systemController = require("../controllers/system");

router.get("/login", systemController.getLoginPage);

router.post("/", systemController.postLoginPage);

router.get("/", systemController.getMainPage);

router.get("/settings", systemController.getSettings);

router.post("/search", systemController.getSearch);

router.get("/bills", systemController.getBills);

module.exports = router;