// * backend/utils/devLogger.js
// Creates a logging system exclusive to development that uses the `chalk` package to display
// terminal messages in a unique style.

// Node Module Imports
const chalk = require('chalk');
// Local Module Imports
const { environment } = require('../config');
// Chalk Color Aliases
const { whiteBright } = chalk;
const orange = chalk.hex('#FFA500');
// Logging Aliases
const log = console.log;
const logWarn = console.warn;
const logErr = console.error;

// Determine if the current environment is development or production.
const isProd = environment === 'production';

// Console prefixes for each type of dev message.
const devLogPrefix = chalk.bgCyanBright.bold('DEV-LOG') + ' ';
const devWarnPrefix = chalk.bgYellow.bold('DEV-WARN') + ' ';
const devErrPrefix = chalk.bgRed.bold('DEV-ERROR') + ' ';

/** ### Development Log Message
 *  @file `/backend/utils/devLogger.js`
 *  @description
 *  Displays a custom `console.log` visible **only in development**. Takes a filename (or file
 *  path) to allow a developer to more easily understand where a message is coming from.
 * 
 *  @param {string} fileName The file name, or path to the file.
 *  @param {string} msg The message to display.
 * 
 *  @example 
 *  devLog('utils/chalk.js', 'This is a development log.');
 */
const devLog = (fileName, msg) => {
    // Require that both arguments be provided.
    if(!fileName || !msg)
        throw new ReferenceError('devLog: One or more required arguments are missing or null');

    // If the current environment is not production, proceed with the logging.
    if(!isProd) 
        log(devLogPrefix + orange.bold(fileName) + orange(': ') + whiteBright(msg));
}

/** ### Development Warning Message
 *  @file `/backend/utils/devLogger.js`
 *  @description
 *  Displays a custom `console.warn` visible **only in development**. Takes a filename (or file
 *  path) to allow a developer to more easily understand where a message is coming from.
 * 
 *  This method is intended to be used for _**non-critical issues**_, regardless of whether or not
 *  they have an error associated with them. It is required to provide a `fileName` and a `msg`,
 *  and if an `err` is provided, it must be an `Error` object.
 * 
 *  **See also:** `devLog`, `devErr`.
 *  @param {string} fileName The file name, or path to the file.
 *  @param {string} msg The message to display.
 *  @param {Error} err _(Optional)_ The error object to follow-up the log message with.
 * 
 *  @example 
 *  devWarn('utils/chalk.js', 'This is a development warning.', new Error('This is an error.'));
 */
const devWarn = (fileName, msg, err) => {
    // Require that the first two arguments be provided, and that the error is of the correct type.
    if(!fileName || !msg)
        throw new ReferenceError('devWarn: One or more required arguments are missing or null');
    if(err && !(err instanceof Error)) throw new TypeError('devWarn: "err" is not an Error');

    // If the current environment is not production, proceed with the warning logging.
    // Display the custom message first, then the error itself, if one exists.
    if(!isProd) {
        logWarn(devWarnPrefix + orange.bold(fileName) + orange(': ') + whiteBright(msg));
        if(err) logErr(err);
    }
}

/** ### Development Error Message
 *  @file `/backend/utils/devLogger.js`
 *  @description 
 *  Displays a custom `console.log` visible **only in development**. Takes a filename (or file
 *  path) to allow a developer to more easily understand where a message is coming from.
 * 
 *  This method is intended to be used for _**critical or breaking issues**_. It is required to
 *  provide all three arguments, and for the `err` to be an `Error` object.
 *  
 *  **See also:** `devLog`, `devWarn`.
 *  @param {string} fileName The file name, or path to the file.
 *  @param {string} msg The message to display.
 *  @param {Error} err The error object to follow-up the log message with.
 * 
 *  @example 
 *  devErr('utils/chalk.js', 'This is a development error.', new Error('This is an error.'));
 */
const devErr = (fileName, msg, err) => {
    // Require that all three arguments be provided, and that the error is of the correct type.
    if(!fileName || !msg || !err) 
        throw new ReferenceError('devErr: One or more required arguments are missing or null');
    if(!(err instanceof Error)) throw new TypeError('devErr: "err" is not an Error');

    // If the current environment is not production, proceed with the error logging.
    // Display the custom message first, then the error itself.
    if(!isProd) {
        log(devErrPrefix + orange.bold(fileName) + orange(': ') + whiteBright(msg));
        logErr(err);
    }
}

// Export the methods.
module.exports = { devLog, devWarn, devErr };