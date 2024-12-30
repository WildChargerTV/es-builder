// * frontend/src/store/customEquippable.js
// TODO documentation

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
const GET_CUSTOM_EQUIPPABLE = 'customEquippable/readCustomEquippable';

//* --------------------[Thunk Action Creators]-------------------- *//
const readCustomEquippable = (customEquippable) => ({type: GET_CUSTOM_EQUIPPABLE, payload: customEquippable});

//* --------------------[Thunk Middlewares]-------------------- *//
export const createCustomEquippable = (data) => async (dispatch) => {
    const res = await csrfFetch('/api/custom-equippables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    });
    if(res.ok) {
        const customEquippable = await res.json();
        dispatch(readCustomEquippable(customEquippable));
        return customEquippable;
    }   
    return res;
}

export const getCustomEquippable = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/custom-equippables/${id}`);

    if(res.ok) {
        const customEquippable = await res.json();
        dispatch(readCustomEquippable(customEquippable));
        return customEquippable;
    }
    return res;
}

//* --------------------[Initial State]-------------------- *//
/** The initial state for `customEquippable`. */
const initialState = {
    loadedIds: {}
};

//* --------------------[Redux Reducer]-------------------- *//
export default function customEquippableReducer(state=initialState, action) {
    switch(action.type) {
        case GET_CUSTOM_EQUIPPABLE: {
            const clone = structuredClone(state);
            clone.loadedIds[action.payload.id] = action.payload;
            return clone;
        }
        default:
            return state;
    }
}