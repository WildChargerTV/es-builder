// * frontend/src/store/session.js

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//* --------------------[Thunk Action Creators]-------------------- *//
/**
 * Thunk action creator to set the current session user in the Redux store.
 * @param {*} user
 * @returns {{ type: SET_USER; payload: any; }}
 */
const setUser = (user) => ({
    type: SET_USER,
    payload: user
});
/**
 * Thunk action creator to remove the current session user in the Redux store.
 * @returns {{ type: REMOVE_USER; }}
 */
const removeUser = () => ({ type: REMOVE_USER });

//* --------------------[Thunk Middlewares]-------------------- *//
/**
 * Thunk middleware to restore the current session user.
 * @requires {@linkcode csrfFetch}
 * @returns {(dispatch: any) => Promise<Response>}
 */
export const restoreUser = () => async (dispatch) => {
    // Send a `GET` request to `/api/session`. Decode the response into a JSON object.
    const res = await csrfFetch('/api/session');
    const data = await res.json();

    // Dispatch the `setUser` thunk action and return the `csrfFetch` response.
    dispatch(setUser(data.user));
    return res;
}

/**
 * Thunk middleware to log in a user.
 * @requires {@linkcode csrfFetch}
 * @param {JSON} user
 * @returns {(dispatch: any) => Promise<Response>}
 */
export const login = (user) => async (dispatch) => {
    // Retrieve the submitted login form data.
    const { credential, password } = user;

    // Send a `POST` request to `/api/session` with the retrieved data. Decode the response into a
    // JSON object.
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    })
    const data = await res.json();

    // Dispatch the `setUser` thunk action and return the `csrfFetch` response.
    dispatch(setUser(data.user));
    return res;
};

/**
 * Thunk middleware to log out a user.
 * @requires {@linkcode csrfFetch}
 * @returns {(dispatch: any) => Promise<Response>}
 */
export const logout = () => async (dispatch) => {
    // Send a `DELETE` request to `/api/session`.
    const res = await csrfFetch('/api/session', { method: 'DELETE' });
    
    // Dispatch the `removeUser` thunk action and return the `csrfFetch` response.
    dispatch(removeUser());
    return res;
}

/**
 * Thunk middleware to sign up a new user.
 * @requires {@linkcode csrfFetch}
 * @param {{ username: string, email: email, password: string }} user
 * @returns {(dispatch: any) => Promise<Response>}
 */
export const signup = (user) => async (dispatch) => {
    // Retrieve the submitted signup form data.
    const { username, email, password } = user;

    // Send a `POST` request to `/api/users` with the retrieved data. Decode the response into a
    // JSON object.
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();

    // Dispatch the `setUser` thunk action and return the `csrfFetch` response.
    dispatch(setUser(data.user));
    return res;
}

//* --------------------[Initial State]-------------------- *//
/**
 * The initial state for `session`.
 * @type {{ user: JSON | null }}
 */
const initialState = { user: null };

//* --------------------[Redux Reducer]-------------------- *//
/**
 * The thunk reducer for the `session` state, which manages the current session user, logins,
 * and logouts.
 * @param {{ user: JSON | null; }} [state=initialState]
 * @param {string} action
 * @returns {{user: JSON | null;}}
 */
export default function sessionReducer(state=initialState, action) {
    switch(action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}