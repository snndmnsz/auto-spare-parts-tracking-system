const path = require('path');
const express = require('express');
const adminController = require('../controllers/mainPage');
const router = express.Router();

router.get('/login', adminController.getLoginPage);

router.post('/', adminController.postLoginPage);

router.get('/', adminController.getMainPage);

router.get('/new-product', adminController.getNewProduct);

router.get('/stock', adminController.getStock);

router.get('/edit-product', adminController.getEditProduct);

router.get('/new-order', adminController.getNewOrder);

router.get('/active-orders', adminController.getActiveOrders);

router.get('/edit-order', adminController.getEditOrder);

router.get('/request-product', adminController.getRequestProduct);

router.get('/part-search', adminController.getPartSearch);

router.get('/check-parts', adminController.getCheckParts);


module.exports = router;