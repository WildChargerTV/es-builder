// * frontend/src/components/LoadoutBuilder/Modules/EquipmentInfo.jsx
// TODO revisit instructions, maybe dynamic based on mode

// Node Module Imports
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';
// Local Module Imports
import EnhanceModal from '../Modals/EnhanceModal';
import * as SVGIcons from '../../../assets/svg';
import * as dataFiles from '../../../data';
import OpenModal from '../../../utils/OpenModal';

/**
 * Renders information about the currently selected equipment item, or instructional data if no
 * equipment is currently selected. A button to enhance eligible equipment is also shown here.
 * @component `EquipmentInfo`
 * @requires {@linkcode EnhanceModal}, {@linkcode SVGIcons}, {@linkcode OpenModal}
 * @requires {@linkcode dataFiles}
 */
export default function EquipmentInfo() {
    // React Hooks
    const builder = useSelector((state) => state.builder);
    const { loadedIds } = useSelector((state) => state.customEquippable);

    /* Deconstruct the necessary data from the `focusedEquipment` state. */
    const { category, id, index } = builder.focusedEquipment;

    /* Concatenate weapon & device mods into one array. */
    const modsArr = [...dataFiles.weaponMods, ...dataFiles.deviceMods];

    /** If there is no data, return instructional information. */
    if(id === null)
        return (<div id='builder-equipment-info'>
            <h2 style={{ marginBottom: '5%' }}>Select Equipment</h2>
            <p id='equip-info-desc'>
                If you have selected a preset loadout, it should appear here.
                <br /><br />
                <SVGIcons.AddEquipIcon height='1.3vw' /> - Adds a new piece of equipment to the
                loadout in an empty slot. Equipment will be added exactly in the specified slot,
                and will remain there even if there is an empty slot above it.
                <br />
                <SVGIcons.AddModIcon height='1.3vw' /> - Adds a new modification to eligible piece
                of existing equipment. Once added, mods cannot be removed.
                <br />
                <SVGIcons.RemoveEquipIcon height='1.3vw' /> - Removes a piece of existing 
                equipment from the loadout.
                <br /><br />
                <span className='yellow'>Note for Testers:</span> The ability to add equipment
                slots via G&B Tuning Stations is not currently supported, but is slated for
                addition at a later time, alongide indicators for all other run-length Tuning
                Station upgrades. 
                <br /><br />
                Primary Weapons & eligible Devices can be enhanced using the &quot;Click to 
                Enhance&quot; button that will appear beneath its title in this panel, when 
                selected. You will be prompted to set the stats that changed with the enhancement. 
                This process is irreversible, unless the equipment is removed and replaced.
                <br /><br />
                Secondary Weapons & Consumables will all have quantity indicators. Selecting the
                quantity will give you the option to change it. The quantity can be modified at any
                time, and will persist after loadout submission.
            </p>
        </div>);

    /* Create an object containing the data required by the info box. */
    const equipment = (() => {
        // Determine if the equipment is a Custom Equippable. If so, get its data.
        const isCustomEquippable = 
            ['Primary', 'Devices'].includes(category) && 
            typeof id === 'string';
        const customEquippable = isCustomEquippable && loadedIds[Number(id.split('c')[1])];

        // Create a clone of the equipment's data from its respective dataFile.
        const equipmentData = structuredClone((() => {
            switch(category) {
                case 'Primary':
                    return dataFiles.primaryWeaponData[isCustomEquippable 
                        ? customEquippable.equippableId 
                        : id
                    ];
                case 'Secondary':
                    return dataFiles.secondaryWeaponData[id];
                case 'Devices':
                    return dataFiles.deviceData[isCustomEquippable
                        ? customEquippable.equippableId 
                        : id
                    ];
                case 'Consumables':
                    return dataFiles.consumableData[id];
            }
        })());

        // Convert the stats into an array, if they exist.
        equipmentData.stats && (
            equipmentData.stats = Object.entries(isCustomEquippable 
                ? customEquippable.stats 
                : equipmentData.stats
            )
        );

        // Secondary Weapons & Consumables require no further data, and can be returned here.
        // ? For the remaining two categories, enhancement flags & mod data must be added.
        if(['Secondary', 'Consumables'].includes(category))
            return equipmentData;

        // Add an indicator for whether or not the equipment is enhanced.
        equipmentData.enhanced = isCustomEquippable;

        // Add an indicator for whether or not the equipment can be enhanced.
        // ? All Primary Weapons are enhanceable except the Ancient Weapon.
        // ? Only the Gatling Turret, Laser Turret, and Missile Turret devices are enhanceable.
        equipmentData.enhanceable = 
            (category === 'Primary' && id !== 0) || 
            (category === 'Devices' && [39, 40, 47].includes(id));
        
        // Insert an array of the equipment's mod data from the appropriate Redux state.
        const reduxData = category === 'Primary' 
            ? builder.primaryWeapons[index] 
            : builder.devices[index];
            equipmentData.mods = reduxData.mods ? Object.entries(reduxData.mods) : null;
        
        // Return the data.
        return equipmentData;
    })();
    
    /* Return the equipment information. */
    return equipment && (<div id='builder-equipment-info'>
        {/* Equipment Name */}
        <h2>
            {equipment.enhanced && '★ '}
            {equipment.name}
            {equipment?.mods?.[0][1] && 
            ` (${equipment.mods.map((mod) => mod[1] && '+').join('')})`}
        </h2>

        {/* Equipment Type */}
        <h3>{equipment.enhanced && 'Enhanced '}{equipment.type}</h3>

        {/* Equipment Enhancement Button (Where Applicable) */}
        {equipment?.enhanceable && !equipment.enhanced && builder.mode !== 'view' && <OpenModal 
            elementText={<>
                Enhance <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </>}
            modalComponent={<EnhanceModal />}
        />}

        {/* Equipment Description */}
        <p id='equip-info-desc'>
            {equipment.description}
            {equipment.manufacturer && (<><br /><br />Manufacturer: {equipment.manufacturer}</>)}
        </p>

        {/* Equipment Mods (Where Applicable) */}
        {equipment?.mods?.[0][1] && <div id='equip-info-mods'>
            <p>Mods</p>
            <ul>
                {equipment.mods.map(([key, id]) => id && 
                    <li key={`mod-${key}`} title={modsArr[id].description}>{modsArr[id].name}</li>
                )}
            </ul>
        </div>}

        {/* Equipment Stats (Where Applicable) */}
        {equipment?.stats && (<div id='equip-info-stats'>
            {equipment.stats.map(([name, stat]) => 
                (<div key={name.split(' ').join('-')} className='equip-info-single-stat'>
                    <p>{name}</p>
                    <p>{stat}</p>
                </div>)
            )}
        </div>)}
    </div>);
}
