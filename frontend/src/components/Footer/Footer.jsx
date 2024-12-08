// * frontend/src/components/Footer/Footer.jsx

// Node Module Imports
import { AiFillGithub, AiFillLinkedin, AiFillYoutube, AiOutlineX } from "react-icons/ai";
import { DiFirefox, DiJavascript1, DiPostgresql, DiReact } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import { Link } from 'react-router-dom';
// Local Module Imports
import './Footer.css';

/**
 * Renders the website footer, primarily responsible for displaying credits & legal info.
 * @param {{ isLoaded: boolean; }} isLoaded Flag from `App.jsx` determining if the React app is currently loaded.
 * @returns {ReactElement}
 */
export default function Footer({ isLoaded }) {
    return isLoaded && (<footer id='site-footer'>
        {/* Credits: Rockfish Games */}
        <div id='site-footer-rockfish'>
            <p>EVERSPACE™ is brought to you by</p>
            <Link to='https://classic.everspace-game.com/'><img
                src='https://classic.everspace-game.com/wp-content/uploads/2015/07/Rockfish_logo_RGB_weiss_1_300dpi.png'
                alt='rockfish logo'
            /></Link>
            <p>© 2017-2024 ROCKFISH Games GmbH. All rights reserved.</p> 
        </div>

        {/* Credits: Site Technology */}
        <div id='site-footer-tech'>
            <p>
                Layout builder may not display properly on standard aspect ratios<br />
                or lower screen resolutions. HD 720p and above is recommended.
            </p>
            <p><span className='site-footer__text-icon'><DiReact /><DiJavascript1 /> </span> Powered by ReactJS</p>
            <p><span className='site-footer__text-icon'><DiPostgresql /> </span> Database built on PostgreSQL</p>
            <p><span className='site-footer__text-icon'><FaAws /> </span> Asset Delivery served via Amazon Web Services</p>
            <p><span className='site-footer__text-icon'><DiFirefox /> </span> Tested on Mozilla Firefox</p>
        </div>

        {/* Credits: Me. */}
        <div id='site-footer-wctv'>
            <p>ESBuilder created by WildCharger</p>
            <p id='site-footer-socials'>
                <Link to='https://github.com/WildChargerTV/aa-capstone-es-builder'><AiFillGithub /> </Link>
                <Link to='https://www.linkedin.com/in/ethan-guan-ba453a2a0/'><AiFillLinkedin /> </Link>
                <Link to='https://x.com/wildchargergame'><AiOutlineX /> </Link>
                <Link to='https://www.youtube.com/@WildCharger'><AiFillYoutube /> </Link>
            </p>
        </div>
    </footer>);
}
