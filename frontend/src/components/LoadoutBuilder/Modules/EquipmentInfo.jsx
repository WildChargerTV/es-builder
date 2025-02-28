// * frontend/src/components/LoadoutBuilder/Modules/EquipmentInfo.jsx

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
 * @requires {@linkcode EnhanceModal}, {@linkcode SVGIcons}, {@linkcode OpenModal},
 * {@linkcode EquipmentInfoInstructions}
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
        return <EquipmentInfoInstructions />;

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
        <h2 id='equip-info-name'>
            {equipment.enhanced && '★ '}
            {equipment.name}
            {equipment?.mods?.[0][1] && 
            ` (${equipment.mods.map((mod) => mod[1] && '+').join('')})`}
        </h2>

        {/* Equipment Type */}
        <h3 id='equip-info-type'>
            {equipment.enhanced && 'Enhanced '}{equipment.type}
        </h3>

        {/* Equipment Enhancement Button (Where Applicable) */}
        {equipment?.enhanceable && !equipment.enhanced && builder.mode !== 'view' && <OpenModal 
            elementText={<>
                Enhance <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </>}
            modalComponent={<EnhanceModal />}
            modalId='equip-enhance-modal'
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
            {equipment.stats.map(([name, stat]) => (
                <div key={name.split(' ').join('-')} className='equip-info-single-stat'>
                    <p>{name}</p>
                    <p>{stat}</p>
                </div>
            ))}
        </div>)}
    </div>);
}

/**
 * Sub-component of {@linkcode EquipmentInfo} that renders content for the component when no piece
 * of equipment is currently selected.
 * 
 * This component will provide different instructions, depending on whether it is in Create/Edit
 * mode or View mode.
 * @component `ShipInfoInstructions`
 */
function EquipmentInfoInstructions() {
    // React Hooks
    const { mode } = useSelector((state) => state.builder);

    /* Determine if the current builder mode is set to 'view'. */
    const isViewMode = mode === 'view';

    /* Return the infobox content. */
    return (<div id='builder-equipment-info'>
        {/* Infobox Header */}
        <h2 id='equip-info-name' style={{ lineHeight: 2, margin: 0 }}>
            {isViewMode ? 'View Equipment' : 'Select Equipment'}
        </h2>

        {/* View Mode Instructions */}
        {isViewMode && <p id='equip-info-desc'>
            The amount of available equipment slots varies depending on the loadout&apos;s chosen
            ship. If either the Ancient Weapon or Splitter enhancements are installed, the amount
            of Primary or Secondary Weapons slots are modified accordingly. Selecting any piece of
            equipment shown on the left will display its information here.
            <br /><br />
            <span className='yellow'>Primary Weapons & Devices</span> can be modded & enhanced,
            where eligible. Installed mods are listed above the equipment&apos;s stats, and
            enhanced equipment will have a star next to it&apos;s name.
            <br /><br />
            <span className='yellow'>Secondary Weapons & Consumables</span> all have a quantity,
            which can be seen at the upper-left corner of their respective tiles. 
        </p>}

        {/* Create & Edit Mode Instructions */}
        {!isViewMode && <p id='equip-info-desc'>
            Equipment makes up the backbone of your loadout, which means it&apos;s also the most
            complex section of the loadout builder! If you selected a loadout preset after choosing
            a ship, it will appear here. Read on for more information about this section!
            <br />
            <span className='yellow'>Veteran pilots:</span> You can expect a similar experience to
            the ingame equipment system. Just note that you can select the quantity of an equipped
            Secondary Weapon or Consumable to change it.
            <br /><br />
            The amount of available equipment tiles depends on the amount of slots allocated by the 
            currently selected ship. If either the Ancient Weapon or Splitter enhancements are 
            installed, the amount of Primary or Secondary Weapons slots are modified accordingly. 
            Each equipment tile can be controlled using the buttons in their upper-right corner:
            <br /><br />
            <SVGIcons.AddEquipIcon height='1.3vw' /> - Adds a new piece of equipment to an empty
            tile. Equipment will be added exactly in the specified tile, and will remain there even
            if an empty tile is above it.
            <br />
            <SVGIcons.AddModIcon height='1.3vw' /> - Adds a new modification to an existing piece
            of equipment, if it is eligible. You can install up to three mods per equip (or four,
            if you are using the Colonial Sentinel). Installed mods are listed above the
            equipment&apos;s stats. Modding is irreversible, unless the equipment is removed and
            replaced.
            <br />
            <SVGIcons.RemoveEquipIcon height='1.3vw' /> - Removes a piece of equipment from the 
            loadout, as well as its installed mods & enhancements where applicable. If you have 
            equipped the <span className='yellow'>Ancient Weapon</span>, you must uninstall the 
            enhancement in order to remove it here.
            <br /><br />
            Selecting an occupied equipment tile will display it&apos;s information here. Selecting
            an empty tile will allow you to see these instructions again.
            <br /><br />
            <span className='yellow'>Eligible Primary Weapons & Devices</span> can be enhanced by
            selecting the button that will appear above its description. Doing so opens a popup,
            where you will be prompted to set the stats that changed with the enhancement. 
            Enhancement is irreversible, unless the equipment is removed and replaced.
            <br /><br />
            <span className='yellow'>Secondary Weapons & Consumables</span> all have their own
            quantity indicators, which appear in the upper-left hand corner of their respective
            tiles. Selecting that indicator will open a popup allowing you to change it at will.
            These quantities can be modified at any time, and will all persist after the loadout 
            has been submitted.
            <br /><br />
            <span className='yellow'>In order to submit your loadout,</span> it must have at least
            one equipped Primary or Secondary Weapon, and must have received a unique name. You can 
            change the loadout&apos;s name by selecting the &quot;Loadout Name Here&quot; box next
            to the page title.
        </p>}
    </div>);
}
