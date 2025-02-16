// * frontend/src/main.jsx
// ? The App component is located in `frontend/src/App.jsx`.

// Node Module Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Local Module Imports
import App from './App';
import { Modal, ModalProvider } from './context/Modal';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import configureStore from './store/store';
import './index.css';
import './index-m.css';
 
/**
 * Determines if the current environment is development or production.
 * ? Typically, .env values aren't accessible at runtime. This value is the one and only exception.
 * @type {boolean}
 */
export const isProd = process.env.NODE_ENV === 'production';

/** 
 * The Redux store, as assembled & configured by {@linkcode configureStore}. Managed by the
 * Provider element supplied by `react-redux`.
 * @requires {@linkcode configureStore}
 */
const store = configureStore();

/**
 * If in development: 
 * 1. Force a CSRF token refresh on every render. 
 * 2. Allow for the exposure of certain elements to the browser command line.
 */
if(!isProd) {
    restoreCSRF();
    window.store = store;
    window.csrfFetch = csrfFetch;
    window.sessionActions = sessionActions;
}

/** 
 * Render the React app. 
 * ? `React.StrictMode` will render components twice in development, but not in production, in
 * ? order to detect any problems with your code and warn you about them.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ModalProvider>
            <Provider store={store}>
                <App />
                <Modal />
            </Provider>
        </ModalProvider>
    </React.StrictMode>
);
