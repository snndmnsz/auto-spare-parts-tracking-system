const express = require("express");
const router = express.Router();
const partController = require("../controllers/part");
const auth = require("../auth/auth");

router.get("/new-product",auth, partController.getNewProduct);

router.post("/new-product",auth, partController.postNewProduct);

router.get("/product/:productId",auth, partController.getAProduct);

router.get("/edit-product/:productId",auth, partController.editProduct);

router.get("/check-parts",auth, partController.getCheckParts);

router.post("/check-parts",auth, partController.postCheckParts);

module.exports = router;