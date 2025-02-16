// * frontend/src/store/aws.js
// ! This method of retrieving AWS assets is due for deprecation in favor of AWS SDK v3
// ! functionality. Documentation may be limited or out of date.

// Local Module Imports
import { csrfFetch } from './csrf';

//* --------------------[Thunk Action Identifiers]-------------------- *//
// ? Action Identifiers utilize ADD/GET/SET/DEL terminology.
const ADD_ENTRY = 'aws/addEntry';
const SET_URL = 'aws/setUrl';

//* --------------------[Thunk Action Creators]-------------------- *//
// ? Action Creators utilize Add/Get/Set/Remove terminology.
const addEntry = (dir) => ({ type: ADD_ENTRY, payload: dir });
const setUrl = (dir, url) => ({ type: SET_URL, payload: { dir, url }});

//* --------------------[Thunk Middlewares]-------------------- *//
// ? Middlewares utilize Create/Read/Update/Delete terminology.

/**
 * Thunk action to retrieve a presigned URL referencing an asset in the AWS bucket.
 * @param {string} dir 
 * @returns {(dispatch: function) => void}
 */
export const retrieveAsset = (dir) => async (dispatch) => {
    dispatch(addEntry(dir));

    // Send a `GET` request to the appropriate asset directory. Decode the response.
    const res = await csrfFetch(`/img-assets${dir}`);
    const data = await res.json();

    // Dispatch the `setUrl` thunk action and return the `csrfFetch` response.
    dispatch(setUrl(dir, data.url));
}

//* --------------------[Initial State]-------------------- *//
/** The initial state for `aws`. */
const initialState = { bucket: 'aa-capstone-esbuilder-s3' };

//* --------------------[Redux Reducer]-------------------- *//
/**
 * The thunk reducer for the `aws` state, which manages and stores the data of assets retrieved
 * from the AWS bucket.
 * @param {initialState} [state=initialState]
 * @param {object} action
 * @returns {object}
 */
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