// * frontend/src/components/LoadoutBuilder/Modals/SelectEquipModal.jsx
// TODO revisit element class & id names

// Node Module Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
// Local Module Imports
import { useModal } from '../../../context/Modal';
import * as dataFiles from '../../../data';
import * as builderActions from '../../../store/builder';
import BucketImage from '../../../utils/BucketImage';

/**
 * Modal component that renders a list of equipment available to be added to the user's current
 * loadout in the Loadout Builder.
 * @component `SelectEquipModal`
 * @requires {@linkcode useModal}
 * @requires {@linkcode dataFiles}
 * @requires {@linkcode SingleEquipment}
 * @param {{ currEquip: object }} props 
 */
export default function SelectEquipModal({ currEquip }) {
    // Deconstructed Props
    const { index, type } = currEquip;
    // Local State Values
    const [title, setTitle] = useState(type);

    /* Reference the appropriate datafile. */
    const data = (() => {
        switch(type) {
            case 'Primary': return dataFiles.primaryWeaponData;
            case 'Secondary': return dataFiles.secondaryWeaponData;
            case 'Devices': return dataFiles.deviceData;
            case 'Consumables': return dataFiles.consumableData;
        }
    })();

    /** 
     * Apply a custom class name to the modal, and set its title based on the given type.
     * TODO native modals should be able to receive custom class names.
     */
    useEffect(() => {
        if(['Primary', 'Secondary'].includes(title))
            setTitle(title + ' Weapon');
        else if(['Devices', 'Consumables'].includes(title))
            setTitle(title.slice(0, title.length - 1));
    }, [title]);

    /* Return the modal content. */
    return (<>
        {/* Modal Title */}
        <h2 className='modal-title'>Select {title}</h2>

        {/* Equipment List */}
        <div className='modal-equip-list'>
            {data.map((equip) => <SingleEquipment 
                key={equip.name.split(' ').join('-')} 
                index={index} 
                type={type} 
                data={equip} 
            />)}
        </div>
    </>);
}

/**
 * Sub-component of {@linkcode SelectEquipModal} that renders a single selectable equipment tile.
 * TODO this should be a button, there's no real reason why it isn't
 * @component `SingleEquipment`
 * @requires {@linkcode useModal}
 * @requires {@linkcode dataFiles}, {@linkcode builderActions}
 * @param {{ index: number, type: string, data: object }} props 
 */
function SingleEquipment({ index, type, data }) {
    // React Hooks
    const dispatch = useDispatch();
    const { ref, fontSize } = useFitText();
    const { closeModal } = useModal();
    const { shipId, devices } = useSelector((state) => state.builder);
    const { loadedIds } = useSelector((state) => state.customEquippable);

    /* Do not create a tile for the Ancient Weapon, as it is tied to enhancement. */
    if(data.name === 'Ancient Weapon') return null;

    /**
     * Create an empty mods object to attach to a newly created Primary Weapon/Device.
     * ? This is dynamically created to account for the Colonial Sentinel's additional mod slot.
     */
    const emptyModsObj = ((res={}) => {
        let count = 0;
        while(count < dataFiles.shipData[shipId].max_mods) {
            res[count] = null;
            count++;
        }
        return res;
    })();

    /** 
     * When a piece of equipment is selected, add it to the loadout & close the modal. 
     * ? The modal is closed first to prevent a double-click. All code still executes.
     */
    const onClick = (event) => {
        event.stopPropagation();
        closeModal();
        switch(type) {
            case 'Primary': 
                return dispatch(builderActions.updatePrimary(index, data.id, emptyModsObj));
            case 'Secondary': 
                return dispatch(builderActions.updateSecondary(index, data.id, data.stack_size));
            case 'Devices': 
                return dispatch(builderActions.updateDevice(index, data.id, emptyModsObj));
            case 'Consumables': 
                return dispatch(builderActions.updateConsumable(index, data.id, data.stack_size));
        }
    };


    const disabled = () => {
        const invalidShip = data.allowed_ships && !data.allowed_ships.includes(shipId);
        const deviceConflicts = type === 'Devices' && (() => {
            if(data.allow_multi_install) 
                return false;
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

    /**
     * Return the equipment tile.
     * TODO div separation may not be necessary? tinker
     */
    return (<div className={`modal-single-equip${disabled() ? ' disabled' : ''}`} onClick={onClick} aria-hidden>
        {/* Equipment Name */}
        <div className='modal-equip-name' ref={ref} style={{ fontSize }}>
            <h4>{data.name}</h4>
        </div>

        {/* Equipment Icon */}
        <div className='modal-equip-icon'>
            <BucketImage dir={data.icon} />
        </div>
    </div>);
}
