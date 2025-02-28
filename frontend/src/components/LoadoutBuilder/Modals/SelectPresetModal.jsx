// * frontend/src/components/LoadoutBuilder/Modals/PresetLoadoutModal.jsx
// TODO revisit element class & id names

// Node Module Imports
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import { useModal } from '../../../context/Modal';
import * as dataFiles from '../../../data';
import * as builderActions from '../../../store/builder';
import BucketImage from '../../../utils/BucketImage';

/**
 * Modal component to display a menu containing the current ship's loadout presets.
 * @component `SelectPresetModal`
 * @requires {@linkcode useModal}
 * @requires {@linkcode builderActions}, {@linkcode dataFiles}
 * @requires {@linkcode SinglePreset}
 */
export default function SelectPresetModal() {
    // React Hooks
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // Redux State Values
    const { shipId } = useSelector((state) => state.builder);

    /* Deconstruct the current ship's presets from the datafile. */
    const { a, b, c } = dataFiles.shipData[shipId].presets;

    /* Create a function that will apply all preset equipment of a single type. */
    const loadEquipment = (equipArr, dispatchAction) => {
        let slotIndex = 0;
        for(let equip of equipArr) {
            console.log(typeof equip)
            const args = typeof equip === 'object'
                ? [equip.id, equip.mods]
                : equip.split('x');
            dispatch(dispatchAction(slotIndex, args[0], args[1]));
            slotIndex++;
        }
    };

    /**
     * When a preset loadout is chosen, apply its data to the builder and close the modal.
     * TODO make sure this accounts for AW/Splitter & generally potentially refactor
     */
    const onClick = (event) => {
        event.stopPropagation();

        // Update the current ship preset in the Redux state.
        dispatch(builderActions.updateShipPreset(event.target.id));

        // Grab the selected loadout from the datafile.
        const selectedLoadout = dataFiles.shipData[shipId].presets[event.target.id];

        // Apply the loadout data to the existing slots.
        // eventuallyTODO Consolidate into a single function call.
        loadEquipment(selectedLoadout.primary, builderActions.updatePrimary);
        loadEquipment(selectedLoadout.secondary, builderActions.updateSecondary);
        loadEquipment(selectedLoadout.device, builderActions.updateDevice);
        loadEquipment(selectedLoadout.consumable, builderActions.updateConsumable);

        // Reset the currently focused equipment.
        // TODO this should be handled on ship switches, not here
        dispatch(builderActions.updateFocusEquip('reset'));

        // Close the modal.
        closeModal();
    }

    /* Return the modal content. */
    return (<>
        {/* Modal Title */}
        <h2 className='modal-title'>Select a Preset</h2>

        {/* Preset Loadout Buttons */}
        <div className='modal-preset-list'>
            <SinglePreset data={a} presetId='A' onClick={onClick} />
            <SinglePreset data={b} presetId='B' onClick={onClick} />
            <SinglePreset data={c} presetId='C' onClick={onClick} />
        </div>
    </>);
}

/**
 * Sub-component of {@linkcode SelectPresetModal} that renders a single selectable ship preset.
 * @param {{ data: object, presetId: string, onClick: Function }} props 
 */
function SinglePreset({ data, presetId, onClick }) {
    // React Hooks
    const { shipId } = useSelector((state) => state.builder);

    /* Create a function that splits the string data of Secondary Weapons & Consumables. */
    const splitStringData = (arr) => arr.map((str) => {
        if(str === null) 
            return { id: null, quantity: null };
        const [id, quantity] = str.split('x');
        return { id, quantity };
    });

    /* Create a function that assembles a single column of equipment in the preset. */
    const mapEquipment = (arr, dataFile) => (<ul className='modal-preset-grid-column'>
        {arr.map((equipment) => equipment.id && (
            <li key={crypto.randomUUID()} className='modal-preset-grid-tile'>
                <BucketImage dir={dataFile[equipment.id].icon} />
                {equipment?.quantity && <p>{equipment.quantity}</p>}
            </li>
        ))}
    </ul>);

    /* Return the button & its content. */
    return (<button className='modal-ship-preset' id={presetId.toLowerCase()} onClick={onClick}>
        {/* Preset Title */}
        <h3>{dataFiles.shipData[shipId].name} Preset {presetId}</h3>

        {/* Preset Equipment Lists */}
        <div className='modal-preset-grid'>
            {mapEquipment(data.primary, dataFiles.primaryWeaponData)}
            {mapEquipment(splitStringData(data.secondary), dataFiles.secondaryWeaponData)}
            {mapEquipment(data.device, dataFiles.deviceData)}
            {mapEquipment(splitStringData(data.consumable), dataFiles.consumableData)}
        </div>
    </button>);
}
