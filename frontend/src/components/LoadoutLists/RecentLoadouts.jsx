// * frontend/src/components/Loadouts/RecentLoadouts.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import LoadoutList from './LoadoutList';
import { getRecentLoadouts } from '../../store/loadout';
import './RecentLoadouts.css';

/**
 * Renders a list of the top 10 most recently created loadouts. Although it can function as a
 * standalone component, its intent is to be a route only called from `App.jsx`. **DO NOT CALL THIS
 * ANYWHERE ELSE.**
 * 
 * The page will only render the 10 most recent loadouts at the time the page is loaded. There is
 * no support for page seeking at this time. See {@linkcode LoadoutList} for more information on
 * the functionality of the loadout list.
 * @component `RecentLoadouts`
 * @requires {@linkcode LoadoutList} {@linkcode getRecentLoadouts}
 * @returns {ReactElement}
 */
export default function RecentLoadouts() {
    // React Hooks
    const dispatch = useDispatch();
    const { recentLoadouts } = useSelector((state) => state.loadout);
    // Local State Values
    const [isLoaded, setIsLoaded] = useState(false);

    /* Get recent loadouts from the backend. */
    useEffect(() => { dispatch(getRecentLoadouts()); }, [dispatch]);

    /* Allow the page to render if a list has been returned to the state. */
    useEffect(() => {
        setIsLoaded(recentLoadouts?.list && typeof recentLoadouts.list === 'object');
    }, [isLoaded, recentLoadouts]);

    /* Return the Recent Loadouts page. */
    return isLoaded && (<main id='site-recent-loadouts-container'>
        <div id='site-recent-loadouts'>
            <h1>Recent Loadouts</h1>
            {recentLoadouts.list.length === 0
            ? <h3>
                No Recent Loadouts Found.<br />
                This is a bug! If this doesn&apos;t disappear shortly, please create an issue on 
                GitHub. Thank you!
            </h3>
            : <LoadoutList idName='recent-loadouts-list' listArr={recentLoadouts.list} />}
        </div>
    </main>);
}
