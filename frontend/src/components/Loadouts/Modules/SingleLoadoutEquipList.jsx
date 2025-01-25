// * frontend/src/components/Loadouts/Modules/SingleLoadoutEquipList.jsx

// Node Module Imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import BucketImage from '../../Bucket/BucketImage';
import * as dataFiles from '../../../data';
import { readCustomEquippable } from '../../../store/customEquippable';

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

    /** Create a key counter for the equipment cells. */
    let keyCounter = 0;
    const key = (increment) => {
        const res = keyCounter;
        increment && keyCounter++;
        return res;
    };

    /** 
     * Given the loadout data and its type, load an array of AWS URLs that refer to the appropriate
     * piece(s) of equipment.
     */
    useEffect((res=[]) => {
        // Different ID extraction methods apply between Primary Weapons/Devices & Secondary
        // Weapons/Consumables.
        if(['Primary', 'Devices'].includes(type)) {
            // Reference the appropriate datafile.
            const equipmentData = type === 'Primary'
            ? dataFiles.primaryWeaponData
            : dataFiles.deviceData;

            // Iterate through the loadout data.
            for(const equipment of Object.entries(loadoutData)) {
                // Deconstruct the ID from the data object value.
                const { id } = equipment[1];

                // If there is no ID, move on to the next one.
                if(id === null)
                    continue;
                // If the ID is a number, it is not enhanced. Push the appropriate asset URL.
                else if(typeof id === 'number')
                    res.push(equipmentData[id].icon);
                // If the ID is a string, then it is enhanced. Get the appropriate custom
                // equippable, and then push the appropriate asset URL associated with the
                // `equippableId`.
                else {
                    const customId = Number(id.split('c')[1]);
                    !loadedIds[customId] && dispatch(readCustomEquippable(customId));
                    loadedIds[customId] && res.push(equipmentData[loadedIds[customId].id].icon);
                }
            }
        } else if(['Secondary', 'Consumables'].includes(type)) {
            // Reference the appropriate datafile.
            const equipmentData = type === 'Secondary'
            ? dataFiles.secondaryWeaponData
            : dataFiles.consumableData;

            // If the loadout data exists, extract the ID from the data string value, and then push
            // the appropriate asset URL if it is not null. Non-existent Secondary Weapon data can
            // occur if the Ancient Weapon is equipped on the loadout. Concatenate the resulting
            // array to the return value.
            res = res.concat(loadoutData
                ? Object.entries(loadoutData).map((equipment) => {
                    console.log(equipment, equipment[1]);
                    const id = equipment[1] !== null && equipment[1].split('x')[0];
                    return id ? equipmentData[id].icon : null;
                })
                : []
            );
        }

        // After the iteration has completed, load the icon array.
        setIconArr(res);
    }, [dispatch, type, loadoutData, loadedIds]);

    /** Return the equipment list. */
    return (<li>
        {iconArr?.map((dir) => dir && 
            <BucketImage key={`${type.toLowerCase()}-${key(true)}`} dir={dir} />
        )}
    </li>);
}