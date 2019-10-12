const jwt = require('jsonwebtoken');
const config = require('config');

// Here the auth means 'autherization'. Only with valid token is authroized.
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided');

    // Verify the token if exists
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // If the token is verified, the decoded is an user object, store it at req.user then go to next
        req.user = decoded;
        next();
    }catch(ex) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;