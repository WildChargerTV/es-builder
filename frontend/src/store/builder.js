// * frontend/src/store/builder.js
// TODO complete documentation

// Local Module Imports
import { shipData } from "../data";

//* --------------------[Thunk Action Identifiers]-------------------- *//
const SET_FLAG = 'builder/setFlag';
const SET_TAB = 'builder/setTab';
const SET_NAME = 'builder/setName';
const SET_SHIP = 'builder/setShip';
const SET_SHIP_PRESET = 'builder/setPreset'
const SET_ENHANCE = 'builder/setEnhancement';
const SET_FOCUS_EQUIP = 'builder/setFocusedEquipment';
const SET_PRIMARY_WEAPON = 'builder/setPrimaryWeapon';
const SET_PRIMARY_WEAPONS_OVERRIDE = 'builder/overridePrimaryWeapons';
const SET_SECONDARY_WEAPON = 'builder/setSecondaryWeapon';
const SET_SECONDARY_WEAPONS_OVERRIDE = 'builder/overrideSecondaryWeapons';
const SET_DEVICE = 'builder/setDevice';
const SET_CONSUMABLE = 'builder/setConsumable';
const BULK_SET_STATE = 'builder/bulkSetState';
const RESET_STATE = 'builder/resetState';

//* --------------------[Thunk Action Creators]-------------------- *//
const setFlag = (flag, bool) => ({ type: SET_FLAG, payload: { flag, bool } });
const setTab = (tabId) => ({ type: SET_TAB, payload: tabId });
const setName = (name) => ({ type: SET_NAME, payload: name });
const setShip = (shipId, pSlots, sSlots, dSlots, cSlots) => ({ type: SET_SHIP, payload: { shipId, pSlots, sSlots, dSlots, cSlots } });
const setPreset = (presetId) => ({ type: SET_SHIP_PRESET, payload: presetId });
const setEnhancement = (index, enhanceId) => ({ type: SET_ENHANCE, payload: { index, enhanceId } });
const setFocusedEquipment = (category, id, index) => ({ type: SET_FOCUS_EQUIP, payload: { category, id, index } });
const setPrimaryWeapon = (index, weaponId, mods) => ({ type: SET_PRIMARY_WEAPON, payload: { index, weaponId, mods } });
const overridePrimaryWeapons = (slice) => ({ type: SET_PRIMARY_WEAPONS_OVERRIDE, payload: slice });
const setSecondaryWeapon = (index, weaponId, quantity) => ({ type: SET_SECONDARY_WEAPON, payload: { index, weaponId, quantity } });
const overrideSecondaryWeapons = (slice) => ({ type: SET_SECONDARY_WEAPONS_OVERRIDE, payload: slice });
const setDevice = (index, deviceId, mods) => ({ type: SET_DEVICE, payload: { index, deviceId, mods } });
const setConsumable = (index, consumableId, quantity) => ({ type: SET_CONSUMABLE, payload: { index, consumableId, quantity } });
const bulkSetState = (data) => ({ type: BULK_SET_STATE, payload: data });
const resetState = (mode) => ({ type: RESET_STATE, payload: mode });

//* --------------------[Thunk Middlewares]-------------------- *//

/**
 * Thunk middleware to change a flag inside the Loadout Builder. The second value MUST be a boolean
 * in order for this middleware to complete.
 * ! allow AW & Splitter to be equipped together. First check for splitter, then for AW
 * 
 * Accepted flag values: `ancientWeaponEquipped`, `splitterEquipped`
 * @param {string} flag 
 * @param {boolean} bool 
 * @returns {(dispatch) => void} 
 */
export const changeFlag = (flag, bool) => (dispatch) => {
    const VALID_FLAGS = ['ancientWeaponEquipped', 'splitterEquipped'];
    if(VALID_FLAGS.includes(flag) && typeof bool === 'boolean')
        dispatch(setFlag(flag, bool));
    else
        throw new Error(`One or more values passed to changeFlag are missing or invalid: ${flag}, ${bool}`);
}

/**
 * Thunk middleware to change the currently selected Loadout Builder tab ID. Value must be between
 * 0 and 2, inclusive.
 * @param {0 | 1 | 2} tabId
 * @returns {(dispatch) => void}
 */
export const changeTab = (tabId) => (dispatch) => {
    if(tabId >= 0 && tabId <= 2) 
        dispatch(setTab(tabId));
    else 
        throw new RangeError(`Invalid loadout builder tab number: ${tabId}`);
};

/**
 * Thunk middleware to change the name of the current loadout in the Loadout Builder. Name length 
 * must be between 4 and 30 characters, inclusive.
 * @param {string} name
 * @returns {(dispatch) => void}
 */
export const changeName = (name) => (dispatch) => {
    if(name.length >= 4 && name.length <= 30)
        dispatch(setName(name));
    else
        throw new RangeError(`Invalid name length: ${name.length}`);
}

/**
 * Thunk middleware to change the currently equipped ship ID in the Loadout Builder. Should only
 * ever be called in Create mode, as changing the ship should not ever be possible after initial
 * submission. Value must be between 0 and 3, inclusive.
 * 
 * **WARNING: This middleware will RESET the following slices:** `shipPreset`, `focusedEquipment`.
 * The `primaryWeapons`, `secondaryWeapons`, `devices`, & `consumables` slices will be cleared &
 * set to the appropriate size.
 * @param {0 | 1 | 2 | 3} shipId
 * @returns {(dispatch) => void}
 */
export const changeShip = (shipId) => (dispatch) => {
    if(shipId >= 0 && shipId <= 3) {
        const { primary_weapons, secondary_weapons, devices, consumables } = shipData[shipId];
        const pSlots = ((res={}) => {
            for(let i = 0; i < primary_weapons; i++)
                res[i] = { id: null, mods: null }
            return res;
        })();
        const sSlots = ((res={}) => {
            for(let i = 0; i < secondary_weapons; i++)
                res[i] = null;
            return res;
        })();
        const dSlots = ((res={}) => {
            for(let i = 0; i < devices; i++)
                res[i] = { id: null, mods: null }
            return res;
        })();
        const cSlots = ((res={}) => {
            for(let i = 0; i < consumables; i++)
                res[i] = null;
            return res;
        })();
        dispatch(setShip(shipId, pSlots, sSlots, dSlots, cSlots));
    } else 
        throw new RangeError(`Invalid ship ID number ${shipId}`);
};

/**
 * Thunk middleware to change the currently selected ship preset.
 * @param {false | 'a' | 'b' | 'c' | 'reset'} presetId
 * @returns {(dispatch) => void}
 */
export const changeShipPreset = (presetId) => (dispatch) => {
    const VALID_PRESETS = ['a', 'b', 'c']
    if(presetId === 'reset') 
        dispatch(setPreset(null));
    else if(presetId === false || VALID_PRESETS.includes(presetId.toLowerCase()))
        dispatch(setPreset(presetId));
    else 
        throw new Error('Invalid ship preset value');
};

/**
 * Thunk middleware to change one of the currently selected enhancements, or reset the state slice.
 * @param {number | 'reset'} index
 * @param {number} enhanceId
 * @returns {(dispatch) => void}
 */
export const changeEnhancement = (index, enhanceId) => (dispatch) => {
    if(index === 'reset') 
        dispatch(setEnhancement('reset', null));
    else if(((index >= 0 && index <= 2) || index === 'selected') && (enhanceId >= 0 && enhanceId <= 26))
        dispatch(setEnhancement(index, enhanceId));
    else 
        throw new RangeError('One or both values passed to setEnhancement are invalid');
};

/**
 * Thunk middleware to change the currently selected equipment. Primarily changes what is displayed
 * in the `EquipmentInfo` component.
 * @param {'Primary' | 'Secondary' | 'Devices' | 'Consumables'} category
 * @param {number} id
 * @param {number} index
 * @returns {(dispatch) => void}
 */
export const changeFocusEquip = (category, id, index) => (dispatch) => {
    const VALID_CATEGORIES = ['Primary', 'Secondary', 'Devices', 'Consumables'];
    if(category === 'reset') 
        dispatch(setFocusedEquipment(null, null, null))
    else if(VALID_CATEGORIES.indexOf(category) !== -1 && (String(id).startsWith('c') || id >= 0)) 
        dispatch(setFocusedEquipment(category, id, index));
    else  
        throw new Error(`One or both values passed in to changeFocusEquip are missing or invalid: ${category}, ${id}, ${index}`);
};

/**
 * Thunk middleware to change one of the currently selected **Primary Weapons** and its 
 * modifications, or reset the state slice.
 * @param {number | 'reset'} index
 * @param {number} weaponId
 * @param {object} mods
 * @returns {(dispatch) => void}
 */
export const changePrimary = (index, weaponId, mods) => (dispatch) => {
    if(index === 'reset') 
        dispatch(setPrimaryWeapon('reset', null, null));
    else if((index >= 0 && index <= 3) && (String(weaponId).startsWith('c') || (weaponId >= 0 && weaponId <= 23) || weaponId === null))
        dispatch(setPrimaryWeapon(index, weaponId, mods));
    else 
        throw new RangeError('One or both values passed into changePrimary are invalid');
};
export const overridePrimary = (slice) => (dispatch) => dispatch(overridePrimaryWeapons(slice));

/**
 * Thunk middleware to change one of the currently selected **Secondary Weapons** and its quantity,
 * or reset the state slice.
 * @param {number | 'reset'} index
 * @param {number} weaponId
 * @param {number} quantity
 * @returns {(dispatch) => void}
 */
export const changeSecondary = (index, weaponId, quantity) => (dispatch) => {
    if(index === 'reset')
        dispatch(setSecondaryWeapon('reset', null, null));
    else if((index >= 0 && index <= 4) && ((weaponId >= 0 && weaponId <= 9) || weaponId === null))
        dispatch(setSecondaryWeapon(index, weaponId, quantity));
    else 
        throw new RangeError(`One or more values passed into changeSecondary are invalid: ${index}, ${weaponId}, ${quantity}`);
};
export const overrideSecondary = (slice) => (dispatch) => dispatch(overrideSecondaryWeapons(slice));

/**
 * Thunk middleware to change one of the currently selected **Devices** and its modifications, or
 * reset the state slice.
 * @param {number | 'reset'} index
 * @param {number} device
 * @param {object} mods
 * @returns {(dispatch) => void}
 */
export const changeDevice = (index, deviceId, mods) => (dispatch) => {
    if(index === 'reset')
        dispatch(setDevice('reset', null, null));
    else if((index >= 0 && index <= 5) && (String(deviceId).startsWith('c') || (deviceId >= 0 && deviceId <= 83) || deviceId === null)) 
        dispatch(setDevice(index, deviceId, mods));
    else 
        throw new RangeError(`One or both values passed into changeDevice are invalid: ${index}, ${deviceId}, ${mods}`);
}; 

/**
 * Thunk middleware to change one of the currently selected **Consumables** and its quantity, or
 * reset the state slice.
 * @param {number | 'reset'} index
 * @param {number} consumableId
 * @param {number} quantity
 * @returns {(dispatch) => void}
 */
export const changeConsumable = (index, consumableId, quantity) => (dispatch) => {
    if(index === 'reset')
        dispatch(setConsumable('reset', null, null));
    else if((index >= 0 && index <= 5) && ((consumableId >= 0 && consumableId <= 32) || consumableId === null))
        dispatch(setConsumable(index, consumableId, quantity));
    else 
        throw new RangeError('One or more values passed into changeConsumable are invalid');
};

/**
 * Thunk middleware to bulk load data into the Loadout Builder. This is the only way to modify
 * multiple slices of this state at once, and is only intended for use in the `LoadoutBuilderMain`
 * component, which only calls this middleware in the `'create'` & `'edit'` modes. **DO NOT CALL
 * THIS ANYWHERE ELSE.**
 * @param {object} data 
 * @returns {(dispatch) => void}
 */
export const bulkUpdateState = (data) => (dispatch) => {
    // TODO maybe add checks to ensure state data is all valid
    dispatch(bulkSetState(data));
}

/**
 * Thunk middleware to reset the state of the Loadout Builder back to default values and change the
 * mode. This is the only way to modify the current builder mode, and is only intended for use in
 * the `LoadoutBuilderMain` component, which also confirms whether the mode is valid or not. **DO
 * NOT CALL THIS ANYWHERE ELSE.**
 * @param {'create' | 'view' | 'edit'} mode 
 * @returns {(dispatch) => void}
 */
export const clearState = (mode) => (dispatch) => { dispatch(resetState(mode)); };

//* --------------------[Initial State]-------------------- *//
/** The initial state for `builder`. */
const initialState = { 
    mode: null,
    flags: {
        'ancientWeaponEquipped': false,
        'splitterEquipped': false
    },
    tabId: 0,
    name: 'LOADOUT NAME HERE',
    shipId: null,
    shipPreset: null,
    enhancements: { selected: null, 0: null, 1: null, 2: null },
    focusedEquipment: { category: null, id: null, index: null },
    primaryWeapons: {},
    secondaryWeapons: {},
    devices: {},
    consumables: {}
};

//* --------------------[Redux Reducer]-------------------- *//
/**
 * The thunk reducer for the `builder` state, which manages and stores all loadout data loaded into
 * the site's loadout builder, whether to view, edit, or create.
 * @param {initialState} [state=initialState]
 * @param {object} action
 * @returns {object}
 */
export default function builderReducer(state=initialState, action) {
    switch(action.type) {
        case SET_FLAG: {
            const { flag, bool } = action.payload;
            const clone = structuredClone(state);
            clone.flags[flag] = bool;
            return clone;
        }
        case SET_TAB:
            return { ...state, tabId: action.payload };
        case SET_NAME:
            return { ...state, name: action.payload };
        case SET_SHIP: {
            // Deconstruct the payload.
            const { shipId, pSlots, sSlots, dSlots, cSlots } = action.payload;
            const clone = structuredClone(state);
            clone.shipId = shipId;
            clone.shipPreset = initialState.shipPreset;
            clone.focusedEquipment = initialState.focusedEquipment;
            clone.primaryWeapons = pSlots;
            clone.secondaryWeapons = sSlots;
            clone.devices = dSlots;
            clone.consumables = cSlots;

            return clone;
        }
        case SET_SHIP_PRESET:
            return { ...state, shipPreset: action.payload };
        case SET_ENHANCE: {
            // Deconstruct the payload.
            const { index, enhanceId } = action.payload;

            // Reset the state if it was requested.
            if(index === 'reset') return {
                ...state,
                enhancements: initialState.enhancements
            };

            // Clone the current state and set the index to the appropriate value.
            const clone = structuredClone(state.enhancements);
            clone[index] = enhanceId;
            if(enhanceId === null) clone['selected'] = null;

            // Return the new state.
            return { ...state, enhancements: clone };
        }
        case SET_FOCUS_EQUIP:
            return { ...state, focusedEquipment: action.payload };
        case SET_PRIMARY_WEAPON: {
            // Deconstruct the payload.
            const { index, weaponId, mods } = action.payload;

            // Reset the state if it was requested.
            if(index === 'reset') return { 
                ...state, 
                primaryWeapons: initialState.primaryWeapons,
                focusedEquipment: initialState.focusedEquipment 
            };

            // Clone the current state and set the index to the appropriate value.
            const clone = structuredClone(state.primaryWeapons);
            clone[index] = {id: weaponId, mods};

            // Return the new state, alongside an updated equipment focus.
            return { 
                ...state, 
                primaryWeapons: clone, 
                focusedEquipment: {
                    category: 'Primary',
                    id: weaponId,
                    index: index
                }
            };
        }
        case SET_PRIMARY_WEAPONS_OVERRIDE: 
            return { ...state, primaryWeapons: action.payload };
        case SET_SECONDARY_WEAPON: {
            // Deconstruct the payload.
            const { index, weaponId, quantity } = action.payload;

            // Reset the state if it was requested.
            if(index === 'reset') return {
                ...state,
                secondaryWeapons: initialState.secondaryWeapons,
                focusedEquipment: initialState.focusedEquipment
            };

            // Clone the current state and set the index to the appropriate values.
            const clone = structuredClone(state.secondaryWeapons);
            clone[index] = weaponId >= 0 ? `${weaponId}x${quantity}` : null;

            // Return the new state, alongside an updated equipment focus.
            return { 
                ...state, 
                secondaryWeapons: clone, 
                focusedEquipment: {
                    category: 'Secondary',
                    id: weaponId,
                    index: index
                }
            };
        }
        case SET_SECONDARY_WEAPONS_OVERRIDE:
            return { ...state, secondaryWeapons: action.payload };
        case SET_DEVICE: {
            // Deconstruct the payload.
            const { index, deviceId, mods } = action.payload;

            // Reset the state if it was requested.
            if(index === 'reset') return {
                ...state,
                devices: initialState.devices,
                focusedEquipment: initialState.focusedEquipment
            };

            // Clone the current state and set the index to the appropriate values.
            const clone = structuredClone(state.devices);
            clone[index] = { id: deviceId, mods }

            // Return the new state, alongside an updated equipment focus.
            return { 
                ...state, 
                devices: clone, 
                focusedEquipment: {
                    category: 'Devices',
                    id: deviceId,
                    index: index
                }
            };
        }
        case SET_CONSUMABLE: {
            // Deconstruct the payload.
            const { index, consumableId, quantity } = action.payload;

            // Reset the state if it was requested.
            if(index === 'reset') return {
                ...state,
                consumables: initialState.consumables,
                focusedEquipment: initialState.focusedEquipment
            };

            // Clone the current state and set the index to the appropriate value.
            const clone = structuredClone(state.consumables);
            clone[index] = consumableId >= 0 ? `${consumableId}x${quantity}` : null;

            // Return the new state, alongside an updated equipment focus.
            return { 
                ...state, 
                consumables: clone, 
                focusedEquipment: {
                    category: 'Consumables',
                    id: consumableId,
                    index: index
                }
            };
        }
        case BULK_SET_STATE: {
            const clone = { ...structuredClone(state), ...action.payload };
            return clone;
        }
        case RESET_STATE: {
            const clone = structuredClone(initialState);
            clone.mode = action.payload;
            return clone;
        }
        default:
            return state;
    }
}