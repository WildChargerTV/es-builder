

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
import BucketImage from '../../Bucket/BucketImage';
import { primaryWeaponData, secondaryWeaponData, deviceData, consumableData } from '../../../data';

export default function EquipmentInfo() {
    const { fontSize, ref } = useFitText();
    const { focusedEquipment } = useSelector((state) => state.builder);

    const focusData = (() => {
        switch(focusedEquipment.category) {
            case 'Primary':
                return primaryWeaponData[focusedEquipment.id];
            case 'Secondary':
                return secondaryWeaponData[focusedEquipment.id];
            case 'Devices':
                return deviceData[focusedEquipment.id];
            case 'Consumables':
                return consumableData[focusedEquipment.id];
            default:
                return null;
        }
    })();

    useEffect(() => {}, [focusData]);

    /** If there is no data, return default information. */
    if(focusedEquipment.id === null) return (<div id='builder-equipment-info'>
        <h2>Select Equipment</h2>
        <p>If you have selected a preset loadout, it should appear here.</p>
        <p>
            Use the <InlineBucketImage dir='/menu-add-equip.png' /> button 
            to add a new piece of equipment on an empty slot, and use 
            the <InlineBucketImage dir='/menu-remove-equip.png' /> button 
            to remove an existing piece of equipment.
        </p>
    </div>);

    return focusData && (<div id='builder-equipment-info'>
        <div id='builder-equip-info-name'>
                <h2>{focusData.name}</h2>
                <p>{focusData.type}</p>
        </div>
        
    </div>);
}

function InlineBucketImage({ dir }) {
    return (<span style={{display: 'inline-flex', alignItems: 'flex-end'}}>
        <BucketImage dir={dir} />
    </span>);
} 
    