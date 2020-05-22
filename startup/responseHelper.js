const {genRes} = require('./../utils/response');

module.exports = (app) => {

    app.use((req, res, next) => {

        // A helper to send response as a detailed object, e.g. :  {statusCode: 200, errors: [], data: data}
        res.sendData = data => res.json(genRes(data, 200, []));

        next();
    });

};
