// * backend/routes/api/index.js

// Local Module Imports
const { restoreUser } = require('../../utils/auth.js');

/** 
 * Controller for all `/api/users` Express routes.
 * Includes the following routes:
 * 1. `GET /api/csrf/restore`: Update CSRF Token
 *  
 * Parent to the following branches:
 * 1. `/api/custom-equippables`
 * 2. `/api/loadouts`
 * 3. `/api/session`
 * 4. `/api/users`
 */
const api = require('express').Router();

/** 
 * GET /api/csrf/restore
 * Updates the CSRF token to re-authenticate the current session.
 * ? Route is exclusive to development.
 */
if(require('../../config').environment !== 'production') api.get('/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ 'XSRF-TOKEN': csrfToken });
});

/** Ensure that the user is restored for all remaining API routes. */
api.use(restoreUser);

/** Attach the `/custom-equippables`, `/loadouts`, `/session`, and `/users` route branches. */
api.use('/custom-equippables', require('./customEquippables.js'));
api.use('/loadouts', require('./loadouts.js'));
api.use('/session', require('./session.js'));
api.use('/users', require('./users.js'));

/** Export the branch. */
module.exports = api;