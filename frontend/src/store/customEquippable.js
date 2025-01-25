// * frontend/src/store/customEquippable.js

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
// ? Action Identifiers utilize ADD/GET/SET/DEL terminology.
const ADD_CUSTOM_EQUIPPABLE = 'customEquippable/addCustomEquippable';
const RESET_SLICE = 'customEquippable/resetStateSlice';

//* --------------------[Thunk Action Creators]-------------------- *//
// ? Action Creators utilize Add/Get/Set/Remove terminology.
const addCustomEquippable = (customEquippable) => ({ type: ADD_CUSTOM_EQUIPPABLE, payload: customEquippable });
const resetStateSlice = (sliceName) => ({ type: RESET_SLICE, payload: sliceName });

//* --------------------[Thunk Middlewares]-------------------- *//
// ? Middlewares utilize Create/Read/Update/Delete terminology.

/**
 * Thunk middleware to create a new Custom Equippable, given its data. This middleware assumes that
 * the data of the Custom Equippable has already been verified. Once the Custom Equippable has been
 * created, it will be added to `loadedIds` and returned.
 * @param {object} equippableData 
 * @returns {(dispatch: function) => object}
 */
export const createCustomEquippable = (equippableData) => async (dispatch) => {
    return await csrfFetch('/api/custom-equippables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: equippableData
    }).then(async (res) => {
        const customEquippable = await res.json(); 
        dispatch(addCustomEquippable(customEquippable));
        return customEquippable;
    });
};

/**
 * Thunk middleware to retrieve a Custom Equippable, given its ID, and add it to `loadedIds`. This
 * middleware does not check if the Custom Equippable is already loaded; if it is, its data in the
 * Redux store will simply be overwritten. The retrieved Custom Equippable will be added to 
 * `loadedIds` and returned.
 * @param {number} equippableId 
 * @returns {(dispatch: function) => object}
 */
export const readCustomEquippable = (equippableId) => async (dispatch) => {
    return await csrfFetch(`/api/custom-equippables/${equippableId}`)
    .then(async (res) => {
        const customEquippable = await res.json();
        dispatch(addCustomEquippable(customEquippable));
        return customEquippable;
    });
};

/**
 * Thunk middleware to reset one of the slices in the `customEquippable` state. Slice name is
 * case-sensitive.
 * @param {string} sliceName 
 * @returns {(dispatch: function) => void}
 */
export const resetSlice = (sliceName) => (dispatch) => {
    if(Object.keys(initialState).includes(sliceName))
        dispatch(resetStateSlice(sliceName));
};

//* --------------------[Initial State]-------------------- *//
/** The initial state for `customEquippable`. */
const initialState = {
    loadedIds: {}
};

//* --------------------[Redux Reducer]-------------------- *//
/**
 * The thunk reducer for the `customEquippable` state, which stores the data of loaded Custom
 * Equippables.
 * @param {initialState} [state=initialState]
 * @param {object} action
 * @returns {object}
 */
export default function customEquippableReducer(state=initialState, action) {
    /** Create a clone of the current state. */
    const clone = structuredClone(state);

    /** Return the state with the given modifications. */
    switch(action.type) {
        case ADD_CUSTOM_EQUIPPABLE: 
            clone.loadedIds[action.payload.id] = action.payload;
            return clone;

        case RESET_SLICE: 
            clone[action.payload] = initialState[action.payload];
            return clone;

        default:
            return state;
    }
}