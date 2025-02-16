import useWindowSize from '../../hooks/useWindowSize';
import './MobileNotice.css';

export default function MobileNotice() {
    const [screenX] = useWindowSize();
    return (<main id='site-mobile-notice'>
        
        <div id='site-mobile-notice-content'>
            <h1>Hello, pilot!</h1>
            <p>
                Thank you for your interest in the EVERSPACE™ Builder beta. Unfortunately, the site
                does not yet support &quot;mobile&quot; viewport resolutions. Until further notice,
                your screen <i>width</i> must be at least 720 pixels.
                <br /><br />
                Right now, core features of ESBuilder are intended to reflect the UI/UX structure
                of EVERSPACE™, which has necessitated that a screen width minimum be imposed until
                an alternative can be created. This implementation is on the roadmap, and likely
                will be added as the site nears completion; until then, I encourage you to access
                ESBuilder from a device that meets the compatible minimum viewport width.
                <br /><br />
                At present, your viewport width is: {screenX}px.
                <br /><br />
                I greatly apologize for the inconvenience, and appreciate your patience as the beta
                continues! For more information about ESBuilder, please visit the site&apos;s <a href='https://github.com/WildChargerTV/es-builder' target='_blank' rel='noreferrer'>
                GitHub repository</a>. Thank you!
            </p>
        </div>
    </main>);
}