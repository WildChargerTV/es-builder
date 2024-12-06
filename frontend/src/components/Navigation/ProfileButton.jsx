// * frontend/src/components/Navigation/ProfileButton.jsx

// Node Module Imports
import { useEffect, useState, useRef } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// Local Module Imports
import LoginModal from './LoginModal';
import OpenModal from '../Modal/OpenModal';
import { logout } from '../../store/session';

/**
 * Renders 
 *
 * @export
 * @param {{ sessionUser: object; }} param0
 * @param {object} param0.sessionUser
 * @returns {ReactElement}
 */
export default function ProfileButton({ sessionUser }) {
    // React Hooks
    const dispatch = useDispatch();
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
    const userLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    useEffect(() => {
        if(btnWidthRef.current && menuWidthRef.current)
            setDropdownLeft(
                btnWidthRef.current.getBoundingClientRect().width -
                menuWidthRef.current.getBoundingClientRect().width
            );
    }, [sessionUser]);

    return sessionUser
    ? (<div id='site-nav-profile-btn' ref={btnWidthRef}>
        <button onClick={toggleDropdown}>
            {`${sessionUser.username}`} 
            <span>{showDropdown ? <FaAngleUp /> : <FaAngleDown />}</span>
        </button>
        <div id='site-nav-rel-container'>
            {showDropdown && <div id='site-nav-profile-dropdown' ref={menuWidthRef} style={{'left': dropdownLeft}}>
                <NavLink to='/profile'>Profile</NavLink><br />
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
