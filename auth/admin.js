module.exports = (req, res, next) => {
    if (!req.session.manager) {
        return res.redirect('/');
    }
    next();
}