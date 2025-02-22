// * frontend/src/components/Loadouts/UserLoadouts.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// Local Module Imports
import LoadoutList from './LoadoutList';
import { getUserLoadouts } from '../../store/loadout';
import { updateActiveUser } from '../../store/user';
import './UserLoadouts.css';

/**
 * Renders a list of all loadouts created by the specified user. Although it can function as a
 * standalone component, its intent is to be a route only called from `App.jsx`. **DO NOT CALL THIS
 * ANYWHERE ELSE.**
 * 
 * This component will render all loadouts created by the specified user at the time the page is
 * loaded. Page seeking will be implemented at a later time. See {@linkcode LoadoutList} for more
 * information on the functionality of the loadout list.
 * @component `UserLoadouts`
 * @requires {@linkcode LoadoutList} {@linkcode getUserLoadouts} {@linkcode updateActiveUser} 
 * @returns {ReactElement}
 */
export default function UserLoadouts() {
    // React Hooks
    const dispatch = useDispatch();
    const params = useParams();
    const { userLoadouts } = useSelector((state) => state.loadout);
    const sessionUser = useSelector((state) => state.session.user);
    const { activeUser } = useSelector((state) => state.user);
    // Local State Values
    const [isLoaded, setIsLoaded] = useState(false);

    /* Get user loadouts from the backend, and set the active user in the Redux state. */
    useEffect(() => { 
        dispatch(getUserLoadouts(params.userId)); 
        dispatch(updateActiveUser(params.userId));
    }, [dispatch, params]);

    /* Allow the page to render if the active user & loadout list have loaded to the Redux state. */
    useEffect(() => {
        setIsLoaded(activeUser?.id == params.userId && userLoadouts?.list);
    }, [activeUser, params, userLoadouts]);

    /* Return the User Loadouts page. */
    return isLoaded && (<main id='site-user-loadouts-container'>
        <div id='site-user-loadouts'>
            <h1>{activeUser.username}&apos;s Loadouts</h1>
            {userLoadouts.list.length === 0
            ? <h3>
                No Loadouts Found. 
                {sessionUser && <Link to='/loadouts/new'> Click Here To Create One!</Link>}
            </h3>
            : <LoadoutList idName='user-loadouts-list' listArr={userLoadouts.list} />}
        </div>
    </main>);
}