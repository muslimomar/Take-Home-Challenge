let winston = require('winston');
const moment = require('moment');

/* Forward unhandledRejection error to uncaughtException, so winston can catch it */
process.on('unhandledRejection', (err) => {
    throw err;
});

winston.add(
    new winston.transports.Console({
        level: 'silly',
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({level,exception,timestamp,stack,message}) => {
                timestamp = moment(timestamp).format('DD-MM-YYYY HH:mm:ss Z');

                if(level.match(/error/)) {
                    return `${timestamp} [${stack}]\nException: ${exception}\nLevel: ${level}\nTime: ${timestamp}`;
                } else {
                    return `${timestamp} ${level}: ${message}`
                }
            })
        )
    })
);
