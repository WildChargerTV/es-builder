// * frontend/src/components/Navigation/Navigation.jsx

// Node Module Imports
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Local Module Imports
import ProfileButton from './ProfileButton';
import './Navigation.css';

/**
 * Renders the website's navbar. The navbar is sticky-positioned at a high Z-Index, ensuring it is
 * always visible reg
 *
 * @param {{ isLoaded: boolean; }} param0
 * @param {boolean} param0.isLoaded
 * @returns {ReactElement}
 */
export default function Navigation({ isLoaded }) {
    // React Hooks
    const sessionUser = useSelector((state) => state.session.user);

    return isLoaded && (<header id='site-nav'>
        {/* Site Logo */}
        <div id='site-nav-logo'>
            <NavLink to='/'><img 
                src='https://upload.wikimedia.org/wikipedia/fr/2/2b/Everspace_Logo.png' 
                alt='ES1 logo' 
            /></NavLink>
            <NavLink to='/'>Builder</NavLink>
        </div>
        <div id='site-nav-links'>
            <NavLink to='/loadouts'>Recent</NavLink>
            <NavLink to='/loadouts/random'>Random</NavLink>
            <ProfileButton sessionUser={sessionUser} />
        </div>
    </header>);
}