// * backend/config/index.js

/**
 * Acts as the bridge between the `.env` file and the rest of the backend, including the database
 * and the Sequelize & Express apps.
 */
module.exports = {
    /** Reads the current runtime environment from `.env`. If undefined, defaults to `development`. */
    environment: process.env.NODE_ENV || 'development',
    /** Reads the listening port number from `.env`. If undefined, defaults to `8000`. */
    port: process.env.PORT || 8000,
    /** Reads the path to the working database file from `.env`. */
    dbFile: process.env.DB_FILE,
    /** Reads the JWT secret key and expiration time from `.env`. */
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    /** Reads the AWS user key & secret to make S3 bucket calls. */
    awsConfig: {
        accessKeyId: process.env.AWS_USER_KEY,
        bucket: process.env.AWS_BUCKET,
        secretAccessKey: process.env.AWS_USER_SECRET
    },
    /** Reads the admin override key to allow for executive moderation of offensive content. */
    adminKey: process.env.ADMIN_OVERRIDE_SECRET || false
};