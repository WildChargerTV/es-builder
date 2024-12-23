// * frontend/src/components/Navigation/Navigation.jsx

// Node Module Imports
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Local Module Imports
import ProfileButton from './ProfileButton';
import './Navigation.css';

/**
 * Renders the website's navbar. The navbar is sticky-positioned at a high Z-Index, ensuring it is
 * always visible regardless of any other elements on the page.
 * @component Navigation
 * @requires {@linkcode ProfileButton}
 * @param {{ isLoaded: boolean; }} isLoaded Flag from `App.jsx` determining if the React app is currently loaded.
 * @returns {ReactElement}
 */
export default function Navigation({ isLoaded }) {
    // React Hooks
    const sessionUser = useSelector((state) => state.session.user);

    /** If the site is loaded, return the content of the navbar. */
    return isLoaded && (<header id='site-nav'>
        {/* Site Logo */}
        <div id='site-nav-logo'>
            <NavLink to='/'><img 
                src='https://upload.wikimedia.org/wikipedia/fr/2/2b/Everspace_Logo.png' 
                alt='ES1 logo' 
            /></NavLink>
            <NavLink to='/'>Builder</NavLink>
        </div>

        {/* Nav Links & Profile Button */}
        <div id='site-nav-links'>
            {sessionUser && <NavLink to='/loadouts/new'>Create</NavLink>}
            <NavLink to='/loadouts'>Recent</NavLink>
            <NavLink to='/loadouts/random'>Random</NavLink>
            <ProfileButton sessionUser={sessionUser} />
        </div>
    </header>);
}