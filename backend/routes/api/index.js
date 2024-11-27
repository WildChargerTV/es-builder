// Local Module Imports
const { environment } = require('../../config');
const { restoreUser } = require('../../utils/auth.js');

/** ### `/api` Route Controller
 *  @file `/backend/routes/api/index.js`
 *  @description Includes the following routes:
 *  1. `GET /api/csrf/restore` - (Development Only) Update CSRF Token
 *  
 *  Parent to the following branches:
 *  1. `/api/session`
 *  2. `/api/users`
**/
const api = require('express').Router();

/** GET /api/csrf/restore
 ** Route is exclusive to development.
 *  Updates the CSRF token to re-authenticate the current session.
**/
if(environment !== 'production') api.get('/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ 'XSRF-TOKEN': csrfToken });
});

// Ensure that the user is restored for all remaining API routes.
api.use(restoreUser);

// Connect the `/session` and `/users` route branches.
api.use('/session', require('./session.js'));
api.use('/users', require('./users.js'));

// Export the branch.
module.exports = api;