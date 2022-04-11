const constants = require('./secrets/constants');
const expressJwt = require('express-jwt');
/*
This is an interceptor to act as a common place for catching API-level errors
@param err: The real exception that occurred while executing an API
@param req: The request being executed
@param res: The response to return (if any)
@param next: To continue the normal flow of finishing an API
*/
const handleErrors = function (err, req, res, next) {
    if (typeof (err) === 'string') {
        return res.status(400).json({ errorMessage: err });
    }
    return res.status(500).json({ errorMessage: err.message });
};
/*
This is used to validate a supplied JWT (https://www.npmjs.com/package/express-jwt)
*/
const jwtConfig = function () {
    return expressJwt({ secret: constants.jwtSecret, algorithms: ['HS256'] }).unless({
        path: [
            '/contractors/login'
        ]
    });
};
const utils = {
    handleErrors: handleErrors,
    jwtConfig: jwtConfig
};
module.exports = utils;
