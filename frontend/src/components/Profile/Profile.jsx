// * frontend/src/components/Profile/Profile.jsx

// Node Module Imports
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Local Module Imports
import './Profile.css';

/**
 * Component to display a user's profile. If this page is accessed by a logged-out user, redirect
 * to the landing page.
 * @component UserProfile
 * @returns {ReactElement}
 */
export default function UserProfile() {
    // React Hooks
    const sessionUser = useSelector((state) => state.session.user);

    /** If there is no session user, redirect to the landing page. */
    if(!sessionUser) return <Navigate to='/' />

    /** Return the profile page content. */
    return (<main id='site-profile'>
        <h1>User Profile for {sessionUser.username}</h1>
    </main>);
}