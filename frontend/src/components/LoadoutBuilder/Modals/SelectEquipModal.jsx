

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
import BucketImage from '../../Bucket/BucketImage';
import { useModal } from '../../../context/Modal';
import * as dataFiles from '../../../data';
import { changeConsumable, changeDevice, changePrimary, changeSecondary } from '../../../store/builder';

export default function SelectEquipModal({ currEquip }) {
    const { index, type } = currEquip;
    
    const [title, setTitle] = useState(type);

    

    const data = (() => {
        switch(type) {
            case 'Primary': return dataFiles.primaryWeaponData;
            case 'Secondary': return dataFiles.secondaryWeaponData;
            case 'Devices': return dataFiles.deviceData;
            case 'Consumables': return dataFiles.consumableData;
        }
    })();

    useEffect(() => {
        const modal = document.getElementById('site-modal-content');
        modal.className = 'item-select-menu';
        if(['Primary', 'Secondary'].includes(title))
            setTitle(title + ' Weapon');
        else if(['Devices', 'Consumables'].includes(title))
            setTitle(title.slice(0, title.length - 1));
    }, [title]);

    

    return (<>
        <h2 className='modal-title'>Select {title}</h2>
        <div className='modal-equip-list'>
            {data.map((equip) => <SingleEquipment key={equip.name.split(' ').join('-')} index={index} type={type} data={equip} />)}
        </div>
    </>);
}

function SingleEquipment({ index, type, data }) {
    const dispatch = useDispatch();
    const { ref, fontSize } = useFitText();
    const { closeModal } = useModal();
    const { shipId, devices } = useSelector((state) => state.builder);
    const { loadedIds } = useSelector((state) => state.customEquippable);

    /** Do not create a tile for the Ancient Weapon, as it is tied to enhancement. */
    if(data.name === 'Ancient Weapon') return null;

    const { max_mods } = dataFiles.shipData[shipId];

    const emptyModsObj = (() => {
        const res = {}
        let count = 0;
        while(count < max_mods) {
            res[count] = null;
            count++;
        }
        return res;
    })();

    const onClick = (event) => {
        event.stopPropagation();
        closeModal();
        switch(type) {
            case 'Primary': return dispatch(changePrimary(index, data.id, emptyModsObj));
            case 'Secondary': return dispatch(changeSecondary(index, data.id, data.stack_size));
            case 'Devices': return dispatch(changeDevice(index, data.id, emptyModsObj));
            case 'Consumables': return dispatch(changeConsumable(index, data.id, data.stack_size));
        }
    }

    const disabled = () => {
        const invalidShip = data.allowed_ships && !data.allowed_ships.includes(shipId);
        const deviceConflicts = type === 'Devices' && (() => {
            if(data.allow_multi_install) return false;
            for(let key in devices) {
                const deviceId = typeof devices[key].id === 'string'
                ? loadedIds[devices[key].id.split('c')[1]].equippableId
                : devices[key].id;
                if(!deviceId) continue;
                if(data.conflicts.includes(deviceId) || deviceId === data.id) return true;
            }
            return false;
        })();
        return invalidShip || deviceConflicts;
    }

    return (<div className={`modal-single-equip${disabled() ? ' disabled' : ''}`} onClick={onClick} aria-hidden>
        <div className='modal-equip-name' ref={ref} style={{ fontSize }}>
            <h4>{data.name}</h4>
        </div>
        <div className='modal-equip-icon'>
            <BucketImage dir={data.icon} />
        </div>
        
    </div>);
}