// * frontend/src/store/loadout.js
// TODO complete documentation

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
const GET_LOADOUT_MULTI = 'loadout/readMultipleLoadouts';
const SET_CURRENT_ID = 'loadout/updateActiveLoadoutId';
const SET_PRIMARY_CACHE = 'loadout/updatePrimaryDataCache';
const SET_SECONDARY_CACHE = 'loadout/updateSecondaryDataCache';
const DEL_LOADOUT = 'loadout/deleteLoadoutById';
const RESET_SLICE = 'loadout/resetStateSlice';

//* --------------------[Thunk Action Creators]-------------------- *//
const readMultipleLoadouts = (loadouts) => ({ type: GET_LOADOUT_MULTI, payload: loadouts });
const updateActiveLoadoutId = (loadoutId) => ({ type: SET_CURRENT_ID, payload: loadoutId });
const updatePrimaryDataCache = (data) => ({ type: SET_PRIMARY_CACHE, payload: data });
const updateSecondaryDataCache = (data) => ({ type: SET_SECONDARY_CACHE, payload: data });
const deleteLoadoutById = (loadoutId) => ({ type: DEL_LOADOUT, payload: loadoutId });
const resetStateSlice = (sliceName) => ({ type: RESET_SLICE, payload: sliceName });

//* --------------------[Thunk Middlewares]-------------------- *//
export const createLoadout = (loadout) => async () => {
    const res = await csrfFetch('/api/loadouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: loadout
    });
    if(res.ok) 
        return await res.json();
    return res;
};

export const getLoadout = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/loadouts/${id}`);

    if(res.ok) {
        const loadout = await res.json();
        dispatch(updateActiveLoadoutId(loadout.id));
        return loadout;
    }
}; 

export const getRecentLoadouts = () => async (dispatch) => {
    const res = await csrfFetch('/api/loadouts');
    if(res.ok) {
        const loadouts = await res.json();
        dispatch(readMultipleLoadouts(loadouts));
    }
    return res;
};

export const updateLoadout = (id, loadout) => async () => {
    console.log('hi');
    const res = await csrfFetch(`/api/loadouts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: loadout
    });
    if(res.ok) 
        console.log('success');
};

export const updateActiveId = (id) => (dispatch) => {
    dispatch(updateActiveLoadoutId(id));
};

export const updatePrimaryDataBuffer = (data) => (dispatch) => {
    dispatch(updatePrimaryDataCache(data));
}
export const updateSecondaryDataBuffer = (data) => (dispatch) => {
    dispatch(updateSecondaryDataCache(data));
}

export const deleteLoadout = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/loadouts/${id}`, { method: 'DELETE' });
    if(res.ok) dispatch(deleteLoadoutById(id));
};

export const resetSlice = (sliceName) => (dispatch) => {
    for(const slice in initialState)
        if(slice === sliceName) dispatch(resetStateSlice(sliceName))
};

//* --------------------[Initial State]-------------------- *//
/** The initial state for `loadout`. */
const initialState = {
    activeLoadoutId: null,
    primaryWeaponCache: null,
    secondaryWeaponCache: null,
    recentLoadouts: []
};

//* --------------------[Redux Reducer]-------------------- *//
export default function loadoutReducer(state=initialState, action) {
    switch(action.type) {
        case GET_LOADOUT_MULTI:
            return { ...state, recentLoadouts: action.payload };
        case SET_CURRENT_ID:
            return { ...state, activeLoadoutId: action.payload };
        case SET_PRIMARY_CACHE:
            return { ...state, primaryWeaponCache: action.payload };
        case SET_SECONDARY_CACHE:
            return { ...state, secondaryWeaponCache: action.payload };
        case DEL_LOADOUT: {
            const clone = structuredClone(state);
            const id = action.payload;
            clone.activeLoadoutId = null;
            clone.recentLoadouts = clone.recentLoadouts.list.filter((loadout) => loadout.id !== id);
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