// * frontend/src/App.jsx
// ? React app declaration is located in `frontend/src/main.jsx`.

// Node Module Imports
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
// Local Module Imports

import Navigation from './components/Navigation/Navigation';
import LandingPage from './components/Landing/Landing';
import RecentLoadouts from './components/Loadouts/Recents';
import Footer from './components/Footer/Footer';
import * as sessionActions from './store/session';

/**
 * The primary purpose of the `Layout` component is to stall rendering (or re-rendering) the rest
 * of the webpage until `sessionActions.restoreUser()` has completed execution. To do this, a slice
 * of local state named `isLoaded` is utilized. 
 * 
 * Every time the page is loaded/reloaded, `isLoaded` is set to `false`, and is only set back to
 * `true` _after_ `restoreUser()` has completed execution. Inside the `return` statement, whether
 * or not the `Outlet` component renders - which will then render the child elements as defined by
 * the router - hinges on this state variable. **Other pages will feature similar intentional 
 * bottlenecks to ensure overall page loading remains as linear as possible.**
 * @requires {@linkcode sessionActions.restoreUser()} from `./store/session.js`
 * @returns {ReactElement.Outlet}
 */
function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => { setIsLoaded(true) });
    }, [dispatch]);
    
    return (<>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
        <Footer isLoaded={isLoaded} />
    </>);
}

/**
 * The route tree utilized by the `RouterProvider` to establish the locations of routes inside the
 * React app.
 * @type {Router}
 */
const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/loadouts',
                element: <RecentLoadouts />
            }
        ]
    }
]);

/**
 * The React App component. Effectively an abstraction layer that sits hierarchically between the
 * Redux Store Provider and the `Layout` component.
 * @returns {ReactElement.RouterProvider}
 */
const App = () => <RouterProvider router={router} />;
export default App;
