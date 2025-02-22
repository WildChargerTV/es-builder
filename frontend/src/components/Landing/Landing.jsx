// * frontend/src/components/Landing/Landing.jsx

// Node Module Imports
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
// Local Module Imports
import SignUpModal from './Modals/SignUpModal';
import OpenModal from '../../utils/OpenModal';
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
        {/* Page Title (Hidden) - for search engines */}
        <h1 style={{ display: 'none' }}>
            ESBuilder: Build & Share EVERSPACE™ Loadouts
        </h1>

        {/* Background Image Overlay */}
        <div id='site-landing-bg' />

        {/* Main Content Box */ }
        <div id='site-landing-content'>
            {/* Page Title */}
            <h2>Shoot. Loot. Share.</h2>

            {/* Site Information */}
            <p>
                ESBuilder is a new way to store, share, &amp; immortalize your most memorable 
                EVERSPACE™ moments. Got an enhanced Scatter Gun 2880 with awesome stats? Want to 
                help a new pilot survive Cluster 34 with ease? Or would you like to better 
                visualize your own perfect build? Our online loadout builder&apos;s got you 
                covered. Sign up and create one today!
            </p>

            {/* Sign Up Button */}
            <OpenModal
                elementText={<>Sign Up <span className='site-text-icon'><PiMouseLeftClickFill /></span></>}
                modalComponent={<SignUpModal />}
            />

            {/* Message for Testers */}
            <h3>Important Information for All Testers:</h3>
            <p>
                Thank you for giving ESBuilder a try! This web application is currently 
                in <span className='yellow'>early beta</span>. This means that the core mechanics are
                in place, but are rather unpolished (for example, ship & equipment stats are
                currently static values). Your patience is appreciated as development continues!
                <br /><br />
                If you&apos;ve arrived here from the invite sent to the ROCKFISH Games Discord, 
                feel free to send a ping with any problems you may encounter that do not appear on
                the <Link to='https://github.com/WildChargerTV/es-builder/issues/1'>known issues 
                list</Link>. All other testers can report issues using the GitHub link at the right 
                side of the page footer. Thank you!
            </p>
        </div>
    </main>);
}
