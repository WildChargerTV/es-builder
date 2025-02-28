// * frontend/src/components/Navigation/ProfileButton.jsx

// Node Module Imports
import { useEffect, useState, useRef } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
// Local Module Imports
import LoginModal from '../Modals/LoginModal';
import OpenModal from '../../../utils/OpenModal';
import useWindowSize from '../../../hooks/useWindowSize';
import { logout } from '../../../store/session';

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
    const btnRef = useRef();
    const menuRef = useRef();
    const windowSize = useWindowSize();
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
        if(btnRef.current && menuRef.current) {
            setDropdownLeft(
                btnRef.current.getBoundingClientRect().width -
                menuRef.current.getBoundingClientRect().width
            );
        }
    }, [sessionUser, windowSize, showDropdown]);

    /** Close the dropdown menu whenever the user navigates to a new page. */
    useEffect(() => setShowDropdown(false), [location]);

    /** 
     * Return the appropriate profile button functionality based on the current session user state.
     * - Logged-out users are prompted with a login button. 
     * - Logged-in users are shown a button with their username as the button text. Clicking the
     *   button reveals a dropdown menu allowing access to their personal profile page and a
     *   logout button.
     */
    return (<div id='site-nav-profile-btn' ref={btnRef}>
        {sessionUser
        ? (<>
            {/* User Dropdown Button */}
            <button onClick={toggleDropdown}>
                {sessionUser.username}
                {showDropdown ? <FaAngleUp />:<FaAngleDown />}
            </button>
            {showDropdown && <div id='site-nav-rel-container'>
                <div id='site-nav-profile-dropdown' ref={menuRef} style={{ left: dropdownLeft }}>
                    <NavLink to='/profile'>Profile</NavLink>
                    <NavLink id='site-nav-btn-logout' to='/' onClick={userLogout}>Logout</NavLink>
                </div>
            </div>}
        </>)
        : (<>
            {/* Login Button */}
            <OpenModal
                elementText='Login'
                modalComponent={<LoginModal />}
            />
        </>)}
    </div>);
}
