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
    // Local State Values
    const { shipId } = useSelector((state) => state.builder);

    /* Deconstruct the current ship's presets from the datafile. */
    const { a, b, c } = dataFiles.shipData[shipId].presets;

    /**
     * When a preset loadout is chosen, apply its data to the builder and close the modal.
     * TODO make sure this accounts for AW/Splitter & generally potentially refactor
     */
    const onClick = (event) => {
        // Prevent a redirect/refresh.
        event.preventDefault();

        // Update the current ship preset in the Redux state.
        dispatch(builderActions.updateShipPreset(event.target.id));

        // Grab the selected loadout from the datafile.
        // TODO gotta tie this in to the deconstruction somehow???
        const selectedLoadout = dataFiles.shipData[shipId].presets[event.target.id];

        // Apply the loadout data to the existing slots.
        // TODO ugh... for loops......
        let pIndex = 0;
        for(let id of selectedLoadout.primary) {
            dispatch(builderActions.updatePrimary(pIndex, id.id, id.mods));
            pIndex++;
        }
        let sIndex = 0;
        for(let data of selectedLoadout.secondary) {
            console.log(selectedLoadout.secondary.length);
            if(data === null) 
                dispatch(builderActions.updateSecondary(sIndex, null, null));
            else {
                const [id, quantity] = data.split('x');
                dispatch(builderActions.updateSecondary(
                    selectedLoadout.secondary.indexOf(data), id, quantity
                ));
            }
            sIndex++;
        }
        let dIndex = 0;
        for(let id of selectedLoadout.device) {
            dispatch(builderActions.updateDevice(dIndex, id.id, id.mods));
            dIndex++;
        }
        let cIndex = 0;
        for(let data of selectedLoadout.consumable) {
            if(data === null)
                dispatch(builderActions.updateConsumable(cIndex, null, null));
            else {
                const [id, quantity] = data.split('x');
                dispatch(builderActions.updateConsumable(
                    selectedLoadout.consumable.indexOf(data), id, quantity
                ));
            }
            cIndex++;
        }

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
        <SinglePreset data={a} preset='A' onClick={onClick} />
        <SinglePreset data={b} preset='B' onClick={onClick} />
        <SinglePreset data={c} preset='C' onClick={onClick} />
    </>);
}

/**
 * Sub-component of {@linkcode SelectPresetModal} that renders a single selectable ship preset.
 * @requires {@linkcode PresetTile}
 * @param {{ data: object, preset: string, onClick: Function }} props 
 */
function SinglePreset({ data, preset, onClick }) {
    /* Split up the IDs & Quantities of Secondary Weapons & Consumables. */
    const secondaryList = data.secondary.map((str) => {
        if(str === null) return { id: null, quantity: null };
        const [id, quantity] = str.split('x');
        return { id, quantity };
    });
    const consumableList = data.consumable.map((str) => {
        if(str === null) return { id: null, quantity: null };
        const [id, quantity] = str.split('x');
        return { id, quantity };
    });

    /* Return the button & its content. */
    return (<button className='modal-ship-preset' id={preset.toLowerCase()} onClick={onClick}>
        {/* Preset Title */}
        <h3>Preset {preset}</h3>

        {/* Preset Equipment Lists */}
        <div className='modal-preset-grid'>
            <ul className='modal-preset-grid-column'>
                {data.primary.map((weapon) => weapon.id && <PresetTile 
                    key={crypto.randomUUID()} 
                    url={dataFiles.primaryWeaponData[weapon.id].icon} 
                />)}
            </ul>
            <ul className='modal-preset-grid-column'>
                {secondaryList.map((weapon) => weapon.id && <PresetTile 
                    key={crypto.randomUUID()} 
                    url={dataFiles.secondaryWeaponData[weapon.id].icon} 
                    quantity={weapon.quantity} 
                />)}
            </ul>
            <ul className='modal-preset-grid-column'>
                {data.device.map((device) => device.id && <PresetTile 
                    key={crypto.randomUUID()} 
                    url={dataFiles.deviceData[device.id].icon} 
                />)}
            </ul>
            <ul className='modal-preset-grid-column'>
                {consumableList.map((consumable) => consumable.id && <PresetTile 
                    key={crypto.randomUUID()} 
                    url={dataFiles.consumableData[consumable.id].icon} 
                    quantity={consumable.quantity} 
                />)}
            </ul>
        </div>
    </button>);
}

/**
 * Sub-component of {@linkcode SinglePreset} that renders a single tile representing one piece of
 * equipment. Where applicable, a quantity will be displayed.
 * @component `PresetTile`
 * @param {{ url: string, quantity?: number }} props 
 */
function PresetTile({ url, quantity }) {
    /* Return the list item. */
    return (<li className='modal-preset-grid-list'>
        <BucketImage dir={url} />
        {quantity !== undefined && <p>{quantity}</p>}
    </li>);
}
