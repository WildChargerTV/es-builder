
/** ### `backend/psql-setup-script.js
 * When deploying the app, this script is executed in order to set up the PostgreSQL database
 * in Render. 
**/

// Grab all of the models from the Sequelize app.
const { sequelize } = require('./db/models');

// Force drop the schema if it exists. If not, create it.
sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if(!data.includes(process.env.SCHEMA))
        await sequelize.createSchema(process.env.SCHEMA);
//   if(data.includes(process.env.SCHEMA)) {
//     console.log('psql-setup-script: schema found, dropping');
//     await sequelize.dropSchema(process.env.SCHEMA);
//     await sequelize.createSchema(process.env.SCHEMA);
//   } else {
//     console.log('psql-setup-script: schema not found, creating');
//     await sequelize.createSchema(process.env.SCHEMA);
//   }
});