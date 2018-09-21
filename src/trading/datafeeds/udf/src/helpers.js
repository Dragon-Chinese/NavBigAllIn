"use strict";
exports.__esModule = true;
/**
 * If you want to enable logs from datafeed set it to `true`
 */
var isLoggingEnabled = false;
function logMessage(message) {
    if (isLoggingEnabled) {
        var now = new Date();
        console.log(now.toLocaleTimeString() + "." + now.getMilliseconds() + "> " + message);
    }
}
exports.logMessage = logMessage;
function getErrorMessage(error) {
    if (error === undefined) {
        return '';
    }
    else if (typeof error === 'string') {
        return error;
    }
    return error.message;
}
exports.getErrorMessage = getErrorMessage;
