// Use asyncMiddleware to handle all routes and exceptions caught.
module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }
        catch(ex) {
            next(ex);
        }
    };
}