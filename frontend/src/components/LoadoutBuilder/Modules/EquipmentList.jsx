// * frontend/src/components/LoadoutBuilder/Modules/EquipmentList.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
// Local Module Imports
import ChangeQuantityModal from '../Modals/ChangeQuantityModal';
import SelectEquipModal from '../Modals/SelectEquipModal';
import SelectModModal from '../Modals/SelectModModal';
import BucketImage from '../../Bucket/BucketImage';
import OpenModal from '../../Modal/OpenModal';
import * as SVG from '../../../assets/svg';
import * as dataFile from '../../../data';
import * as builderActions from '../../../store/builder';
import { readCustomEquippable } from '../../../store/customEquippable';
import * as loadoutActions from '../../../store/loadout';


/**
 * Renders the Equipment Interface, styled almost exactly as it is in-game. This component consists 
 * of four {@linkcode EquipmentColumn}s, representing the four equipment types. Each column has a
 * list of equipment slots, the amount of which is managed here.
 * 
 * The available slot quantity is initially set to the amount dictated by the currently selected 
 * ship. If the **Ancient Weapon** or **Splitter** enhancements are equipped, the appropriate
 * changes are made to the quantity. Additionally, this component is responsible for creating a
 * save point that can restore prior configurations when these enhancements are unequipped.
 * @component `EquipmentList`
 * @requires {@linkcode dataFile} {@linkcode builderActions} {@linkcode loadoutActions}
 * @requires {@linkcode EquipmentColumn}
 * @returns {ReactElement}
 */
export default function EquipmentList() {
    // React Hooks
    const dispatch = useDispatch();
    const builder = useSelector((state) => state.builder);
    const { primaryWeaponCache, secondaryWeaponCache } = useSelector((state) => state.loadout);
    // Local State Values
    const [weaponSlots, setWeaponSlots] = useState([0, 0]);
    
    /** Get the currently selected ship data. */
    const currShip = (builder.shipId >= 0) && dataFile.shipData[builder.shipId];
    // Destructure the required flags from the Redux state.
    const { ancientWeaponEquipped, splitterEquipped } = builder.flags;

    /**
     * Handle the cases where either the Ancient Weapon or Splitter enhancements are equipped.
     * This should change the number of allowed slots sent to sub-components, and also override
     * the Primary & Secondary Weapon states so that when a loadout is submitted, no extraneous
     * data is accidentally left in.
     * ? Both can be equipped at the same time; however, the effect of Ancient Weapon overrides
     * ? that of Splitter.
     * ! This should be the ONLY code to dispatch `overridePrimary` and `overrideSecondary`.
     */
    useEffect(() => {
        // If there is no currently selected ship or ship preset (in create mode), return early.
        if(!currShip || (builder.mode === 'create' && builder.shipPreset === null)) return;

        // If Ancient Weapon is equipped, only 1 Primary slot is allowed.
        const primarySlots = ancientWeaponEquipped ? 1 : currShip.primary_weapons;

        // If Ancient Weapon is equipped, load the data buffers and wipe the Redux state slices.
        // Does not fire if the Ancient Weapon is already in the first slot.
        if(ancientWeaponEquipped && builder.primaryWeapons[0].id !== 0) {
            dispatch(loadoutActions.updatePrimaryDataBuffer(structuredClone(builder.primaryWeapons)));
            dispatch(loadoutActions.updateSecondaryDataBuffer(structuredClone(builder.secondaryWeapons)));
            dispatch(builderActions.overridePrimary({ 0: { id: 0, mods: null } }));
            dispatch(builderActions.overrideSecondary(null))
        } 
        // If Ancient Weapon is NOT equipped, restore from cache, or load an empty weaponset.
        else if(!ancientWeaponEquipped) {
            // Only load from the caches if they exist.
            // ? Only primary needs to be checked as both are given not-null data at the same time.
            if(primaryWeaponCache) {
                dispatch(builderActions.overridePrimary(primaryWeaponCache));
                dispatch(builderActions.overrideSecondary(secondaryWeaponCache));
                dispatch(loadoutActions.updatePrimaryDataBuffer(null));
                dispatch(loadoutActions.updateSecondaryDataBuffer(null));
            } 
            // Load a clean-slate empty state otherwise. Primarily occurs in Edit mode.
            // TODO eventually this should accommodate preset loadouts when loading from scratch.
            else if(builder.primaryWeapons[0].id === 0) {
                let cleanState = {};
                for(let i = 0; i < currShip.primary_weapons; i++)
                    cleanState[i] = { id: null, mods: null };
                dispatch(builderActions.overridePrimary(cleanState));

                cleanState = {};
                for(let i = 0; i < currShip.secondary_weapons; i++)
                    cleanState[i] = null;
                dispatch(builderActions.overrideSecondary(cleanState));
            }
        }
        
        // If Splitter is equipped, only 1 Secondary slot is allowed. Equipping Ancient Weapon
        // overrides Splitter, and all Secondary slots are removed.
        const secondarySlots = ((res=currShip.secondary_weapons) => {
            splitterEquipped && (res = 1);
            ancientWeaponEquipped && (res = 0);
            return res;
        })();

        // If Splitter is equipped & the Ancient Weapon is NOT, load the Secondary data buffer and
        // wipe its Redux state slice, leaving only the first one intact.
        if(splitterEquipped && !ancientWeaponEquipped && !secondaryWeaponCache) {
            dispatch(loadoutActions.updateSecondaryDataBuffer(structuredClone(builder.secondaryWeapons)));
            dispatch(builderActions.overrideSecondary({ 0: builder.secondaryWeapons[0] }));
        } 
        // If Splitter is NOT equipped, restore from cache, or load an empty weaponset.
        else if(!splitterEquipped && builder.secondaryWeapons) {
            // Only load from the cache if it exists and the Ancient Weapon is NOT equipped. Retain
            // the status of the first slot.
            if(secondaryWeaponCache && !ancientWeaponEquipped) {
                const clone = structuredClone(secondaryWeaponCache);
                clone[0] = builder.secondaryWeapons[0];
                dispatch(builderActions.overrideSecondary(clone));
                dispatch(loadoutActions.updateSecondaryDataBuffer(null));
            }
            // Load a clean-slate empty state otherwise. Primarily occurs in Edit mode.
            // TODO eventually this should accommodate preset loadouts when loading from scratch.
            else if(Object.entries(builder.secondaryWeapons).length !== currShip.secondary_weapons) {
                let cleanState = {};
                for(let i = 0; i < currShip.secondary_weapons; i++)
                    cleanState[i] = null;
                dispatch(builderActions.overrideSecondary(cleanState));
            }
        }

        // Apply the new amount of Primary & Secondary Weapon slots to the local state.
        setWeaponSlots([primarySlots, secondarySlots]);
    }, [dispatch, builder.mode, builder.primaryWeapons, builder.secondaryWeapons, builder.shipPreset, currShip, 
        ancientWeaponEquipped, splitterEquipped, primaryWeaponCache, secondaryWeaponCache]);

    /** Return the four equipment columns, each with their own data set. */
    return (<div id='builder-equipment-list'>
        <EquipmentColumn name='Primary' slots={weaponSlots[0]} reduxData={builder.primaryWeapons} />
        <EquipmentColumn name='Secondary' slots={weaponSlots[1]} reduxData={builder.secondaryWeapons} />
        <EquipmentColumn name='Devices' slots={currShip.devices} reduxData={builder.devices} />
        <EquipmentColumn name='Consumables' slots={currShip.consumables} reduxData={builder.consumables} />
    </div>);
}

/**
 * Sub-component of {@linkcode EquipmentList} that renders a single equipment column. The component
 * receives three props:
 * - `name`, a string that ultimately becomes the category reference for all other equipment
 * identification code
 * - `slots`, a number representing the amount of equipment slots that the column should render
 * - `reduxData`, which is data that is currently stored in the `builder` Redux store
 * 
 * The Redux data is converted into a mappable array and reorganized into usable data to pass into
 * the {@linkcode SingleEquipment} cells. These cells are rendered as a `<ul>`, to make vertical
 * arrangement easier overall.
 * @component `EquipmentColumn`
 * @requires {@linkcode SingleEquipment}
 * @param {{ 
 *      name: 'Primary' | 'Secondary' | 'Devices' | 'Consumables', 
 *      slots: number, 
 *      reduxData: object 
 * }} 
 * @returns {ReactElement}
 */
function EquipmentColumn({ name, slots, reduxData }) {
    /** Convert the data entries into an array whose length is limited by the given amount of slots. */
    const reduxDataArr = reduxData ? Object.entries(reduxData).slice(0, slots) : [];

    /** 
     * Create a key counter for the array mapping in the return statement.
     * An `increment` boolean allows the function to be called without incrementing, allowing it to
     * be used as the slot index as well as the key (where the slot index does NOT increment).
     */
    let keyCounter = 0;
    const key = (increment) => {
        const res = keyCounter;
        increment && keyCounter++;
        return res;
    }

    /** Create an organized object representing all required data for a single equipment tile. */
    const singleCellData = (slot, index, res={
        type: name,
        id: null,
        mods: null,
        quantity: null,
        index: null
    }) => {
        if(['Primary', 'Devices'].includes(name)) {
            res.id = slot.id;
            res.mods = slot.mods;
        } else { // Assuming Secondary or Consumables
            const [id, quantity] = slot ? slot.split('x') : [null, null];
            res.id = id;
            res.quantity = quantity;
        }
        res.index = index;
        return res;
    }

    /** Return the equipment column & its contents. */
    return (<div className='builder-equipment-list-col'>
        <h3 className='builder-equip-col-title'>{name}</h3>
        <ul className='builder-equip-col-slots'>
            {reduxDataArr.map((slot) => <SingleEquipment 
                key={`${name.toLowerCase()}-${key(true)}`} 
                slotData={singleCellData(slot[1], key(false))}
            />)}
        </ul>
    </div>);
}

/**
 * Sub-component of {@linkcode EquipmentColumn} that renders a single equipment slot. This slot can
 * be empty, or contain a piece of equipment added to the loadout. This component's main purpose is
 * to dynamically update its own contents based on any possible changes, including enhancement,
 * change of quantity, and installation of mods. 
 * 
 * An equipment cell is comprised of the following, in order:
 * 1. An icon that represents what the equipment looks like.
 * 2. 
 * @component `SingleEquipment`
 * @requires {@linkcode dataFile} {@linkcode builderActions} {@linkcode readCustomEquippable} 
 * @requires {@linkcode BucketImage} {@linkcode OpenModal} {@linkcode SelectEquipModal} {@linkcode SelectModModal} {@linkcode ChangeQuantityModal}
 * @param {{ slotData: {
 *      type: 'Primary' | 'Secondary' | 'Devices' | 'Consumables',
 *      id: number,
 *      mods: object,
 *      quantity: number,
 *      index: number
 * } }} 
 * @returns {ReactElement}
 */
function SingleEquipment({ slotData }) {
    // Deconstructed Props
    const { type, id, mods, quantity, index } = slotData;
    // React Hooks
    const dispatch = useDispatch();
    const { fontSize, ref } = useFitText();
    const { mode } = useSelector((state) => state.builder);
    // Local State Values
    const [data, setData] = useState(null);
    const [moddable, setModdable] = useState(false);

    /** 
     * Dynamically update the cell's contents as the equipment is changed or modified. 
     * ? This was originally a switch statement, but was changed for improved code readability.
     */
    useEffect(() => {
        // If the equipment is a Secondary or Consumable, get the ID's respective data and return.
        if(type === 'Secondary')
            return setData(dataFile.secondaryWeaponData[id]);
        else if(type === 'Consumables')
            return setData(dataFile.consumableData[id]);

        // * For the remaining two categories, Custom Equippable IDs must be accounted for. Custom
        // * Equippable IDs are differentiated by being prefaced with a lowercase 'c'.
        // Determine which datafile the ID should be referencing.
        const equipmentData = type === 'Primary' ? dataFile.primaryWeaponData : dataFile.deviceData;

        // If the ID is NOT a Custom Equippable, get the ID's respective data and return.
        if(typeof id === 'number' || id === null)
            return setData(equipmentData[id]);

        // Get the custom equippable's ID.
        const customId = Number(id.split('c')[1]);

        // Get the custom equippable's `equippableId` from the database, and get that ID's
        // respective data. Then, add an `enhanced` flag key and override the stats before sending
        // it to the local state.
        dispatch(readCustomEquippable(customId))
            .then((customEquippable) => {
                const clone = structuredClone(equipmentData[customEquippable.equippableId]);
                clone.enhanced = true;
                clone.stats = customEquippable.stats;
                return setData(clone);
            });
    }, [dispatch, type, id]);

    /**
     * Determine if the cell's equipment is moddable.
     * - All Primary Weapons can be modded except for the Ancient Weapon.
     * - Devices can only be modded if a -1 is not present inside the device's allowed_mods array.
     */
    useEffect(() => {
        setModdable(data && (
            (type === 'Primary' && data.id !== 0) || 
            (type === 'Devices' && (data?.allowed_mods[0] !== -1))
        ));
    }, [data, type]);

    /** When the cell is clicked, change the focused equipment data. */
    const showInfo = (event) => {
        event.stopPropagation();
        data
        ? dispatch(builderActions.changeFocusEquip(type, id, index))
        : dispatch(builderActions.changeFocusEquip('reset'));
    };

    /** 
     * Remove the cell's equipment from the loadout when the delete button is clicked. 
     * ? The Redux state will automatically reset the focused equipment data when this occurs.
     */
    const deleteEquip = (event) => {
        event.stopPropagation();
        switch(type) {
            case 'Primary': 
                return dispatch(builderActions.changePrimary(index, null, null));
            case 'Secondary': 
                return dispatch(builderActions.changeSecondary(index, null, null));
            case 'Devices': 
                return dispatch(builderActions.changeDevice(index, null, null));
            case 'Consumables': 
                return dispatch(builderActions.changeConsumable(index, null, null));
        }
    };

    /** Return the equipment cell. */
    return (<li className='builder-equip-cell' id={id} onClick={showInfo} aria-hidden>
        {/* Equipment Icon */}
        <div className='builder-equip-icon'>
            {data && <BucketImage dir={data?.icon} />}
        </div>

        {/* Equipment Name */}
        <div className='builder-equip-name' ref={ref} style={{ fontSize }}>
            <h3>
                {['Primary', 'Devices'].includes(type) && typeof id === 'string' && '★ '}
                {data?.name}
            </h3>
        </div>

        {/* Equipment Controls */}
        {mode !== 'view' && !(type === 'Primary' && id === 0) && <div className='builder-equip-controls'>
            {data
            ? <button onClick={deleteEquip}><SVG.RemoveEquipIcon height='1.25vw' /></button>
            : <OpenModal
                elementText={<SVG.AddEquipIcon height='1.25vw' />}
                modalComponent={<SelectEquipModal currEquip={{index, type}} />}
            />}
            {moddable && mods && Object.values(mods).includes(null) &&
            <OpenModal
                elementText={<SVG.AddModIcon height='1.25vw' />}
                modalComponent={<SelectModModal currEquip={{eIndex: index, eType: type}} />}
            />}
        </div>}

        {/* Equipment Quantity */}
        {(data && (type === 'Secondary' || type === 'Consumables')) &&
        <div className='builder-equip-quantity' aria-hidden>
            <OpenModal
                element='button'
                elementText={`${quantity}/${data.stack_size}`}
                modalComponent={<ChangeQuantityModal data={{type, equipId: id, currQuantity: quantity, index}} />}
                disabled={mode === 'view'}
            />
        </div>}

        {/* "Mod Squares" Indicators */}
        {moddable && mods &&
        <div className='builder-equip-mod-squares'>
            {Object.values(mods).map((modData) => <div 
                key={crypto.randomUUID()} 
                className={`builder-mod-square${modData === null ? ' inactive' : ' active'}`} 
            />)}
        </div>}
    </li>);
}
