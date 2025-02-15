// * frontend/src/components/Footer/Footer.jsx

// Node Module Imports
import { AiFillGithub, AiFillLinkedin, AiFillYoutube, AiOutlineTwitch, AiOutlineX } from 'react-icons/ai';
import { DiFirefox, DiJavascript1, DiPostgresql, DiReact } from 'react-icons/di';
import { FaAws } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Local Module Imports
import './Footer.css';

/**
 * Renders the website footer, primarily responsible for displaying credits & legal info.
 * @component Footer
 * @param {{ isLoaded: boolean; }} isLoaded Flag from `App.jsx` determining if the React app is currently loaded.
 * @returns {ReactElement}
 */
export default function Footer({ isLoaded }) {
    /** If the site is loaded, return the footer content. */
    return isLoaded && (<footer id='site-footer'>
        {/* Credits: Rockfish Games */}
        <div id='site-footer-rockfish'>
            <p>EVERSPACE™ is brought to you by</p>
            <Link to='https://classic.everspace-game.com/'>
                <img
                    src='https://indiearenabooth.de/assets/media/rockfish-logo-rgb-weiss-1-300dpi.png'
                    alt='rockfish logo'
                />
            </Link>
            <p>© 2017-2025 ROCKFISH Games GmbH. All rights reserved.</p> 
        </div>

        {/* Credits: Site Technology */}
        <div id='site-footer-tech'>
            <p>
                The loadout builder, and the website by extension, has been built to be compatible 
                with the widescreen (16:9) aspect ratio, tested at the minimum resolution of HD 
                720p, up to the maximum resolution of 2K 1440p. Any screen resolutions above or 
                below this are not guaranteed to display properly.
            </p>
            <p>
                <span className='site-footer__text-icon'>
                    <DiReact /><DiJavascript1 />
                </span> Powered by ReactJS
            </p>
            <p>
                <span className='site-footer__text-icon'>
                    <DiPostgresql />
                </span> Database built on PostgreSQL
            </p>
            <p>
                <span className='site-footer__text-icon'>
                    <FaAws />
                </span> Asset Delivery served via Amazon Web Services
            </p>
            <p>
                <span className='site-footer__text-icon'>
                    <DiFirefox />
                </span> Tested on Mozilla Firefox
            </p>
        </div>

        {/* Credits: Me. & Background Images. */}
        <div id='site-footer-wctv'>
            <p>ESBuilder created by WildCharger</p>
            <div id='site-footer-socials'>
                <Link to='https://github.com/WildChargerTV/aa-capstone-es-builder'>
                    <AiFillGithub />
                </Link>
                <Link to='https://www.linkedin.com/in/ethan-guan-ba453a2a0/'>
                    <AiFillLinkedin />
                </Link>
                <Link to='https://x.com/wildchargergame'>
                    <AiOutlineX />
                </Link>
                <Link to='https://www.youtube.com/@WildCharger'>
                    <AiFillYoutube />
                </Link>
                <Link to='https://twitch.tv/wildchargertv'>
                    <AiOutlineTwitch />
                </Link>
            </div>
            <p>
                Special thanks to <Link to='https://steamcommunity.com/id/ITS_YFP'>ITS_YFP </Link>
                for the background image used in the Recent Loadouts page.
            </p>
        </div>
    </footer>);
}
