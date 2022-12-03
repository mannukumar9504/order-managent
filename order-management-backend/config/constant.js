/* eslint-disable prefer-regex-literals */
const REGEX_PATTERN = {
    UUID: new RegExp(/[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}/),
    onlyNumberOneToNine: /[^1-9]/g,
    onlyNumberZeroToNine: /[^0-9]/g,
    iocStringSearch: /(\{[^<>:;,?"*|/]+\}\\,\s)+/gi,
    onlyCapLetter: /[A-Z]/g,
    allCapLetters: /[A-Z]+/g,
    startWithNumber: /^[0-9]/g,
    onlyNumbers: /^\d+$/,
};
const LOGGER_LEVELS = {
    ERROR: 'Error',
    WARN: 'Warning',
    INFO: 'Info',
    DEBUG: 'Debug',
    MARK: 'Mark',
    FATAL: 'Fatal',
    TRACE: 'Trace',
};
const SALT_ROUNDS = 10;
module.exports = {
    REGEX_PATTERN,
    LOGGER_LEVELS,
    SALT_ROUNDS,
};
