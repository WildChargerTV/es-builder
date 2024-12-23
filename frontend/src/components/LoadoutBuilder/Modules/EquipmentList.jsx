// * frontend/src/components/LoadoutBuilder/Modules/EquipmentList.jsx
// TODO docs

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
import ChangeQuantityModal from '../Modals/ChangeQuantityModal';
import SelectEquipModal from '../Modals/SelectEquipModal';
import BucketImage from '../../Bucket/BucketImage';
import OpenModal from '../../Modal/OpenModal';
import { 
    consumableData, 
    deviceData, 
    primaryWeaponData, 
    secondaryWeaponData, 
    shipData } from '../../../data';
import { 
    // changeConsumable,
    // changeDevice,
    // changeSecondary,
    changeFocusEquip, 
    changePrimary,
     } from '../../../store/builder';



export default function EquipmentList() {
    const dispatch = useDispatch();
    const builder = useSelector((state) => state.builder);
    const [isLoaded, setIsLoaded] = useState(true);

    const currShip = (builder.shipId >= 0) && shipData[builder.shipId];

    // useEffect(() => {
    //     

    //     const primaryWeapons = {};
    //     for(let i = 0; i < currShip.primary_weapons - 1; i++)
    //         dispatch(changePrimary(i, null));

    //     const secondaryWeapons = {};
    //     for(let i = 0; i < currShip.secondary_weapons - 1; i++)
    //         secondaryWeapons[i] = null;

    //     const devices = {};
    //     for(let i = 0; i < currShip.devices - 1; i++)
    //         devices[i] = null;

    //     const consumables = {};
    //     for(let i = 0; i < currShip.consumables - 1; i++)
    //         consumables[i] = null;


    // }, [ship]);

    // useEffect(() => {
    //     if(enhancements.keys().indexOf(2) === -1)
    // }, [enhancements]);

    return isLoaded && (<div id='builder-equipment-list'>
        <EquipmentColumn name='Primary' slots={currShip.primary_weapons} data={builder.primaryWeapons} />
        <EquipmentColumn name='Secondary' slots={currShip.secondary_weapons} data={builder.secondaryWeapons} />
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

    const data = (() => {
        switch(type) {
            case 'Primary': return primaryWeaponData[id];
            case 'Secondary': return secondaryWeaponData[id];
            case 'Devices': return deviceData[id];
            case 'Consumables': return consumableData[id];
        }
    })();

    const modArr = (() => {
        const res = [];
        for(let key in mods)
            res.push(mods[key]);
        return res;
    })();

    const showInfo = (event) => {
        event.stopPropagation();
        dispatch(changeFocusEquip(type, id))
    };

    const deleteEquip = (event) => {
        event.stopPropagation();
        switch(type) {
            case 'Primary': return dispatch(changePrimary(index, null))
        }
    }
    
    useEffect(() => {
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
            <h2>{data?.name}</h2>
        </div>
        {mode !== 'view' && <div className='builder-equip-controls'>
            {data
            ? <OpenModal
                elementText={<BucketImage dir='/menu-remove-equip.png' />}
                modalComponent={<SelectEquipModal currEquip={{type, id, mods, index}} />}
            />
            : <OpenModal
            elementText={<BucketImage dir='/menu-add-equip.png' />}
            modalComponent={<SelectEquipModal currEquip={{type, id, mods, index}} />}
            />}
            {(data && (type === 'Primary' || type === 'Devices')) && 
            <OpenModal
                elementText={<BucketImage dir='/menu-add-mod.png' />}
                modalComponent={<SelectEquipModal currEquip={{type, id, mods, index}} />}
            />}
        </div>}
        {(data && (type === 'Secondary' || type === 'Consumables')) &&
        <div className='builder-equip-quantity' disabled={mode === 'view'} aria-hidden>
            <OpenModal
                element='button'
                elementText={`${quantity}/${data.stack_size}`}
                modalComponent={<ChangeQuantityModal data={{type, equipId: id, currQuantity: quantity, index}} />}
            />
        </div>}
        {(data && (type === 'Primary' || type === 'Devices')) &&
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