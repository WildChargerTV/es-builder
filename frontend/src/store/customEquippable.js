// * frontend/src/store/customEquippable.js

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
const ADD_CUSTOM_EQUIPPABLE = 'customEquippable/addCustomEquippable';

//* --------------------[Thunk Action Creators]-------------------- *//
const addCustomEquippable = (customEquippable) => ({type: ADD_CUSTOM_EQUIPPABLE, payload: customEquippable});

//* --------------------[Thunk Middlewares]-------------------- *//
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

//* --------------------[Initial State]-------------------- *//
/** The initial state for `customEquippable`. */
const initialState = {
    loadedIds: {}
};

//* --------------------[Redux Reducer]-------------------- *//
export default function customEquippableReducer(state=initialState, action) {
    switch(action.type) {
        case ADD_CUSTOM_EQUIPPABLE: {
            const clone = structuredClone(state);
            clone.loadedIds[action.payload.id] = action.payload;
            return clone;
        }
        default:
            return state;
    }
}