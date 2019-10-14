const config = require('config');

// Check if the environmental variable is setup already
module.exports = function() {
    if(!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }
}