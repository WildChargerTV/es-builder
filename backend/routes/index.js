// * backend/routes/index.js

// Determine if the current environment is development or production.
const isProd = require('../config').environment === 'production';

/** 
 * The top-level controller for all Express routes. The app will use this to establish all of the
 * routes properly, both on the backend and on the frontend.
 * 
 * Parent to the following branches:
 * 1. `/api` - Head branch for all API calls.
 * 
 * Includes the following routes:
 * 1. GET `/favicon.ico`: Browser Backend Safety Net
 * 2. GET `/`: React Frontend Root Route
 * 3. GET `/!api`: Additional React Frontend Routes (Covers all routes not starting with `/api`)
 */
const router = require('express').Router();

/**
 * Attach the `/api` route branch.
 * ? `/api/csrf/restore` is contained here.
 */
router.use('/api', require('./api'));

/**
 * This catches the browser request to get a favicon when directly accessing a backend route. The
 * request is intercepted and, instead of proceeding as a 404 error, returns a 204 No Content.
 * ? Should not be considered an actual route.
 */
router.get('/favicon.ico', (_req, res) => res.status(204).send());


/**
 * Connect the frontend React app by serving `index.html`, both at the root and at any other route
 * not starting with `/api`. Within these routes, the appropriate `XSRF-TOKEN` header is set,
 * ensuring request integrity both in development and production.
 */
if(isProd) {
    // Retrieve the current directory path.
    const path = require('path');

    /** 
     * * GET /
     * ? Route is exclusive to production.
     * Root route. Serves `index.html` from the built React app.
     */
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(path.resolve(__dirname,
            '../../frontend', 'dist', 'index.html'
        ));
    });

    // Serve static assets from the frontend.
    router.use(require('express').static(path.resolve('../frontend/dist')));

    /**
     * * GET /!api
     * ? Route is exclusive to production.
     * Catch-all route for any endpoints that do not start with `/api`. Serves `index.html` from
     * the built React app.
     */
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(path.resolve(__dirname,
            '../../frontend', 'dist', 'index.html'
        ));
    });
}
// ? Potential debug: Tutorial says to add another GET /csrf/restore here. If frontend breaks,
// ? implement this here

/** 
 * This is the "default" route. If the endpoint being accessed isn't caught by any other defined 
 * route, this is accessed instead. This occurrence will be considered a 404 error, and will be 
 * passed through to the error handler as such.
 */
router.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

/** Export the router. */
module.exports = router;