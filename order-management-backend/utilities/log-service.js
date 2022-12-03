const log4js = require('log4js');
const { LOGGER_LEVELS } = require('../config/constant');

const infoLog = log4js.getLogger('info_log');
const errorLog = log4js.getLogger('error_log');
const warnLog = log4js.getLogger('warn_log');
const traceLog = log4js.getLogger('trace_log');
const markLog = log4js.getLogger('mark_log');
const debugLog = log4js.getLogger('debug_log');
const fatalLog = log4js.getLogger('fatal_log');

function systemErrorLogs(data) {
    return errorLog.error(data);
}

function createLogMsg(logMsgParams, stack = false) {
    const {
        requestId, fileName, methodName, error, message,
    } = logMsgParams;

    const logMessageList = [];

    if (requestId) logMessageList.push(`[${requestId}]`);
    if (fileName) logMessageList.push(`[${fileName}]`);
    if (methodName) logMessageList.push(`[${methodName}]`);
    if (error) {
        const errorMsg = stack ? error.stack : error;
        logMessageList.push(errorMsg);
    }
    if (message) logMessageList.push(message);

    return logMessageList.join(' | ');
}

function logger(loggerParams) {
    const { error, type = LOGGER_LEVELS.DEBUG } = loggerParams;

    // create log message
    let traceLogMsg = null;
    if (error) traceLogMsg = createLogMsg(loggerParams, stack = true);
    const logMsg = createLogMsg(loggerParams);

    // send logs according to the type
    switch (type) {
    case LOGGER_LEVELS.INFO:
        infoLog.info(logMsg);
        break;
    case LOGGER_LEVELS.ERROR:
        if (loggerParams.sentryLog !== false) systemErrorLogs(logMsg);
        traceLog.trace(traceLogMsg);
        break;
    case LOGGER_LEVELS.TRACE:
        traceLog.trace(logMsg);
        break;
    case LOGGER_LEVELS.WARN:
        warnLog.warn(logMsg);
        break;
    case LOGGER_LEVELS.MARK:
        markLog.mark(logMsg);
        break;
    case LOGGER_LEVELS.FATAL:
        fatalLog.fatal(logMsg);
        break;
    default:
        debugLog.debug(logMsg);
    }
}

module.exports = {
    ERROR_LOG: {
        error: systemErrorLogs(),
    },
    logger,
};
