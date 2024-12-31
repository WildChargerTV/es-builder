// * frontend/src/components/LoadoutBuilder/Modules/EquipmentList.jsx
// TODO docs

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
import ChangeQuantityModal from '../Modals/ChangeQuantityModal';
import SelectEquipModal from '../Modals/SelectEquipModal';
import SelectModModal from '../Modals/SelectModModal';
import BucketImage from '../../Bucket/BucketImage';
import OpenModal from '../../Modal/OpenModal';
import { 
    consumableData, 
    deviceData, 
    primaryWeaponData, 
    secondaryWeaponData, 
    shipData } from '../../../data';
import { 
    changeConsumable,
    changeDevice,
    changeSecondary,
    changeFocusEquip, 
    changePrimary,
     } from '../../../store/builder';
import { getCustomEquippable } from '../../../store/customEquippable';


export default function EquipmentList() {
    const builder = useSelector((state) => state.builder);
    const currShip = (builder.shipId >= 0) && shipData[builder.shipId];
    const [ancientWeaponEquipped, setAncientWeaponEquipped] = useState(false);

    useEffect(() => {
        console.log(builder.enhancements)
        for(let key in builder.enhancements) {
            if(key === 'selected') continue;
            if(builder.enhancements[key] === 2)
                return setAncientWeaponEquipped(true);
        }
        return setAncientWeaponEquipped(false);
    }, [builder.enhancements]);

    return (<div id='builder-equipment-list'>
        <EquipmentColumn name='Primary' slots={ancientWeaponEquipped ? 1 : currShip.primary_weapons} data={builder.primaryWeapons} />
        <EquipmentColumn name='Secondary' slots={ancientWeaponEquipped ? 0 : currShip.secondary_weapons} data={builder.secondaryWeapons} />
        <EquipmentColumn name='Devices' slots={currShip.devices} data={builder.devices} />
        <EquipmentColumn name='Consumables' slots={currShip.consumables} data={builder.consumables} />
    </div>);
}

function EquipmentColumn({ name, slots, data }) {

    const dataArr = [];
    for(let i = 0; i < slots; i++)
        dataArr[i] = data[i];
    
    let keyCounter = 0;
    const key = () => {
        const res = keyCounter;
        keyCounter++;
        return res;
    }

    const id = (slot) => {
        if(slot === null) return 'null';
        switch(name) {
            case 'Primary':
            case 'Devices':
                return slot.id;
            case 'Secondary':
            case 'Consumables':
                return slot.split('x')[0];
            default:
                return 'something-went-wrong';
        }
    }

    const mods = (slot) => {
        if(slot === null) return null;
        switch(name) {
            case 'Primary':
            case 'Devices':
                return slot.mods;
            default:
                return null;
        }
    }

    const quantity = (slot) => {
        if(slot === null) return null;
        switch(name) {
            case 'Secondary':
            case 'Consumables':
                return slot.split('x')[1];
            default:
                return null;
        }
    }

    return (<div className='builder-equipment-list-col'>
        <h3 className='builder-equip-col-title'>{name}</h3>
        <ul className='builder-equip-col-slots'>
            {dataArr.map((slot) => <SingleEquipment 
                key={key()} 
                type={name} 
                id={id(slot)} 
                mods={mods(slot)}
                quantity={quantity(slot)}
                index={dataArr.indexOf(slot)}
            />)}
        </ul>
    </div>)
}

function SingleEquipment({ type, id, mods, quantity, index }) {
    const dispatch = useDispatch();
    const { fontSize, ref } = useFitText();
    const { mode } = useSelector((state) => state.builder);
    const [data, setData] = useState(null);
    const [moddable, setModdable] = useState(false);

    useEffect(() => {
        switch(type) {
            case 'Primary': {
                console.log(id);
                if(typeof id === 'number' || id === null)
                    return setData(primaryWeaponData[id]);
                
                const customId = Number(id.split('c')[1]);
                dispatch(getCustomEquippable(customId))
                    .then((customEquippable) => {
                        const clone = structuredClone(primaryWeaponData[customEquippable.equippableId]);
                        clone.enhanced = true;
                        clone.stats = customEquippable.stats;
                        return setData(clone);
                    });
                return;
            } case 'Secondary':
                return setData(secondaryWeaponData[id]);
            case 'Devices': {
                if(typeof id === 'number' || id === null)
                    return setData(deviceData[id]);
                
                const customId = Number(id.split('c')[1]);
                dispatch(getCustomEquippable(customId))
                    .then((customEquippable) => {
                        const clone = structuredClone(deviceData[customEquippable.equippableId]);
                        clone.enhanced = true;
                        clone.stats = customEquippable.stats;
                        return setData(clone);
                    });
                return;
            } case 'Consumables':
                return setData(consumableData[id]);
            default:
                return setData('something went wrong');
        }
    }, [dispatch, type, id]);

    useEffect(() => {
        setModdable(data && (type === 'Primary' || (type === 'Devices' && (data?.allowed_mods[0] !== -1))));
    }, [data, type]);

    const modArr = (() => {
        const res = [];
        for(let key in mods)
            res.push(mods[key]);
        return res;
    })();

    const showInfo = (event) => {
        event.stopPropagation();
        data
        ? dispatch(changeFocusEquip(type, id, index))
        : changeFocusEquip('reset');
    };

    const deleteEquip = (event) => {
        event.stopPropagation();
        switch(type) {
            case 'Primary': return dispatch(changePrimary(index, null, null));
            case 'Secondary': return dispatch(changeSecondary(index, null, null));
            case 'Devices': return dispatch(changeDevice(index, null, null));
            case 'Consumables': return dispatch(changeConsumable(index, null, null));
        }
    }
    
    useEffect(() => {
        console.log(mode);
        if(mode !== 'view') return;
        const equips = document.getElementsByClassName('builder-equip-quantity');
        for(let i = 0; i < equips.length; i++) {
            const equip = equips.item(i).firstElementChild;
            equip.disabled = mode === 'view';
        }
    }, [mode]);

    // TODO an unreasonable amount of backend calls are being made to get the control button icons
    return (<li className='builder-equip-row' id={id} onClick={showInfo} aria-hidden>
        <div className='builder-equip-icon'>
            {data && <BucketImage dir={data?.icon} />}
        </div>
        <div className='builder-equip-name' ref={ref} style={{ fontSize }}>
            <h2>
                {['Primary', 'Devices'].includes(type) && typeof id === 'string' && '★ '}
                {data?.name}
            </h2>
        </div>
        {mode !== 'view' && !(type === 'Primary' && id === 0) && <div className='builder-equip-controls'>
            {data
            ? <button onClick={deleteEquip}><BucketImage dir='/menu-remove-equip.png' /></button>
            : <OpenModal
                elementText={<BucketImage dir='/menu-add-equip.png' />}
                modalComponent={<SelectEquipModal currEquip={{index, type}} />}
            />}
            {moddable && modArr.includes(null) &&
            <OpenModal
                elementText={<BucketImage dir='/menu-add-mod.png' />}
                modalComponent={<SelectModModal currEquip={{eIndex: index, eType: type}} />}
            />}
        </div>}
        {(data && (type === 'Secondary' || type === 'Consumables')) &&
        <div className='builder-equip-quantity' aria-hidden>
            <OpenModal
                element='button'
                elementText={`${quantity}/${data.stack_size}`}
                modalComponent={<ChangeQuantityModal data={{type, equipId: id, currQuantity: quantity, index}} />}
            />
        </div>}
        {moddable && 
        <div className='builder-equip-mod-squares'>
            {modArr.map((modData) => <ModSquare key={crypto.randomUUID()} data={modData} />)}
        </div>}
    </li>);
}

function ModSquare({ data }) {
    const className = data === null
    ? 'builder-mod-square inactive'
    : 'builder-mod-square active';

    return <div className={className} />
}