const express = require("express");
const router = express.Router();
const systemController = require("../controllers/system");
const auth = require("../auth/auth");

router.get("/login", systemController.getLoginPage);

router.post("/", systemController.postLoginPage);

router.get("/",auth, systemController.getMainPage);

router.get("/settings",auth, systemController.getSettings);

router.post("/search",auth, systemController.getSearch);

router.get("/bills",auth, systemController.getBills);

router.get("/logout",auth, systemController.getLogout);

module.exports = router;