// * backend/utils/validation.js
// Primary file to handle validation for routes that expect a request body.
// * Personal Note: Express validator should handle all error messages shown on the frontend!

// Node Module Imports
const { check, validationResult } = require('express-validator');

/** ### `express-validator` Error Handler
 *  @file `backend/utils/validation.js`
 *  @description Validates the request body for applicable routes.
 * 
 *  This does not need to be integrated alongside the other error handlers, because the scenarios
 *  under which this middleware is invoked are specific and controlled.
**/
const handleValidationErrors = (req, _res, next) => {
    // Extract the errors from the request body.
    const errs = validationResult(req);

    // If no errors are found, advance to the next middleware.
    if(errs.isEmpty()) return next();

    // Create a new Error object and place all of the found errors into that new object's own
    // error list.
    const err = new Error('Bad request.');
    err.errors = {};
    err.status = 400;
    err.title = 'Bad request.';

    // Once populated, send it to the global error handler.
    errs.array().forEach((error) => err.errors[error.path] = error.msg);
    return next(err);
}

/** ### Login Form Validator Array
 *  @file `backend/utils/validation.js`
 *  @description Validates:
 *  - Credential: Exists, Not Empty
 *  - Password: Exists
**/
const validateLogin = [
    check('credential')
        .exists({ values: 'falsy' })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ values: 'falsy' })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

/** ### Signup Form Validator Array
 *  @file `backend/utils/validation.js`
 *  @description Validates:
 *  - Email: Exists, Is Email
 *  - Username: Exists, Minimum Length `4`, Is Not Email
 *  - Password: Exists, Minimum Length `6`
**/
const validateSignup = [
    check('email')
        .exists({ values: 'falsy' })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ values: 'falsy' })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not().isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ values: 'falsy' })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Export the middlewares.
module.exports = { handleValidationErrors, validateLogin, validateSignup };