// * frontend/src/store/user.js

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
const SET_ACTIVE_ID = 'user/readUserById';

//* --------------------[Thunk Action Creators]-------------------- *//
const readUserById = (user) => ({ type: SET_ACTIVE_ID, payload: user });

//* --------------------[Thunk Middlewares]-------------------- *//
export const getUser = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${id}`);

    if(res.ok) {
        const user = await res.json();
        dispatch(readUserById(user));
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
        case SET_ACTIVE_ID:
            return { ...state, activeUser: action.payload };
        default:
            return state;
    }
}