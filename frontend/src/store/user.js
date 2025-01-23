// * frontend/src/store/user.js

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
const SET_ACTIVE_USER = 'user/setActiveUser';

//* --------------------[Thunk Action Creators]-------------------- *//
const setActiveUser = (user) => ({ type: SET_ACTIVE_USER, payload: user });

//* --------------------[Thunk Middlewares]-------------------- *//
    const res = await csrfFetch(`/api/users/${id}`);

    if(res.ok) {
export const updateActiveUser = (userId) => async (dispatch) => {
        const user = await res.json();
        dispatch(setActiveUser(user));
        return user;
    }
    return res;
}

//* --------------------[Initial State]-------------------- *//
/** The initial state for `user`. */
const initialState = {
    activeUser: {}
};

//* --------------------[Redux Reducer]-------------------- *//
export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case SET_ACTIVE_USER:
            return { ...state, activeUser: action.payload };
        default:
            return state;
    }
}