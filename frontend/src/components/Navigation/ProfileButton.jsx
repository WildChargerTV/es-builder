// * frontend/src/components/Navigation/ProfileButton.jsx

// Node Module Imports
import { useEffect, useState, useRef } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
// Local Module Imports
import LoginModal from './LoginModal';
import OpenModal from '../Modal/OpenModal';
import { logout } from '../../store/session';

/**
 * Renders the "profile button", which is an interactive element that acts as the primary access
 * point to user logins/logouts and profile actions.
 * @component ProfileButton
 * @requires {@linkcode LoginModal}
 * @requires {@linkcode OpenModal}
 * @requires {@linkcode logout}
 * @param {{ sessionUser: object; }} sessionUser The session user provided in the Redux state.
 * @returns {ReactElement}
 */
export default function ProfileButton({ sessionUser }) {
    // React Hooks
    const dispatch = useDispatch();
    const location = useLocation();
    const btnWidthRef = useRef();
    const menuWidthRef = useRef();
    // Local State Values
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownLeft, setDropdownLeft] = useState(0);

    /** Toggle the visibility of the profile dropdown. */
    const toggleDropdown = (event) => {
        event.stopPropagation();
        setShowDropdown(!showDropdown);
    }

    /** Log out the current user. */
    const userLogout = (event) => {
        event.preventDefault();
        dispatch(logout())
            .then(() => setShowDropdown(!showDropdown));
    }

    /** Set the absolute position of the dropdown menu based on the width of the profile button. */
    useEffect(() => {
        if(btnWidthRef.current && menuWidthRef.current)
            setDropdownLeft(
                btnWidthRef.current.getBoundingClientRect().width -
                menuWidthRef.current.getBoundingClientRect().width
            );
    }, [sessionUser]);

    /** Close the dropdown menu whenever the user navigates to a new page. */
    useEffect(() => setShowDropdown(false), [location]);

    /** 
     * Return the appropriate profile button functionality based on the current session user state.
     * - Logged-out users are prompted with a login button. 
     * - Logged-in users are shown a button with their username as the button text. Clicking the
     *   button reveals a dropdown menu allowing access to their personal profile page and a
     *   logout button.
     */
    return sessionUser
    ? (<div id='site-nav-profile-btn' ref={btnWidthRef}>
        <button onClick={toggleDropdown}>
            {`${sessionUser.username}`} 
            <span>{showDropdown ? <FaAngleUp /> : <FaAngleDown />}</span>
        </button>
        <div id='site-nav-rel-container'>
            {showDropdown && <div id='site-nav-profile-dropdown' ref={menuWidthRef} style={{'left': dropdownLeft}}>
                {/* TODO <NavLink to='/profile'>Profile</NavLink><br /> */}
                <NavLink id='site-nav-btn-logout' onClick={userLogout}>Logout</NavLink>
            </div>}
        </div>
    </div>)
    : (<div id='site-nav-profile-btn'>
        <OpenModal 
            element='button'
            elementText='Login'
            modalComponent={<LoginModal />}
        />
    </div>);
}
