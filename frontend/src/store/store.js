// * frontend/src/store/store.js
// ? Store is created in `frontend/src/main.jsx`.

// Node Module Imports
import { 
    legacy_createStore as createStore, 
    combineReducers, 
    applyMiddleware, 
    compose } from 'redux';
import thunk from 'redux-thunk';
// Local Module Imports
import awsReducer from './aws';
import builderReducer from './builder';
import loadoutReducer from './loadout';
import sessionReducer from './session';

/** 
 * The primary Redux reducer (and by extension, thunk) controller. This connects all thunk actions
 * to the Redux store by passing itself into {@linkcode configureStore}.
 * @type {Reducer}
**/
const rootReducer = combineReducers({
    aws: awsReducer,
    builder: builderReducer,
    loadout: loadoutReducer,
    session: sessionReducer
});

/** 
 * Holds the current Redux store enhancer. Variable contents are dependent on whether the current
 * environment is production or not.
 * - **In production**, the enhancer will only apply `thunk` middleware.
 * - **In development**, the enhancer applies the thunk middleware alongside a logger, with
 * Redux DevTools' `compose` enhancer on top.
 * @type {StoreEnhancer}
**/
let enhancer;
if(import.meta.env.MODE === 'production') enhancer = applyMiddleware(thunk);
else {
    const logger = (await import('redux-logger')).default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

/**
 * This method, when invoked, creates the Redux store using configuration defined in
 * `src/store/store.js`.
 * @requires {@linkcode rootReducer}
 * @requires {@linkcode enhancer}
 * @param {any} [preloadedState] The preloaded state, if any exists.
 * @returns {Store}
 */
const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);

/** Exports the Redux store. */
export default configureStore;