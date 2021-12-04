exports.getLoginPage = (req, res, next) => {
    res.render('login.ejs');
};

exports.postLoginPage = (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
};

exports.getMainPage = (req, res, next) => {
    res.render('main.ejs');
};

exports.getNewProduct = (req, res, next) => {
    res.send('getNewProduct');
};

exports.getStock = (req, res, next) => {
    res.send('getStock');
};


exports.getEditProduct = (req, res, next) => {
    res.send('getEditProduct');
};

exports.getNewOrder = (req, res, next) => {
    res.send('getEditOrder');
};

exports.getActiveOrders = (req, res, next) => {
    res.send('getActiveOrders');
};


exports.getEditOrder = (req, res, next) => {
    res.send('getEditOrder');
};


exports.getRequestProduct = (req, res, next) => {
    res.send('getRequestProduct');
};

exports.getPartSearch = (req, res, next) => {
    res.send('getPartSearch');
};

exports.getCheckParts = (req, res, next) => {
    res.send('getCheckParts');
};



