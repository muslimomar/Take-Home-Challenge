const {NotFound} = require('./../utils/error');

module.exports = (app) => {

    app.use((req, res, next) => {
        next(new NotFound(undefined));
    });
};
