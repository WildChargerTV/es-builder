// * backend/routes/index.js

// Node Module Imports
const AWS = require('aws-sdk');
// Local Module Imports
const { accessKeyId, bucket, secretAccessKey } = require('../config').awsConfig;

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
 * 1. GET `/assets/*`: AWS Asset Service Route
 * 2. GET `/favicon.ico`: Browser Backend Safety Net
 * 3. GET `/`: React Frontend Root Route
 * 4. GET `/!api`: Additional React Frontend Routes (Covers all routes not starting with `/api`)
 */
const router = require('express').Router();

/**
 * Attach the `/api` route branch.
 * ? `/api/csrf/restore` is contained here.
 */
router.use('/api', require('./api'));

/**
 * For all backend routes beginning with `/assets`, serve assets from the AWS bucket.
 * ! AWS-SDK v2 is due for deprecation on September 8, 2025. Consider migrating to v3.
 */
router.get('/assets/*', async (req, res, next) => {
    // Refresh IAM user credentials and connect to the S3 bucket.
    AWS.config.update({ accessKeyId, secretAccessKey, region: 'ap-southeast-2' });
    const S3 = new AWS.S3();

    // Isolate the file path from the request path.
    const assetFile = req.path.split('assets/')[1];

    // Retrieve and send a securely signed URL to the requested asset. Expires in 1 day.
    S3.getSignedUrlPromise('getObject', { Bucket: bucket, Key: assetFile, Expires: 86400 })
        .then(
            (url) => res.send({ url }),
            (err) => next(err)
        );
});

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