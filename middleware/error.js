const winston = require('winston');
const {genRes} = require('./../utils/response');

module.exports = function (err, req, res, next) {

    const statusCode = err.statusCode || 400;

    if(![404,422,401,403].includes(statusCode)) {
        winston.error(err.message, err);
    }
    
    return res
        .status(statusCode)
        .json(
        genRes(
            [],
            statusCode,
            Array.isArray(err.message) ? err.message : (err.message ? [err.message] : null)
        )
    );
};
