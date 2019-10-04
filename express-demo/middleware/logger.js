function log(req, res, next) {
    console.log('It is loggin...');
    next();
}

module.exports = log;