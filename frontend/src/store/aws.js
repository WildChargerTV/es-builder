// * frontend/src/store/aws.js
// TODO documentation

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
const ADD_ENTRY = 'aws/addEntry';
const SET_URL = 'aws/setUrl';

//* --------------------[Thunk Action Creators]-------------------- *//
const addEntry = (dir) => ({ type: ADD_ENTRY, payload: dir });
const setUrl = (dir, url) => ({ type: SET_URL, payload: { dir, url }});

//* --------------------[Thunk Middlewares]-------------------- *//
export const retrieveAsset = (dir) => async (dispatch) => {
    dispatch(addEntry(dir));

    // Send a `GET` request to the appropriate asset directory. Decode the response.
    const res = await csrfFetch(`/img-assets${dir}`);
    const data = await res.json();

    // Dispatch the `setUrl` thunk action and return the `csrfFetch` response.
    dispatch(setUrl(dir, data.url));
}

//* --------------------[Initial State]-------------------- *//
const initialState = { bucket: 'aa-capstone-esbuilder-s3' };

//* --------------------[Redux Reducer]-------------------- *//
export default function awsReducer(state=initialState, action) {
    switch(action.type) {
        case ADD_ENTRY: {
            const clone = structuredClone(state);
            clone[action.payload] = {
                requested: true,
                url: null
            };
            return clone;
        }
        case SET_URL: {
            const clone = structuredClone(state);
            const { dir, url } = action.payload;
            clone[dir].url = url;
            return clone;
        }
        default:
            return state;
    }
}