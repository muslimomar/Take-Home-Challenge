const errorMiddleware = require('./../middleware/error');

module.exports = (app) => {

    app.use(errorMiddleware);
};
