/** Grab the config variables. */
const config = require('./index');

/** ### `backend/config/database.js`
 *! Baseline File - DO NOT MODIFY !
 *
 *  Declares environment-specific database behaviors.
**/
module.exports = {
    development: {
        storage: config.dbFile,
        dialect: 'sqlite',
        seederStorage: 'sequelize',
        logQueryParameters: true,
        typeValidation: true
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            schema: process.env.SCHEMA
        }
    }
};