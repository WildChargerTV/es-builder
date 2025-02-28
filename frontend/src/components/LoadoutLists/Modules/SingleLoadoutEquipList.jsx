// * frontend/src/components/Loadouts/Modules/SingleLoadoutEquipList.jsx

// Node Module Imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import * as dataFiles from '../../../data';
import { readCustomEquippable } from '../../../store/customEquippable';
import BucketImage from '../../../utils/BucketImage';

/**
 * Renders a list of equipment, without names, for a single loadout inside the `LoadoutList`
 * component. Unlike the Loadout Builder, this list renders equipment horizontally, so that ships
 * with a lot of one particular equipment type can properly render their full loadouts within the
 * confined space of the Loadout List.
 * 
 * This component is a `<ul>` comprised of sub-components. See {@linkcode EquipListRow} for more
 * information regarding each specific row.
 * @component `SingleLoadoutEquipList`
 * @requires {@linkcode EquipListRow}
 * @param {{ loadoutData: object }} 
 * @returns {ReactElement}
 */
export default function SingleLoadoutEquipList({ loadoutData }) {
    // Deconstructed Props
    const { primaryWeapons, secondaryWeapons, devices, consumables } = loadoutData;

    /* Return the loadout equipment list, grouped by the four equipment categories. */
    return (<div className='single-loadout-list'>
        <ul>
            <EquipListRow type='Primary' loadoutData={primaryWeapons} />
            <EquipListRow type='Secondary' loadoutData={secondaryWeapons} />
            <EquipListRow type='Devices' loadoutData={devices} />
            <EquipListRow type='Consumables' loadoutData={consumables} />
        </ul>
    </div>);
}

/**
 * Sub-component of {@linkcode SingleLoadoutEquipList} that renders a single row of equipment.
 * The intent is for this to summarize the loadout's equipment; therefore, details including names,
 * mods, and quantities are not shown here. The only part actually displayed is the equipment's
 * icon, in bordered inline boxes.
 * 
 * Given the loadout data, the required assets will be retrieved from the data files and put into
 * an array, which will then be mapped out into {@linkcode BucketImage}s.
 * @component `EquipListRow`
 * @param {{
 *      type: 'Primary' | 'Secondary' | 'Devices' | 'Consumables',
 *      loadoutData: object
 * }} 
 * @requires {@linkcode dataFiles} {@linkcode readCustomEquippable} {@linkcode BucketImage}
 * @returns {ReactElement}
 */
function EquipListRow({ type, loadoutData }) {
    // React Hooks
    const dispatch = useDispatch();
    const { loadedIds } = useSelector((state) => state.customEquippable);
    // Local State Values
    const [iconArr, setIconArr] = useState([]);

    /* Create a key counter for the equipment cells. */
    let keyCounter = 0;
    const key = (increment) => {
        const res = keyCounter;
        increment && keyCounter++;
        return res;
    };

    /** 
     * Load the icon array using the passed-in loadout data.
     * ? Note: The only context in which loadout data can be non-existent is if the loadout has the
     * ? Ancient Weapon equipped. Any other case of null loadout data must be fixed upstream.
     */
    useEffect(() => {
        // Different icon retrieval methods apply between Primary Weapons/Devices & Secondary
        // Weapons/Consumables. However, both methods involve array mapping through object values.
        if(['Primary', 'Devices'].includes(type)) {
            // Reference the appropriate datafile.
            const equipmentData = type === 'Primary'
            ? dataFiles.primaryWeaponData
            : dataFiles.deviceData;

            // Load the icon array. If the equipment is enhanced, retrieve its base weapon ID.
            // Unloaded custom equippables will have an empty box until their data is retrieved.
            setIconArr(Object.values(loadoutData).map(({ id }) => {
                if(id === null)
                    return null;
                else if(typeof id === 'number')
                    return equipmentData[id].icon;

                id = Number(id.split('c')[1]);
                if(!loadedIds[id]) {
                    dispatch(readCustomEquippable(id));
                    return 'null';
                } else 
                    return equipmentData[loadedIds[id].id].icon.split('.')[0] + '-enhanced.png';
            }));
        } else if(['Secondary', 'Consumables'].includes(type)) {
            // Reference the appropriate datafile.
            const equipmentData = type === 'Secondary'
            ? dataFiles.secondaryWeaponData
            : dataFiles.consumableData;

            // If the loadout data exists, load the icon array.
            setIconArr(loadoutData
                ? Object.values(loadoutData).map((equipment) => equipment 
                    ? equipmentData[equipment.split('x')[0]].icon 
                    : null
                ) : []
            );
        }
    }, [dispatch, type, loadoutData, loadedIds]);

    /* Return the equipment list. */
    return (<li>
        {iconArr?.map((dir) => dir && 
            <BucketImage key={`${type.toLowerCase()}-${key(true)}`} dir={dir} />
        )}
    </li>);
}
