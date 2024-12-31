

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
import BucketImage from '../../Bucket/BucketImage';
import { useModal } from '../../../context/Modal';
import * as dataFiles from '../../../data';
import { changeDevice, changePrimary } from '../../../store/builder';

export default function SelectModModal({ currEquip }) {
    const { eIndex, eType } = currEquip;
    const { closeModal } = useModal();
    const { primaryWeapons, devices } = useSelector((state) => state.builder);
    const [title, setTitle] = useState(eType);

    const [presetData, eData, mIndex] = (() => {
        const res = [];
        if(eType === 'Primary')
            res.push(...[dataFiles.weaponMods, primaryWeapons[eIndex]]);
        else if(eType === 'Devices')
            res.push(...[dataFiles.deviceMods, devices[eIndex]]);

        if([39, 40, 47].includes(res[1].id))
            res[0] = [...[...dataFiles.weaponMods, ...dataFiles.deviceMods]]
        const currModList = res[1].mods;
        for(const key in currModList)
            if(currModList[key] === null) 
                res.push(Number(key));
        if(res[2] === undefined) {
            closeModal();
            throw new Error('Tried to open SelectModModal despite having no available mod slots');
        }
        return res;
    })();

    useEffect(() => {
        const modal = document.getElementById('site-modal-content');
        modal.className = 'item-select-menu';
        if(title === 'Primary')
            setTitle('Weapon Mod');
        else if(title === 'Devices')
            setTitle('Device Mod');
    }, [title, currEquip]);

    return (<>
        <h2 className='modal-title'>Add {title}</h2>
        <div className='modal-equip-list'>
            {presetData.map((mod) => <SingleMod key={`${title.split(' ').join('-')}-${mod.id}`} data={{eIndex, eType, eData, mIndex, mData: mod}} />)}
        </div>
    </>);
}

function SingleMod({ data }) {
    const { eIndex, eType, eData, mIndex, mData } = data;
    const dispatch = useDispatch();
    const { ref, fontSize } = useFitText();
    const { closeModal } = useModal();
    const { loadedIds } = useSelector((state) => state.customEquippable);
    
    
    const id = typeof eData.id === 'string'
    ? loadedIds[eData.id.split('c')[1]].equippableId
    : eData.id;

    const pData = eType === 'Primary'
    ? dataFiles.primaryWeaponData[id]
    : dataFiles.deviceData[id];

    const dir = mData.id < 28
    ? '/weapon-mod.png'
    : '/device-mod.png';

    const onClick = (event) => {
        event.stopPropagation();
        eData.mods[mIndex] = mData.id;
        closeModal();
        switch(eType) {
            case 'Primary': return dispatch(changePrimary(eIndex, eData.id, eData.mods));
            case 'Devices': return dispatch(changeDevice(eIndex, eData.id, eData.mods));
        }
    }

    const disabled = () => {
        if(eType === 'Primary') {
            if(!pData.disallowed_mods) 
                return false;
            return pData.disallowed_mods.includes(mData.id);
        } else if(eType === 'Devices') {
            if(pData.allowed_mods[0] === -1)
                return true;
            return !pData.allowed_mods.includes(mData.id);
        } 
    }

    return (<div className={`modal-single-equip${disabled() ? ' disabled' : ''}`} onClick={onClick} aria-hidden>
        <div className='modal-equip-name' ref={ref} style={{ fontSize }}>
            <h4>{mData.name}</h4>
        </div>
        <div className='modal-equip-icon'>
            <BucketImage dir={dir} />
        </div>
        
    </div>);
}