// * frontend/src/components/Profile/Profile.jsx

// Node Module Imports
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Local Module Imports
import './Profile.css';

/**
 * Component to display a user's profile.
 * 
 * This component is currently empty and just redirects to `/users/:userId/loadouts` for logged-in
 * users, and the homepage for logged-out users. A more comprehensive profile system will be 
 * implemented at a later time.
 * @component `UserProfile`
 * @returns {ReactElement}
 */
export default function UserProfile() {
    // React Hooks
    const sessionUser = useSelector((state) => state.session.user);

    /** Determine where to redirect the user. */
    const redirectTarget = sessionUser
    ? `/users/${sessionUser.id}/loadouts`
    : '/';

    /** Return the redirection element. */
    return <Navigate to={redirectTarget} />
}