// * frontend/src/components/MobileNotice/MobileNotice.jsx
// ? This component is only visible on mobile.

// Local Module Imports
import useWindowSize from '../../hooks/useWindowSize';
import './MobileNotice.css';

/**
 * Renders a static notice informing the user that ESBuilder does not support their current screen
 * or viewport width. {@linkcode useWindowSize} is utilized to let the user know what their current
 * viewport width is in real time.
 * 
 * This component links directly to the `Layout` component in `App.jsx`, and is not tied to a
 * specific route.
 * @component `MobileNotice`
 * @requires {@linkcode useWindowSize}
 * @returns {ReactElement}
 */
export default function MobileNotice() {
    // React Hooks
    const [screenX] = useWindowSize();

    /* Return the page content. */
    return (<main id='site-mobile-notice'>
        {/* Content Container Element */}
        <div id='site-mobile-notice-content'>
            {/* Page Title */}
            <h1>Hello, pilot!</h1>

            {/* Page Content */}
            <p>
                Thank you for your interest in the EVERSPACE™ Builder beta. Unfortunately, the site
                does not yet support &quot;mobile&quot; viewport resolutions. Until further notice,
                your screen <i>width</i> must be at least 720 pixels.
                <br /><br />
                Your current viewport width is: {screenX}px.
                <br /><br />
                Right now, core features of ESBuilder are intended to reflect the UI/UX structure
                of EVERSPACE™, which has necessitated that a screen width minimum be imposed until
                an alternative can be created. This implementation is on the roadmap, and likely
                will be added as the site nears completion; until then, I encourage you to access
                ESBuilder from a device that meets the compatible minimum viewport width.
                <br /><br />
                I greatly apologize for the inconvenience, and appreciate your patience as the beta
                continues! For more information about ESBuilder, please visit the site&apos;s <a href='https://github.com/WildChargerTV/es-builder' target='_blank' rel='noreferrer'>
                GitHub repository</a>. Thank you!
            </p>
        </div>
    </main>);
}
