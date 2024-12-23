// * frontend/src/components/LoadoutBuilder/Modals/PresetLoadoutModal.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BucketImage from '../../Bucket/BucketImage';
import { useModal } from '../../../context/Modal';
import { 
    consumableData, 
    deviceData, 
    primaryWeaponData, 
    secondaryWeaponData, 
    shipData } from '../../../data';
import { 
    changeConsumable, 
    changeDevice, 
    changeFocusEquip, 
    changePrimary, 
    changeSecondary, 
    changeShipPreset } from '../../../store/builder';

export default function PresetLoadoutModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const { shipId } = useSelector((state) => state.builder);
    const { a, b, c } = shipData[shipId].presets;

    const onClick = (event) => {
        event.preventDefault();
        dispatch(changeShipPreset(event.target.id));

        const selectedLoadout = shipData[shipId].presets[event.target.id];

        let pIndex = 0;
        for(let id of selectedLoadout.primary) {
            dispatch(changePrimary(pIndex, id.id, id.mods));
            pIndex++;
        }
        let sIndex = 0;
        for(let data of selectedLoadout.secondary) {
            console.log(selectedLoadout.secondary.length);
            if(data === null) 
                dispatch(changeSecondary(sIndex, null, null));
            else {
                const [id, quantity] = data.split('x');
                dispatch(changeSecondary(selectedLoadout.secondary.indexOf(data), id, quantity));
            }
            sIndex++;
        }
        let dIndex = 0;
        for(let id of selectedLoadout.device) {
            dispatch(changeDevice(dIndex, id.id, id.mods));
            dIndex++;
        }
        let cIndex = 0;
        for(let data of selectedLoadout.consumable) {
            if(data === null)
                dispatch(changeConsumable(cIndex, null, null));
            else {
                const [id, quantity] = data.split('x');
                dispatch(changeConsumable(selectedLoadout.consumable.indexOf(data), id, quantity));
            }
            cIndex++;
        }
        dispatch(changeFocusEquip('reset'));
        closeModal();
    }

    return (<>
        <h2 className='modal-title'>Select a Preset</h2>
        <SinglePreset data={a} preset='A' onClick={onClick} />
        <SinglePreset data={b} preset='B' onClick={onClick} />
        <SinglePreset data={c} preset='C' onClick={onClick} />
    </>);
}

function SinglePreset({ data, preset, onClick }) {
    
    
    const secondaryList = data.secondary.map((str) => {
        if(str === null) return { id: null, quantity: null }
        const [id, quantity] = str.split('x');
        return { id, quantity };
    });
    const consumableList = data.consumable.map((str) => {
        if(str === null) return { id: null, quantity: null }
        const [id, quantity] = str.split('x');
        return { id, quantity };
    });


    return (<button className='modal-ship-preset' id={preset.toLowerCase()} onClick={onClick}>
        <h3>Preset {preset}</h3>
        <div className='modal-preset-grid'>
            <ul className='modal-preset-grid-column'>
                {data.primary.map((weapon) => weapon.id && <PresetTile key={crypto.randomUUID()} url={primaryWeaponData[weapon.id].icon} />)}
            </ul>
            <ul className='modal-preset-grid-column'>
                {secondaryList.map((weapon) => weapon.id && <PresetTile key={crypto.randomUUID()} url={secondaryWeaponData[weapon.id].icon} quantity={weapon.quantity} />)}
            </ul>
            <ul className='modal-preset-grid-column'>
                {data.device.map((device) => device.id && <PresetTile key={crypto.randomUUID()} url={deviceData[device.id].icon} />)}
            </ul>
            <ul className='modal-preset-grid-column'>
                {consumableList.map((consumable) => consumable.id && <PresetTile key={crypto.randomUUID()} url={consumableData[consumable.id].icon} quantity={consumable.quantity} />)}
            </ul>
        </div>
    </button>);
}

function PresetTile({ url, quantity }) {
    return (
        <li className='modal-preset-grid-list'>
            <BucketImage dir={url} />
            {quantity && <p>{quantity}</p>}
        </li>);
}