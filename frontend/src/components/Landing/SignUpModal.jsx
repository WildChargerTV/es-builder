// * frontend/src/components/Landing/SignUpModal.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
// Local Module Imports
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';

/**
 * Modal component to display a user signup form. Closes itself once the signup succeeds.
 * @component SignUpModal
 * @require {@linkcode useModal}
 * @require {@linkcode sessionActions}
 * @returns {ReactElement}
 */
export default function SignUpModal() {
    // React Hooks
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // Local State Values
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    
    /** Attempt to dispatch the signup attempt, and close the Modal if no errors were found. */
    const onSubmit = (event) => {
        // Prevent a redirect/refresh.
        event.preventDefault();
        // Clear the Errors object.
        setErrors({});

        // Attempt to log in. If errors exist, they will be caught before the Modal is closed.
        return dispatch(sessionActions.signup({ username, email, password }))
            .then(async (res) => res.ok && closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if(data?.errors) setErrors(data.errors);
            });
    };

    /** 
     * Determine whether or not to disable the submission button. Checks include:
     * 1: All fields must be populated.
     * 2: The Username must be at least 4 characters long.
     * 3: The Email must be at least 5 characters long.
     * 4: The Password must be at least 8 characters long.
    */
    useEffect(() => setDisabled(
        username?.length < 4 ||
        email?.length < 5 || 
        password?.length < 8
    ), [username, email, password]);

    // Return the Modal content.
    return (<>
        {/* Modal Title */}
        <h2 className='modal-title' style={{ marginBottom: 0 }}>Sign Up</h2>

        <p className='modal-paragraph'>
            Accounts on ESBuilder are entirely on the honor system. None of this information is
            tracked or shared beyond anything explicitly to do with the site. Please do not use
            real names, emails, or passwords, as no guarantee can be made to their permanent
            security. Thank you.
        </p>

        {/* Signup Form */}
        <form className='modal-form' onSubmit={onSubmit}>
            {/* Error Handling */}
            {errors.username && <p className='modal-form__error'>{errors.username}</p>}
            {errors.email && <p className='modal-form__error'>{errors.email}</p>}
            {errors.password && <p className='modal-form__error'>{errors.password}</p>}
            {errors.message && <p className='modal-form__error'>{errors.message}</p>}

            {/* Username Single-Line Text Input */}
            <input 
                type='text' 
                placeholder='Username' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
            />

            {/* Email Single-Line Email Input */}
            <input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {/* Submit Button - disabled unless requirements (described above) are met */}
            <button type='submit' disabled={disabled}>
                Sign Up <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </button>
        </form>
    </>);
}