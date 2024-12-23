// * frontend/src/components/Landing/Landing.jsx

// Node Module Imports
import { PiMouseLeftClickFill } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
// Local Module Imports
import './Landing.css';

/**
 * Component to display a site landing page to all logged-out users. Logged-in users are redirected
 * to `/loadouts`.
 * @component LandingPage
 * @returns {ReactElement}
 */
export default function LandingPage() {
    // React Hooks
    const sessionUser = useSelector((state) => state.session.user);

    // If a user is currently logged in, redirect to `/loadouts`.
    if(sessionUser) return <Navigate to='/loadouts' />;

    // Return the page content.
    return (<main id='site-landing'>
        {/* This is a transparent black overlay rendered over the background image. */}
        <div id='site-landing-bg' />

        {/* Main Content Box */ }
        <div id='site-landing-content'>
            {/* Page Title */}
            <h1>Shoot. Loot. Share.</h1>
            {/* Site Information */}
            <p>
                ESBuilder is a new way to store, share, &amp; immortalize your most memorable EVERSPACE™<br />
                moments. Got an enhanced Scatter Gun 2880 with awesome stats? Want to help a new pilot<br />
                survive Cluster 34 with ease? Or would you like to better visualize your own perfect build?<br />
                Our online layout builder&apos;s got you covered. Sign up and create one today!
            </p>
            {/* Sign Up Button */}
            <button>Sign Up<span className='site-text-icon'><PiMouseLeftClickFill /></span></button>
            {/* Message for Testers */}
            <h2>Important Information for All Testers:</h2>
            <p>
                Thank you for giving ESBuilder a try! This web application has been built to be my capstone (final)<br />
                project for App Academy. Accounts work on the honor system; <span>please do not use your real names,<br />
                emails, or passwords,</span> and assume that any information you provide may be deleted at any time.<br />
                This site has no trackers, I promise.
            </p>
            <p>
                If you&apos;ve arrived here from the invite I sent to the ROCKFISH Games Discord, feel free to DM me<br /> 
                with any problems you may encounter. All other testers can report issues using the GitHub link at the<br />
                right side of the page footer. Enjoy!
            </p>
            {/* Link to Background Image Source */}
            <h5><Link to='https://wall.alphacoders.com/big.php?i=912237'>Background Image Source</Link></h5>
        </div>
    </main>);
}
