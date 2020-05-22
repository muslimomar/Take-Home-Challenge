const winston = require('winston');
const config = require('config');

/* Configure the logger */
require('./startup/logger');

/* Log the current environment */
winston.info(`[+] env ${config.util.getEnv('NODE_ENV')}`);

/* Connect DB */
require('./startup/db');

/* Express configurations */
const app = require('express')();

require('./startup/requestBodyParser')(app);
require('./startup/expressAsyncErrorsWrapper');
require('./startup/responseHelper')(app);
require('./startup/passport')(app);
require('./startup/routes')(app);
require('./startup/handlingInvalidRoutes')(app);
require('./startup/errorHandler')(app);

const PORT = config.get('PORT');
app.listen(PORT, () => {
    winston.info(`[+] listening on port ${PORT}`);
});
