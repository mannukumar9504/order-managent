const winston = require('winston');

const { DEBUG_NAMESPACE } = process.env;

const consoleOptions = {
    label: DEBUG_NAMESPACE,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
            const message = info.message instanceof Error ? info.message.stack : info.message;
            const meta = info.meta ? ` Meta: ${JSON.stringify(info.meta, null, 2)}` : '';
            return `[${info.timestamp}][${info.level}] ${message} ${meta}`;
        }),
    ),
};

const transports = [new winston.transports.Console(consoleOptions)];
const exceptionHandlers = [new winston.transports.Console(consoleOptions)];

const logger = winston.createLogger({
    exitOnError: false,
    transports,
    level: process.env.LOG_LEVEL,
    exceptionHandlers,
});

// Temporary workaround for exceptions
logger.error = (_err, _meta) => {
    console.log('winston Error', _err, _meta);
    logger.log('error', _err, { meta: _meta });
};

logger.info = (_msg, _meta) => console.log('winston info', _msg, { meta: _meta });
logger.warn = (_msg, _meta) => logger.log('warn', _msg, { meta: _meta });
logger.debug = (_msg, _meta) => logger.log('debug', _msg, { meta: _meta });

module.exports = logger;
