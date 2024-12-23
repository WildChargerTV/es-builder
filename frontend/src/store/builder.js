// * frontend/src/store/builder.js
// TODO complete documentation

//* --------------------[Thunk Action Identifiers]-------------------- *//
const SET_MODE = 'builder/setMode';
const SET_TAB = 'builder/setTab';
const SET_NAME = 'builder/setName';
const SET_SHIP = 'builder/setShip';
const SET_SHIP_PRESET = 'builder/setPreset'
const SET_ENHANCE = 'builder/setEnhancement';
const SET_FOCUS_EQUIP = 'builder/setFocusedEquipment';
const SET_PRIMARY_WEAPON = 'builder/setPrimaryWeapon';
const SET_SECONDARY_WEAPON = 'builder/setSecondaryWeapon';
const SET_DEVICE = 'builder/setDevice';
const SET_CONSUMABLE = 'builder/setConsumable';
const BULK_SET_STATE = 'builder/bulkSetState';
const RESET_STATE = 'builder/resetState';
const RESET_SLICE = 'builder/resetStateSlice';

//* --------------------[Thunk Action Creators]-------------------- *//
const setMode = (mode) => ({ type: SET_MODE, payload: mode });
const setTab = (tabId) => ({ type: SET_TAB, payload: tabId });
const setName = (name) => ({ type: SET_NAME, payload: name });
const setShip = (shipId) => ({ type: SET_SHIP, payload: shipId });
const setPreset = (presetId) => ({ type: SET_SHIP_PRESET, payload: presetId });
const setEnhancement = (index, enhanceId) => ({ type: SET_ENHANCE, payload: { index, enhanceId } });
const setFocusedEquipment = (category, id) => ({ type: SET_FOCUS_EQUIP, payload: { category, id } });
const setPrimaryWeapon = (index, weaponId, mods) => ({ type: SET_PRIMARY_WEAPON, payload: { index, weaponId, mods } });
const setSecondaryWeapon = (index, weaponId, quantity) => ({ type: SET_SECONDARY_WEAPON, payload: { index, weaponId, quantity } });
const setDevice = (index, deviceId, mods) => ({ type: SET_DEVICE, payload: { index, deviceId, mods } });
const setConsumable = (index, consumableId, quantity) => ({ type: SET_CONSUMABLE, payload: { index, consumableId, quantity } });
const bulkSetState = (data) => ({ type: BULK_SET_STATE, payload: data });
const resetState = (mode) => ({ type: RESET_STATE, payload: mode });
const resetStateSlice = (sliceName) => ({ type: RESET_SLICE, payload: sliceName })

//* --------------------[Thunk Middlewares]-------------------- *//
/**
 * Thunk middleware to change the current builder mode.
 * @param {'create' | 'edit' | 'view'} mode
 * @returns {(dispatch: any) => void}
 */
export const changeMode = (mode) => async (dispatch) => {
    const VALID_MODES = ['create', 'edit', 'view'];
    if(VALID_MODES.includes(mode)) 
        dispatch(setMode(mode));
    else 
        throw new TypeError(`Invalid loadout builder type ${mode}`);
};

/**
 * Thunk middleware to change the current loadout builder tab.
 * @param {0 | 1 | 2} tabId
 * @returns {(dispatch) => void}
 */
export const changeTab = (tabId) => (dispatch) => {
    if(tabId >= 0 && tabId <= 2) 
        dispatch(setTab(tabId));
    else 
        throw new RangeError(`Invalid loadout builder tab number ${tabId}`);
};

/**
 * Thunk middleware to change the name of the current loadout. Must be between 4 and 30 characters.
 * @param {string} name
 * @returns {(dispatch) => void}
 */
export const changeName = (name) => (dispatch) => {
    dispatch(setName(name));
}

/**
 * Thunk middleware to change the currently equipped ship.
 * @param {0 | 1 | 2 | 3} shipId
 * @returns {(dispatch) => void}
 */
export const changeShip = (shipId) => (dispatch) => {
    if(shipId >= 0 && shipId <= 3)
        dispatch(setShip(shipId));
    else 
        throw new RangeError(`Invalid loadout ship ID number ${shipId}`);
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
 * @returns {(dispatch) => void}
 */
export const changeFocusEquip = (category, id) => (dispatch) => {
    const VALID_CATEGORIES = ['Primary', 'Secondary', 'Devices', 'Consumables'];
    if(category === 'reset') 
        dispatch(setFocusedEquipment(null, null))
    else if(VALID_CATEGORIES.indexOf(category) !== -1 && id >= 0) 
        dispatch(setFocusedEquipment(category, id));
    else 
        throw new Error('One or both values passed in to changeFocusEquip are missing or invalid');
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
    else if((index >= 0 && index <= 3) && ((weaponId >= 0 && weaponId <= 23) || weaponId === null))
        dispatch(setPrimaryWeapon(index, weaponId, mods));
    else 
        throw new RangeError('One or both values passed into changePrimary are invalid');
};

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
    else if((index >= 0 && index <= 5) && ((deviceId >= 0 && deviceId <= 83) || deviceId === null)) 
        dispatch(setDevice(index, deviceId, mods));
    else 
        throw new RangeError('One or both values passed into changeDevice are invalid');
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

export const bulkUpdateState = (data) => (dispatch) => {
    // TODO add checks to ensure state data is all valid
    const { name, shipId, enhancements, primaryWeapons, secondaryWeapons, devices, consumables } = data;
    dispatch(bulkSetState({ name, shipId, enhancements, primaryWeapons, secondaryWeapons, devices, consumables }));
}

export const resetSlice = (sliceName) => (dispatch) => {
    for(const slice in initialState)
        if(slice === sliceName) 
            dispatch(resetStateSlice(sliceName));
};

export const clearState = (mode) => (dispatch) => {
    dispatch(resetState(mode));
};

//* --------------------[Initial State]-------------------- *//
/** The initial state for `builder`. */
const initialState = { 
    mode: null,
    tabId: 0,
    name: 'Loadout Name',
    shipId: null,
    shipPreset: null,
    enhancements: { selected: null, 0: null, 1: null, 2: null },
    focusedEquipment: { category: null, id: null },
    primaryWeapons: {},
    secondaryWeapons: {},
    devices: {},
    consumables: {}
};

//* --------------------[Redux Reducer]-------------------- *//
/**
 * The thunk reducer for the `builder` state, which manages and stores all loadout data loaded into
 * the site's loadout builder, whether to view, edit, or create.
 * @param {{ 
 *      mode: string; 
 *      tabId: number; 
 *      name: string;
 *      shipId: number; 
 *      shipPreset: string | null; 
 *      enhancements: { selected: number; 0: number; 1: number; 2: number; }; 
 *      focusedEquipment: { category: string; id: number; }; 
 *      primaryWeapons: {}; 
 *      secondaryWeapons: {}; 
 *      devices: {}; 
 *      consumables: {}; 
 * }} [state=initialState]
 * @param {object} action
 * @returns {({ ...; } | ... 5 more ... | { ...; })}
 */
export default function builderReducer(state=initialState, action) {
    switch(action.type) {
        case SET_MODE:
            return { ...state, mode: action.payload };
        case SET_TAB:
            return { ...state, tabId: action.payload };
        case SET_NAME:
            return { ...state, name: action.payload };
        case SET_SHIP:
            return { ...state, shipId: action.payload };
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
                    id: weaponId
                }
            };
        }
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
            clone[index] = `${weaponId}x${quantity}`;

            // Return the new state, alongside an updated equipment focus.
            return { 
                ...state, 
                secondaryWeapons: clone, 
                focusedEquipment: {
                    category: 'Secondary',
                    id: weaponId
                }
            };
        }
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
                    id: action.payload.deviceId
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
            clone[index] = `${consumableId}x${quantity}`;

            // Return the new state, alongside an updated equipment focus.
            return { 
                ...state, 
                consumables: clone, 
                focusedEquipment: {
                    category: 'Consumables',
                    id: action.payload.consumableId 
                }
            };
        }
        case BULK_SET_STATE: {
            const clone = action.payload;
            clone.mode = state.mode;
            clone.tabId = state.tabId;
            clone.shipPreset = null;
            clone.focusedEquipment = state.focusedEquipment;
            return clone;
        }
        case RESET_STATE: {
            const clone = structuredClone(initialState);
            clone.mode = action.payload;
            return clone;
        }
        case RESET_SLICE: {
            const clone = structuredClone(state);
            clone[action.payload] = initialState[action.payload];
            return clone;
        }
        default:
            return state;
    }
}