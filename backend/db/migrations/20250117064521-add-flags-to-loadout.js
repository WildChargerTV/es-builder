'use strict';
// * backend/db/migrations/20250117064521-add-flags-to-loadout.js
// * Sequelize: Loadouts Migration File 2
// ? As a reminder, this is a representation of the data actually inserted into the table.
// ! FINALIZED - DO NOT MODIFY

/** 
 * Export the migration.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
    /** 
     * Forward Migration: Add Column 'flags' to Table 'Loadouts'
     * String Field (Limit 30 Characters), Not Nullable
     * Injects default value of flag names with null values
     * 
     * Forward Migration: Change Column 'stats' in Table 'CustomEquippables'
     * Data Type is now String Field (Limit 1024 Characters)
     */
    async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('Loadouts', 'flags', {
            allowNull: false,
            defaultValue: "{\"ancientWeaponEquipped\":null,\"splitterEquipped\":null}",
            type: Sequelize.STRING(1024)
        });

        await queryInterface.changeColumn('CustomEquippables', 'stats', Sequelize.STRING(1024));
    },

    /** 
     * Backward Migration: Remove Column 'flags' from Table 'Loadouts' 
     * 
     * Backward Migration: Change Column 'stats' in Table 'CustomEquippables'
     * Data Type is now String Field
     */
    async down (queryInterface, Sequelize) {
        await queryInterface.removeColumn('Loadouts', 'flags');
        await queryInterface.changeColumn('CustomEquippables', 'stats', Sequelize.STRING);
    }
};
