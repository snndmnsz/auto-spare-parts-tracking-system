const express = require("express");
const router = express.Router();
const partController = require("../controllers/part");
const auth = require("../auth/auth");

router.get("/new-product",auth, partController.getNewProduct);

router.post("/new-product",auth, partController.postNewProduct);

router.post("/part/delete",auth, partController.deleteAPart);

router.get("/product/:productId",auth, partController.getAProduct);

router.get("/edit-product/:productId",auth, partController.editProduct);

router.post("/edit-product",auth, partController.postEditProduct);

router.get("/check-parts",auth, partController.getCheckParts);

router.post("/check-parts",auth, partController.postCheckParts);

module.exports = router;