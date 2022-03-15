const express = require("express");
const router = express.Router();
const systemController = require("../controllers/system");
const auth = require("../auth/auth");
const admin = require("../auth/admin");

router.get("/login", systemController.getLoginPage);

router.post("/", systemController.postLoginPage);

router.get("/",auth, systemController.getMainPage);

router.get("/settings",auth, systemController.getSettings);

router.post("/update-settings",auth, systemController.saveSettings);

router.post("/search",auth, systemController.getSearch);

router.get("/bills",auth, systemController.getBills);

router.get("/bill/pdf/:id",auth, systemController.getInvoice);

router.get("/logout",auth, systemController.getLogout);

router.get("/new-employee",auth,admin, systemController.getNewEmployees);

router.post("/new-employee",auth,admin, systemController.postNewEmployees);

router.post("/employee/delete",auth,admin, systemController.deleteAEmployees);

router.get("/employees",auth,admin, systemController.getEmployees);

router.get("/edit-employee/:id",auth,admin, systemController.getEditEmployee);

router.post("/update-employee",auth,admin, systemController.updateAnEmployee);

router.get("/messages",auth,admin, systemController.getMessages);

router.post("/messages",auth,admin, systemController.postMessages);

router.post("/message/delete",auth,admin, systemController.deleteMessage);

module.exports = router;