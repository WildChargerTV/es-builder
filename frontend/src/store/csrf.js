// * frontend/src/store/csrf.js
// Creates an alternative fetch command, designed to wrap all applicable requests with the csrf
// token created in the backend and stored in the cookies.

// Node Module Imports
import Cookies from 'js-cookie';
// Local Module Imports
import { isProd } from '../main';

/**
 * The Express backend server is configured to be CSRF protected, and will only accept requests
 * that have the right CSRF secret token in a header and the right CSRF token value in a cookie.
 * In order to make most `fetch` requests - particularly those with an HTTP verb other than 
 * `GET` - an `XSRF-TOKEN` header needs to be set on the request. This method wraps the `fetch` 
 * function on the `window` in order to achieve this effect.
 * 
 * @async
 * @param {string} url The URL of the backend path to fetch.
 * @param {{ 
 *      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; 
 *      headers?: { 
 *          'Content-Type'?: string | 'application/json';
 *          'XSRF-TOKEN'?: string 
 *      } | {};
 *      body?: string; }} [options={}] Options that can be included with the request.
 * - `method`: Must be one of the five possible HTTP request methods. Defaults to `GET`.
 * - `headers`: An object of potential headers.
 * - - `Content-Type`: Although this allows for a custom content type, there's almost never a good
 *                     reason to override the default value `application/json`.
 * - - `XSRF-TOKEN`: Reads from the `XSRF-TOKEN` cookie. **Not open to user input.**
 * - `body`: Stringified JSON request body, typically via `JSON.stringify()`. _This method does not
 *           alter this property._
 * @returns {Promise<Response>} A promise, functionally identical to a typical `fetch` call.
 */
export async function csrfFetch(url, options = {}) {
    // If no method is given, default to 'GET'.
    options.method = options.method || 'GET';
    // If no headers are given, default to an empty object.
    options.headers = options.headers || {};

    // If the method is not 'GET', set the 'Content-Type' header to 'application/json', and set
    // the 'XSRF-TOKEN' header to the value of the 'XSRF-TOKEN' cookie.
    if(options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    }

    // Perform the actual fetch request with the url and the options passed in.
    const res = await window.fetch(url, options);

    // If the response status code is over 400, throw the response as if it were an error. 
    // Otherwise, return the response.
    if(res.status >= 400) throw res;
    return res;
}

/**
 * This method `GET`s `/api/csrf/restore` so that the CSRF token can be refreshed in the frontend.
 * Effective only in development. Returns `null` in production.
 * @requires {@linkcode csrfFetch}
 * @requires {@linkcode isProd}
 * @returns {null | Promise<Response>}
 */
export const restoreCSRF = () => isProd ? null : csrfFetch('/api/csrf/restore');