/** ### `backend/config/index.js`
 *! Baseline File - DO NOT MODIFY !
 *
 *  Acts as the bridge between the .env file and the rest of the backend, including the database
 *  and the Sequelize & Express apps.
**/
module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    }
};