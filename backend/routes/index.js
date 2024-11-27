/** ### Master Route Controller
 *  @file `backend/routes/index.js`
 *  @description
 *  The top-level controller for all Express routes. The app will use this to establish all of the
 *  backend routes properly.
 *  
 *  Parent to the following branches:
 *  1. `/api`
**/
const router = require('express').Router();

// Attach the `/api` route branch.
// * `/api/csrf/restore` is contained here.
router.use('/api', require('./api'));

// This catches a browser request to get the favicon when directly accessing a backend route.
// The request is intercepted and, instead of proceeding as a 404, becomes a 204 No Content.
// * Should not be considered an actual route.
router.get('/favicon.ico', (_req, res) => res.status(204).send());

/** "Default" Route
 *  If the endpoint being accessed isn't caught by any other defined route, this is accessed
 *  instead. This occurrence will be considered a 404 error, and will be passed through to the 
 *  error handler as such.
**/
router.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

// Export the router.
module.exports = router;