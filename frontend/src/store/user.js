// * frontend/src/store/user.js

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
const SET_ACTIVE_USER = 'user/setActiveUser';
const RESET_SLICE = 'user/resetStateSlice';

//* --------------------[Thunk Action Creators]-------------------- *//
const setActiveUser = (user) => ({ type: SET_ACTIVE_USER, payload: user });
const resetStateSlice = (sliceName) => ({ type: RESET_SLICE, payload: sliceName });

//* --------------------[Thunk Middlewares]-------------------- *//
/**
 * Thunk middleware to return a User's Username, given its ID. Primarily used for the
 * `UserLoadouts` component.
 * 
 * The "active user" is simply referencing the User loaded into the Redux state. This should be
 * loaded/updated whenever a page focuses on a specific user's data.
 * @param {number} userId 
 * @returns {(dispatch: function) => {
 *      id: number,
 *      username: string
 * }}
 */
export const updateActiveUser = (userId) => async (dispatch) => {
    // Retrieve & return the user data from the backend.
    return await csrfFetch(`/api/users/${userId}`)
    .then(async (res) => {
        const user = await res.json();
        dispatch(setActiveUser(user));
        return user;
    });
};

/**
 * Thunk middleware to reset one of the slices in the `user` state. Slice name is case-sensitive.
 * @param {string} sliceName 
 * @returns {(dispatch: function) => void}
 */
export const resetSlice = (sliceName) => (dispatch) => {
    if(Object.keys(initialState).includes(sliceName))
        dispatch(resetStateSlice(sliceName));
};

//* --------------------[Initial State]-------------------- *//
/** The initial state for `user`. */
const initialState = {
    activeUser: {}
};

//* --------------------[Redux Reducer]-------------------- *//
/**
 * The thunk reducer for the `user` state, which manages and stores the data of existing users.
 * @param {initialState} [state=initialState]
 * @param {object} action
 * @returns {object}
 */
export default function userReducer(state=initialState, action) {
    /** Create a clone of the current state. */
    const clone = structuredClone(state);

    /** Return the state with the given modifications. */
    switch(action.type) {
        case SET_ACTIVE_USER:
            return { ...state, activeUser: action.payload };
        
        case RESET_SLICE:
            clone[action.payload] = initialState[action.payload];
            return clone;
            
        default:
            return state;
    }
}