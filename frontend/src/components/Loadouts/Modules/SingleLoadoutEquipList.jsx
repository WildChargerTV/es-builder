// * frontend/src/components/Loadouts/Modules/SingleLoadoutEquipList.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as dataFiles from '../../../data';
import { getCustomEquippable } from '../../../store/customEquippable';
import BucketImage from '../../Bucket/BucketImage';

export default function SingleLoadoutEquipList({ loadout }) {
    const { primaryWeapons, secondaryWeapons, devices, consumables } = loadout;

    return (<div className='single-loadout-list'>
        <ul>
            <EquipListRow type='Primary' loadoutData={primaryWeapons} />
            <EquipListRow type='Secondary' loadoutData={secondaryWeapons} />
            <EquipListRow type='Devices' loadoutData={devices} />
            <EquipListRow type='Consumables' loadoutData={consumables} />
        </ul>
    </div>);
}

function EquipListRow({ type, loadoutData }) {
    // React Hooks
    const dispatch = useDispatch();
    const { loadedIds } = useSelector((state) => state.customEquippable);
    // Local State Values
    const [iconArr, setIconArr] = useState([]);

    let keyCounter = 0;
    const key = (increment) => {
        const res = keyCounter;
        increment && keyCounter++;
        return res;
    };

    useEffect((res=[]) => {
        if(['Primary', 'Devices'].includes(type)) {
            const equipmentData = type === 'Primary'
            ? dataFiles.primaryWeaponData
            : dataFiles.deviceData;

            for(const equipment of Object.entries(loadoutData)) {
                const { id } = equipment[1];

                if(id === null)
                    continue;
                else if(typeof id === 'number')
                    res.push(equipmentData[id].icon);
                else {
                    const customId = Number(id.split('c')[1]);
                    !loadedIds[customId] && dispatch(getCustomEquippable(customId));
                    loadedIds[customId] && res.push(equipmentData[loadedIds[customId].id].icon);
                }
            }
        } else if(['Secondary', 'Consumables'].includes(type)) {
            const equipmentData = type === 'Secondary'
            ? dataFiles.secondaryWeaponData
            : dataFiles.consumableData;

            res = res.concat(loadoutData
                ? Object.entries(loadoutData).map((equipment) => {
                    const id = equipment[1] && equipment[1].split('x')[0];
                    return id ? equipmentData[id].icon : null;
                })
                : []
            );
        }
        setIconArr(res);
    }, [dispatch, type, loadoutData, loadedIds]);

    return (<li>
        {iconArr && iconArr.map((dir) => dir && 
            <BucketImage key={`${type.toLowerCase()}-${key(true)}`} dir={dir} />
        )}
    </li>);
}