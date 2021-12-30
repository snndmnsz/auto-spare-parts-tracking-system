const express = require("express");
const router = express.Router();
const partController = require("../controllers/part");

router.get("/new-product", partController.getNewProduct);

router.post("/new-product", partController.postNewProduct);

router.get("/product/:productId", partController.getAProduct);

router.get("/edit-product/:productId", partController.editProduct);

router.get("/check-parts", partController.getCheckParts);

router.post("/check-parts", partController.postCheckParts);

module.exports = router;