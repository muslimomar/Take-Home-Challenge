const createError = require('http-errors');

module.exports = (Model, pickKeys) => {
    return (req, res, next) => {

        const {error: validationErrors} = Model.validateSchema(req.body, pickKeys);
        if (validationErrors == null) return next();

        const errorMessages = validationErrors.details.map(i => i.message);

        next(createError.UnprocessableEntity(errorMessages));
    }
};
