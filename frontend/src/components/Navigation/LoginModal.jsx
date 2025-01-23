// * frontend/src/components/Navigation/LoginModal.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
// Local Module Imports
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';

/**
 * Modal component to display a user login form. Closes itself once the login succeeds.
 * @component LoginModal
 * @require {@linkcode useModal}
 * @require {@linkcode sessionActions.login}
 * @returns {ReactElement} The content of the Modal.
 */
export default function LoginModal() {
    // React Hooks
    const dispatch = useDispatch();
    // Local State Values
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [demoLoginWarning, setDemoLoginWarning] = useState(false);
    // Context Hooks
    const { closeModal } = useModal();

    /** 
     * Manual flag to allow demo logins on the site. 
     * ! This is only intended for use where needed, and should not be enabled by default.
     */
    const showDemoLogin = false;

    /** Perform a demo login, but only after showing a warning. */
    const demoLogin = (event) => {
        // Prevent a redirect/refresh.
        event.preventDefault();
        // Clear the Errors object.
        setErrors({});

        // If the warning has not been displayed yet, display it, and do not dispatch the login.
        if(!demoLoginWarning) {
            setErrors({ message: <>
                <span className='red'>WARNING:</span> The Demo Log In is 
                a <span className='yellow'>temporary</span> functionality meant for very specific
                purposes. Most of the time, it will not be enabled, and you will need to sign in
                with your own credentials. 
                <br /><br />
                You&apos;ll log in as Maurice, and have as much access to ESBuilder as any other
                user account; however, loadouts you create as Maurice may be modified or deleted 
                by anyone else that utilizes this demo login.
                <br /><br />
                If you understand these risks and want to proceed with the demo login, please click
                the Demo button again.
            </> });
            return setDemoLoginWarning(true);
        } 
        // If the warning has been displayed, allow the demo login to proceed and close the Modal.
        else {
            setDemoLoginWarning(false);
            return dispatch(sessionActions.login({ 
                credential: 'Maurice', 
                password: 'I|5F6!T7Ad' 
            })).then(async (res) => res.ok && closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if(data?.errors) 
                    setErrors(data.errors);
            });
        }
    };
    
    /** Attempt to dispatch the login attempt, and close the Modal if no errors were found. */
    const onSubmit = (event) => {
        // Prevent a redirect/refresh.
        event.preventDefault();
        // Clear the Errors object.
        setErrors({});

        // Attempt to log in. If errors exist, they will be caught before the Modal is closed.
        return dispatch(sessionActions.login({ credential, password }))
            .then(async (res) => res.ok && closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if(data?.errors) 
                    setErrors(data.errors);
            });
    };

    /** 
     * Determine whether or not to disable the submission button. Checks include:
     * 1: Both fields must be populated.
     * 2: The Username must be at least 4 characters long.
     * 3: The Password must be at least 6 characters long.
    */
    useEffect(() => setDisabled(
        credential?.length < 4 || 
        password?.length < 6
    ), [credential, password]);

    // Return the Modal content.
    return (<>
        {/* Modal Title */}
        <h2 className='modal-title'>Log In</h2>

        {/* Login Form */}
        <form className='modal-form' onSubmit={onSubmit}>
            {/* Error Handling */}
            {errors.credential && <p className='modal-form__error'>{errors.credential}</p>}
            {errors.password && <p className='modal-form__error'>{errors.password}</p>}
            {errors.message && <p className='modal-form__error'>{errors.message}</p>}

            {/* Username/Email Single-Line Text Input */}
            <input 
                type='text' 
                placeholder='Username or Email' 
                value={credential} 
                onChange={(e) => setCredential(e.target.value)} 
                required 
            />

            {/* Password Single-Line Text Input */}
            <input 
                type='password' 
                placeholder='Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />

            <div className='modal-controls'>

                {/* Submit Button - disabled unless requirements (described above) are met */}
                <button type='submit' disabled={disabled}>
                    Log In <span className='site-text-icon'><PiMouseLeftClickFill /></span>
                </button>
                {/* Demo Login Button - only visible if manual flag is set */}
                {showDemoLogin && <button onClick={demoLogin}>
                    Demo <span className='site-text-icon'><PiMouseLeftClickFill /></span>
                </button>}
            </div>
            
        </form>
    </>);
}