

import { useSelector } from 'react-redux';
//import useFitText from 'use-fit-text';
import EnhanceModal from '../Modals/EnhanceModal';
import BucketImage from '../../Bucket/BucketImage';
import OpenModal from '../../Modal/OpenModal';
import * as dataFile from '../../../data';

export default function EquipmentInfo() {
    //const { fontSize, ref } = useFitText({ logLevel: 'debug', minFontSize: 5 });
    const builder = useSelector((state) => state.builder);
    const { loadedIds } = useSelector((state) => state.customEquippable);

    const { category, id } = builder.focusedEquipment;
    const modsArr = [...dataFile.weaponMods, ...dataFile.deviceMods];

    /** If there is no data, return default information. */
    if(id === null) return (<div id='builder-equipment-info'>
        <h2>Select Equipment</h2>
        <p>If you have selected a preset loadout, it should appear here.</p>
        <p>
            Use the <InlineBucketImage dir='/menu-add-equip.png' /> button 
            to add a new piece of equipment on an empty slot, and use 
            the <InlineBucketImage dir='/menu-remove-equip.png' /> button 
            to remove an existing piece of equipment.
        </p>
    </div>);

    const focusData = (() => {
        

        switch(category) {
            case 'Primary': {
                const isCustomEquip = typeof id === 'string';
                const customEquippable = isCustomEquip && loadedIds[Number(id.split('c')[1])];
                const clone = structuredClone(isCustomEquip
                ? dataFile.primaryWeaponData[customEquippable.equippableId]
                : dataFile.primaryWeaponData[id]);

                clone.enhanced = isCustomEquip;
                clone.stats = isCustomEquip
                ? Object.entries(customEquippable.stats)
                : Object.entries(clone.stats);
                for(const key in builder.primaryWeapons)
                    if(builder.primaryWeapons[key].id === id)
                        clone.mods = Object.entries(builder.primaryWeapons[key].mods);
                
                return clone; 
            } case 'Secondary': {
                const clone = structuredClone(dataFile.secondaryWeaponData[id]);
                clone.stats = Object.entries(clone.stats);
                return clone;
            } case 'Devices': {
                const isCustomEquip = typeof id === 'string';
                const customEquippable = isCustomEquip && loadedIds[Number(id.split('c')[1])];
                const clone = structuredClone(isCustomEquip
                ? dataFile.deviceData[customEquippable.equippableId]
                : dataFile.deviceData[id]);

                clone.enhanced = isCustomEquip;
                clone.stats = isCustomEquip
                ? Object.entries(customEquippable.stats)
                : Object.entries(clone.stats);
                for(const key in builder.devices)
                    if(builder.devices[key].id === id)
                        clone.mods = Object.entries(builder.devices[key].mods);
                
                return clone;
            }
            case 'Consumables': {
                const clone = structuredClone(dataFile.consumableData[id]);
                clone.stats && (clone.stats = Object.entries(clone.stats));
                return clone;
            } default:
                return null;
        }
    })();
    
    

    return focusData && (<div id='builder-equipment-info'>
        <h2>
            {focusData.enhanced && '★ '}
            {focusData.name}
            {focusData?.mods && focusData.mods[0][1] && ` (${focusData.mods.map((mod) => mod[1] && '+').join('')})`}
        </h2>
        <h3>{focusData.enhanced && 'Enhanced '}{focusData.type}</h3>
        {['Primary', 'Devices'].includes(category) && !focusData.enhanced && builder.mode !== 'view' && <OpenModal 
            elementText='Click to Enhance'
            modalComponent={<EnhanceModal />}
        />}
        <p id='equip-info-desc'>
            {focusData.description}
            {focusData.manufacturer && (<><br /><br />Manufacturer: {focusData.manufacturer}</>)}
        </p>
        {focusData?.mods && focusData.mods[0][1] && <div id='equip-info-mods'>
            <label>Mods</label>
            <ul>
                {focusData.mods.map(([key, id]) => id && <li key={`mod-${key}`} title={modsArr[id].description}>{modsArr[id].name}</li>)}
            </ul>
        </div>}
        {focusData?.stats && <div id='equip-info-stats'>
            {focusData.stats.map(([name, stat]) => (<div key={name.split(' ').join('-')} className='equip-info-single-stat'>
                <p>{name}</p>
                <p>{stat}</p>
            </div>))}
        </div>}
    </div>);
}

function InlineBucketImage({ dir }) {
    return (<span style={{display: 'inline-flex', alignItems: 'flex-end'}}>
        <BucketImage dir={dir} />
    </span>);
}

    