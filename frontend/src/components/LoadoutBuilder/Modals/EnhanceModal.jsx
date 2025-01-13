// * frontend/src/components/LoadoutBuilder/Modals/EnhanceModal.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import { primaryWeaponData, deviceData } from '../../../data';
import { useModal } from '../../../context/Modal';
import { changeDevice, changePrimary } from '../../../store/builder';
import { createCustomEquippable } from '../../../store/customEquippable';

/**
 * Renders a modal that allows the user to enhance a piece of eligible equipment. The modal will
 * present the user with a dynamic form element listing out the equipment's stats, allowing the
 * user to modify them at will. Upon confirming the enhances stats, the data will be submitted as a
 * Custom Equippable. Enhancement is irreversible.
 * 
 * Each stat is rendered in its own sub-component. See {@linkcode SingleStat} for more information
 * on its functionality. 
 * @component `EnhanceModal`
 * @requires {@linkcode useModal} {@linkcode primaryWeaponData} {@linkcode deviceData}
 * @requires {@linkcode changePrimary} {@linkcode changeDevice} {@linkcode createCustomEquippable}
 * @requires {@linkcode SingleStat}
 * @returns {ReactElement}
 */
export default function EnhanceModal() {
    // React Hooks
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const { primaryWeapons, devices } = useSelector((state) => state.builder);
    const { category, id, index } = useSelector((state) => state.builder.focusedEquipment);

    /** Get the stats from the appropriate datafile. */
    const focusData = structuredClone(category === 'Primary'
        ? primaryWeaponData[id]
        : deviceData[id]
    );

    /** Convert the stats into an array for easier iteration. */
    const focusStats = Object.entries(focusData.stats);

    /** When the Submit button is clicked, submit the modified stats to the backend. */
    const onSubmit = (event) => {
        event.stopPropagation();

        // Organize the data as needed, then stringify it for submission.
        const customEquippableData = JSON.stringify({
            equippableType: category,
            equippableId: id,
            stats: focusData.stats
        })
        
        // Submit the data to the backend, then swap out the appropriate Primary/Device slot's ID
        // to reference the new Custom Equippable. Close the Modal afterward.
        dispatch(createCustomEquippable(customEquippableData))
        .then((res) => {
            category === 'Primary'
            ? dispatch(changePrimary(index, `c${res.id}`, primaryWeapons[index].mods))
            : dispatch(changeDevice(index, `c${res.id}`, devices[index].mods))})
        .then(closeModal());
    };

    /** Apply a custom class name to the Modal. Required for custom stylization. */
    useEffect(() => {
        document.getElementById('site-modal-content').className = 'equip-enhance-modal';
    }, []);

    /** Return the Modal content. */
    return (<>
        {/* Modal Title */}
        <h2 className='modal-title'>Enhance {category === 'Primary' ? ' Weapon' : ' Device'}</h2>

        {/* Modal Infotext */}
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

        {/* Modal Form (Equipment Stats) */}
        <form id='enhance-stats-form' className='modal-form' onSubmit={onSubmit}>
            {/* Equipment Title & Type */}
            <div className='modal-form-equip-title'>
                <h2>{focusData.name}</h2>
                <h4>{focusData.type}</h4>
            </div>
            {/* Equipment Stats */}
            {focusStats.map((stat) => <SingleStat key={`${stat[0].split(' ').join('-')}`} stat={stat} focusData={focusData} />)}
        </form>

        {/* Modal Controls (Submit Button) */}
        <div id='enhance-stats-controls' className='modal-controls'>
            <button className='modal-button' onClick={onSubmit}>
                Submit <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </button>
        </div>
    </>);
}

/**
 * Sub-component of {@linkcode EnhanceModal} that renders an input field (number/text type) that
 * represents one of the equipment's stats. The input field will update the passed-in data object
 * every time the field changes.
 * @param {{ stat: [string, number], focusData: object }} 
 * @returns {ReactElement}
 */
function SingleStat({ stat, focusData }) {
    // Deconstructed Props
    const [name, val] = stat;
    // Local State Values
    const [fieldVal, setFieldVal] = useState(val);
    
    /** Set the input field's type depending on the type of the stat value. */
    const fieldType = (() => {
        switch(typeof val) {
            case 'number': return 'number';
            case 'string': return 'text';
        }
    })();
    /** Set the input field's name to reflect that of the actual stat name. */
    const fieldName = name.toLowerCase().split(' ').join('-'); 

    /** When the field's value changes, apply that change to the passed-in data object. */
    const onChange = (event) => {
        if(typeof val === 'number')
            focusData.stats[name] = Number(event.target.value);
        else
            focusData.stats[name] = event.target.value;
        setFieldVal(event.target.value);
    }
    
    /** Return the input field & its label. */
    return (<div id={fieldName} className='modal-form-stat'>
        <label htmlFor={fieldName}>{name} </label>
        <input type={fieldType} className='modal-stat-field' name={fieldName} value={fieldVal} onChange={onChange} />
    </div>);
}