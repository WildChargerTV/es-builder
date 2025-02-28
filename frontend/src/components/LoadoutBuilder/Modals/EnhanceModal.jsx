// * frontend/src/components/LoadoutBuilder/Modals/EnhanceModal.jsx

// Node Module Imports
import { useState } from 'react';
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import * as dataFiles from '../../../data';
import { useModal } from '../../../context/Modal';
import * as builderActions from '../../../store/builder';
import { createCustomEquippable } from '../../../store/customEquippable';

/**
 * Modal component that allows the user to enhance a piece of eligible equipment. 
 * 
 * The modal will present the user with a form listing out the equipment's stats, all of which can
 * be modified at will. Upon confirming the enhanced stats, the data will be submitted as a Custom
 * Equippable. Equipment enhancement is irreversible.
 * 
 * TODO Define stats that cannot be changed during enhancement & restrict them
 * TODO Maybe ask devs what the general enhancement process allows in terms of stat changes
 * @component `EnhanceModal`
 * @requires {@linkcode useModal} {@linkcode dataFiles}
 * @requires {@linkcode builderActions} {@linkcode createCustomEquippable}
 * @requires {@linkcode SingleStat}
 */
export default function EnhanceModal() {
    // React Hooks
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // Redux State Values
    const { primaryWeapons, devices } = useSelector((state) => state.builder);
    const { category, id, index } = useSelector((state) => state.builder.focusedEquipment);

    /* Reference the appropriate datafile. */
    const dataFile = structuredClone(category === 'Primary'
        ? dataFiles.primaryWeaponData[id]
        : dataFiles.deviceData[id]
    );

    /* On form submission, create a new Custom Equippable containing the modified stats. */
    const onSubmit = (event) => {
        event.stopPropagation();

        // Organize the data as needed, then stringify it for submission.
        const customEquippableData = JSON.stringify({
            equippableType: category,
            equippableId: id,
            stats: dataFile.stats
        })
        
        // Submit the data to the backend, then swap out the appropriate Primary/Device slot's ID
        // to reference the new Custom Equippable. Close the Modal afterward.
        dispatch(createCustomEquippable(customEquippableData))
        .then((res) => {
            const { updatePrimary, updateDevice } = builderActions;
            category === 'Primary'
                ? dispatch(updatePrimary(index, `c${res.id}`, primaryWeapons[index].mods))
                : dispatch(updateDevice(index, `c${res.id}`, devices[index].mods));
        }).then(closeModal());
    };

    /* Return the modal content. */
    return (<>
        {/* Modal Title */}
        <h2 className='modal-title'>Enhance {category === 'Primary' ? ' Weapon' : ' Device'}</h2>

        {/* Modal Infotext */}
        <p className='modal-paragraph'>
            Please specify the enhanced equipment&apos;s stats. Providing this information creates
            a new Custom Equippable that will be applicable to loadouts you create in the future.
        </p>
        <p className='modal-paragraph'>
            <span className='red'>This feature is in Beta, and is largely unregulated.</span> The 
            loadout builder does not yet have any way of knowing which equipment stats are allowed
            to be changed during enhancement, nor does it know whether or not the stats you submit
            are technically &quot;legal&quot; or &quot;legitimate&quot;. So yes, it will not stop
            you from claiming your Plasma Thrower has no Energy Consumption, however a fix for this
            is planned.
            <br />
            Additionally, just like the rest of the Loadout Builder, all stats are represented only
            by numbers, regardless of whether they may be a percentage, and these numbers are not
            currently influenced by any other factors. This is also planned to be implemented at a
            later time; however, the change in numbers you submit here will show up as intended.
            Please feel free to let me know of any other discrepancies via GitHub. Thank you!
        </p>

        {/* Modal Form (Equipment Stats) */}
        <form id='enhance-stats-form' className='modal-form' onSubmit={onSubmit}>
            {/* Equipment Title & Type */}
            <div className='modal-form-equip-title'>
                <h2>{dataFile.name}</h2>
                <h4>{dataFile.type}</h4>
            </div>

            {/* Equipment Stats */}
            {Object.entries(dataFile.stats).map((stat) => 
                <SingleStat 
                    key={`${stat[0].split(' ').join('-')}`} 
                    stat={stat} 
                    equipStats={dataFile.stats} 
                />
            )}
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
 * represents one of the equipment's stats. Requires a pointer to the parent stats object in order
 * to update it whenever the field changes.
 * @component `SingleStat`
 * @param {{ stat: [string, number], equipStats: object }} props
 */
function SingleStat({ stat, equipStats }) {
    // Deconstructed Props
    const [statName, statVal] = stat;
    // Local State Values
    const [fieldVal, setFieldVal] = useState(statVal);
    
    /* Set the input field's type depending on the type of the stat value. */
    const fieldType = typeof statVal === 'number' ? 'number' : 'text';

    /*Set the input field's *internal* name to reflect that of the actual stat name. */
    const fieldName = statName.toLowerCase().split(' ').join('-'); 

    /* When the field's value changes, apply that change to `dataFile`. */
    const onChange = (event) => {
        equipStats[statName] = typeof statVal === 'number'
            ? Number(event.target.value)
            : event.target.value;
        setFieldVal(event.target.value);
    };
    
    /* Return the input field & its label. */
    return (<div id={fieldName} className='modal-form-stat'>
        <label htmlFor={fieldName}>{statName}</label>
        <input
            type={fieldType} 
            className='modal-stat-field' 
            name={fieldName} 
            value={fieldVal} 
            onChange={onChange} 
            disabled={fieldType === 'text'}
        />
    </div>);
}
