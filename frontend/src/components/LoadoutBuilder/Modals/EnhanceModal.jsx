

import { useEffect, useState } from 'react';
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { primaryWeaponData, deviceData } from '../../../data';
import { useModal } from '../../../context/Modal';
import { changeDevice, changePrimary } from '../../../store/builder';
import { createCustomEquippable } from '../../../store/customEquippable';


export default function EnhanceModal() {
    const dispatch = useDispatch();
    const { primaryWeapons, devices } = useSelector((state) => state.builder);
    const { category, id, index } = useSelector((state) => state.builder.focusedEquipment);
    const { closeModal } = useModal();

    const focusData = (() => {
        if(category === 'Primary') 
            return structuredClone(primaryWeaponData[id]);
        else if(category === 'Devices')
            return structuredClone(deviceData[id]);
    })();

    const focusStats = Object.entries(focusData.stats);

    const onSubmit = (event) => {
        event.stopPropagation();

        const customEquippableData = {
            equippableType: category,
            equippableId: id,
            stats: focusData.stats
        }

        dispatch(createCustomEquippable(JSON.stringify(customEquippableData)))
        .then((res) => {
            console.log(res);
            category === 'Primary'
            ? dispatch(changePrimary(index, `c${res.id}`, primaryWeapons[index].mods))
            : dispatch(changeDevice(index, `c${res.id}`, devices[index].mods))})
        .then(closeModal());
    };

    useEffect(() => {
        document.getElementById('site-modal-content').className = 'equip-enhance-modal';
    }, []);

    return (<>
        <h2 className='modal-title'>Enhance {category === 'Primary' ? ' Weapon' : ' Device'}</h2>
        <p className='modal-paragraph'>
            Please specify the enhanced equipment&apos;s stats. Providing this information creates
            a new Custom Equippable that will be applicable to loadouts you create in the future.
        </p>
        <p className='modal-paragraph'>
            <span className='red'>This feature is in its Alpha stages.</span> The loadout builder
            cannot currently properly discern what kind of Primary Weapons & Devices are eligible
            to be enhanced, nor does it know which stats are eligible for enhancement. Stats that
            would be represented as percentages in-game are displayed as decimals here. Fixes for
            these issues are coming sometime in the future; for now, let me know of discrepancies
            by submitting a GitHub issue. Thank you!
        </p>
        <form id='enhance-stats-form' className='modal-form' onSubmit={onSubmit}>
            <div className='modal-form-equip-title'>
                <h2>{focusData.name}</h2>
                <h4>{focusData.type}</h4>
            </div>
            {focusStats.map((stat) => <SingleStat key={`${stat[0].split(' ').join('-')}`} stat={stat} focusData={focusData} />)}
        </form>
        <div id='enhance-stats-controls' className='modal-controls'>
            <button className='modal-button' onClick={onSubmit}>
                Submit <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </button>
        </div>
    </>);
}

function SingleStat({ stat, focusData }) {
    const [name, val] = stat;
    const [fieldVal, setFieldVal] = useState(val);
    
    const fieldType = (() => {
        switch(typeof val) {
            case 'number': return 'number';
            case 'string': return 'text';
        }
    })();
    const fieldName = name.toLowerCase().split(' ').join('-');

    const onChange = (event) => {
        if(typeof val === 'number')
            focusData.stats[name] = Number(event.target.value);
        else
            focusData.stats[name] = event.target.value;
        setFieldVal(event.target.value);
    }

    return (<div id={fieldName} className='modal-form-stat'>
        <label htmlFor={fieldName}>{name} </label>
        <input type={fieldType} className='modal-stat-field' name={fieldName} value={fieldVal} onChange={onChange} />
    </div>);
}