// * frontend/src/App.jsx
// ? React app declaration is located in `frontend/src/main.jsx`.

// Node Module Imports
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
// Local Module Imports
import Navigation from './components/Navigation/Navigation';
import MobileNotice from './components/MobileNotice/MobileNotice';
import LandingPage from './components/Landing/Landing';
import RecentLoadouts from './components/Loadouts/RecentLoadouts';
import LoadoutBuilderMain from './components/LoadoutBuilder/LoadoutBuilder';
import UserProfile from './components/Profile/Profile';
import UserLoadouts from './components/Loadouts/UserLoadouts';
import Footer from './components/Footer/Footer';
import useWindowSize from './hooks/useWindowSize';
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
 * @component Layout
 * @requires {@linkcode sessionActions.restoreUser()}
 * @returns {ReactElement}
 */
function Layout() {
    // React Hooks
    const dispatch = useDispatch();
    const [screenX] = useWindowSize();
    // Local State Values
    const [isLoaded, setIsLoaded] = useState(false);

    /** Ensure the current session user is restored before allowing the page to render/re-render. */
    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => { setIsLoaded(true) });
    }, [dispatch]);

    /** Determine whether or not the current window's width is below 720p. */
    useEffect(() => {
        if(isLoaded && screenX < 720)
            console.warn('⚠️ App Warning: Screen width is below minimum compatible standard.');
        else if(isLoaded && screenX > 2560)
            console.warn('⚠️ App Warning: Screen width is above maximum compatible standard.');
    }, [screenX, isLoaded]);

    /** Return the page content. */
    return (<>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (screenX < 720 ? <MobileNotice /> : <Outlet />)}
        <Footer isLoaded={isLoaded} />
    </>);
}

/**
 * The route tree utilized by the `RouterProvider` to establish the locations of routes inside the
 * React app.
 */
const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            /** Root - Landing Page */
            {
                path: '/',
                element: <LandingPage />
            },
            /** Loadouts - Recent Loadouts List */
            {
                path: '/loadouts',
                element: <RecentLoadouts />
            },
            /** Loadouts - Create New Loadout */
            {
                path: '/loadouts/new',
                element: <LoadoutBuilderMain mode='create' />

            },
            /** Loadouts - View Existing Loadout */
            {
                path: '/loadouts/:loadoutId',
                element: <LoadoutBuilderMain mode='view' />
            },
            /** Loadouts - Edit Existing Loadout */
            {
                path: '/loadouts/:loadoutId/edit',
                element: <LoadoutBuilderMain mode='edit' />
            },
            /** Users - User Profile (Current User & Otherwise) */
            {
                path: '/profile',
                element: <UserProfile />
            },
            /** Users - User Loadouts List */
            {
                path: '/users/:userId/loadouts',
                element: <UserLoadouts />
            }
        ]
    }
]);

/**
 * The React App component. Effectively an abstraction layer that sits hierarchically between the
 * Redux Store Provider and the `Layout` component.
 * @exports
 * @component App
 * @requires {@linkcode router}
 * @returns {ReactElement.RouterProvider}
 */
const App = () => <RouterProvider router={router} />;
export default App;
