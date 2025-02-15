// * frontend/src/components/LoadoutBuilder/LoadoutBuilder.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
// Local Module Imports
import BuilderTabs from './BuilderTabs';
import ShipsTab from './ShipsTab';
import EnhancementsTab from './EnhancementsTab';
import EquipmentTab from './EquipmentTab';
import BuilderControls from './BuilderControls';
import * as builderActions from '../../store/builder';
import { getLoadout } from '../../store/loadout';
import './LoadoutBuilder.css';
import './Modals/Modals.css';

/** 
 * Array of valid modes to provide to the Loadout Builder.
 * @type {['create', 'view', 'edit']}
 */
const VALID_BUILDER_MODES = ['create', 'view', 'edit'];

/**
 * The primary component that renders the entire Loadout Builder. Although it can function as a
 * standalone component, its intent is to be a route only called from `App.jsx`. **DO NOT CALL THIS
 * ANYWHERE ELSE.**
 * 
 * The Loadout Builder allows logged-in users to create, view, and edit loadouts. All loadout data
 * shown onscreen is pulled from a _local Redux state_ - meaning that none of the data is stored
 * automatically when the user leaves the page, and due to the way the Loadout Builder works when
 * re-rendering, any data not saved when the user leaves the page **WILL BE WIPED** on the next 
 * visit. 
 * 
 * Presently, the Loadout Builder has three sections: Ships, Enhancements, and Equipment. The
 * active section is managed in the {@linkcode BuilderTabMenu} component. Future sections may be
 * added in the future if ESBuilder ever gains the functionality to track player progression; but
 * for now, features such as Perks are not present, and the Loadout Builder will assume that the
 * user has unlocked all possible ships, weapons, enhancements, and perks. **Please see the docs 
 * of each tab's parent component for more information on the functionalities they fulfill.**
 * 
 * This component is primarily responsible for preparing the Loadout Builder to be rendered.
 * Primarily, it will not allow for rendering until the Redux state - which is required in order
 * for all of the other components to work - has been fully prepared. The specific values assumed
 * by the Redux state are dependent on its singular `mode` prop, which is always passed into the
 * component from App.jsx. _The mode will also determine the title of the page._
 * - If the `mode` is `'create'`, the store is returned to its initial state, which is full of
 * either default or null values.
 * - If the `mode` is `'view'` or `'edit'`, the store is first reset, and then receives the bulk
 * data of a specific loadout to recreate.
 * @component `LoadoutBuilderMain`
 * @requires {@linkcode BuilderTabMenu}
 * @requires {@linkcode ShipsTab}, {@linkcode EnhancementsTab}, {@linkcode EquipmentTab}
 * @requires {@linkcode BuilderControls}
 * @requires {@linkcode builderActions}, {@linkcode getLoadout}
 * @param {{ mode: 'create' | 'view' | 'edit' }} 
 * @returns {null | ReactElement}
 */
export default function LoadoutBuilderMain({ mode }) {
    // React Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { tabId, User } = useSelector((state) => state.builder); 
    const sessionUser = useSelector((state) => state.session.user);   
    // Local State Values
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageTitle, setPageTitle] = useState('');

    /** Prepare the Redux state for rendering. */
    useEffect(() => {
        // Unrender the page in order to prevent any potential tampering on re-visits.
        setIsLoaded(false);

        // Throw an error if no mode was provided. This is a safeguard & should never happen.
        if(!(VALID_BUILDER_MODES.includes(mode)))
            throw new Error(
                `Cannot initialize the Loadout Builder with invalid mode: ${mode}. Make sure that
                this component was not called outside of App.jsx.`
            );
        
        // Reset the state to its initial values, and load the current builder mode back in.
        dispatch(builderActions.clearState(mode));

        // If in create mode, set the page title appropriately, then allow the page to render.
        // ? Because the other two modes require pseudo-asynchronous dispatch calls, it's easier to 
        // ? return early here if in create mode.
        if(mode === 'create') {
            if(!sessionUser) {
                alert(`Must be logged in to create a Loadout. If you are logged in and see this message, please submit a bug report via GitHub.`);
                return navigate('/');
            }
            setPageTitle('Create Loadout');
            setIsLoaded(true); 
            return; 
        }

        // Set the page title depending on whether the Loadout Builder is in view or edit mode.
        setPageTitle(mode === 'view' ? 'View Loadout': 'Modify Loadout');

        // Fetch the loadoutId specified in the URL parameters & load it into Redux, then allow the
        // page to render.
        dispatch(getLoadout(params.loadoutId))
        .then((loadoutData) => {
            if(mode === 'edit' && (!sessionUser || loadoutData.userId !== sessionUser.id)) {
                alert(`Unauthorized to edit this Loadout. Please log in as the Loadout's owner, or submit a bug report via GitHub.`);
                return navigate('/');
            }
            delete loadoutData.userId;
            delete loadoutData.createdAt;
            delete loadoutData.updatedAt;
            dispatch(builderActions.bulkUpdateState(loadoutData));
            setIsLoaded(true);
        });
    }, [dispatch, navigate, mode, params.loadoutId, sessionUser]);

    /** Return the Loadout Builder. */
    return isLoaded && (<main id='site-loadout-builder'>
        {/* Header: Page Title, Loadout Name, Link to Creator's Profile */}
        <div id='loadout-builder-head'>
            <h1 id='builder-page-title'>{pageTitle}</h1>
            <LoadoutName contentEditable={mode !== 'view'} />
            {User?.username && <h3 id='builder-owner-name'>
                <Link to={`/users/${User.id}/loadouts`}>{User.username}</Link>
            </h3>}
        </div>
        
        {/* Body: Tab Menu, Content Box, Control Buttons */}
        <div id='loadout-builder-body'>
            <BuilderTabs isLoaded={isLoaded} />
            <div id='builder-content'>
                {tabId == 0 && <ShipsTab isLoaded={isLoaded} />}
                {tabId == 1 && <EnhancementsTab isLoaded={isLoaded} />}
                {tabId == 2 && <EquipmentTab isLoaded={isLoaded} />}
            </div>
            {['create', 'edit'].includes(mode) && <BuilderControls isLoaded={isLoaded} />}
        </div>
    </main>);
}

/**
 * Renders an editable `<h2>` that sets the loadout's name in the Loadout Builder.
 * @component `LoadoutName`
 * @requires {@linkcode builderActions}
 * @param {{contentEditable: boolean}} 
 * @returns {ReactElement}
 */
function LoadoutName({ contentEditable }) {
    // React Hooks
    const dispatch = useDispatch();
    const { name } = useSelector((state) => state.builder);
    // Local State Values
    const [localName, setLocalName] = useState('');

    /** On focus loss, apply the new name to the Redux store, if eligible. Otherwise, revert. */
    const onBlur = (event) => {
        // Get the current name & its length.
        const [currName, length] = [event.target.innerText, event.target.innerText.length];

        // If the current name is different and is within the length limits, dispatch to Redux.
        if(name !== currName && (length > 3 && length < 31))
            dispatch(builderActions.updateName(currName));
    }

    /** Implement maximum length restriction & color indication onto the h2 field. */
    const onInput = (event) => {
        // Get the current name & its length.
        const [currName, length] = [event.target.innerText, event.target.innerText.length];

        // Update the local state value if the length is below the maximum.
        length < 31 && setLocalName(currName);

        // Make the text red if it is too short.
        event.target.style.color = length < 4 ? '#ff5d51' : '#acdbf9';

        // If the text has become too long, snap it back down.
        length > 30 && (event.target.innerText = localName);
    }

    /** Return the input field. */
    return <h2
        id='builder-loadout-name'
        contentEditable={contentEditable} 
        suppressContentEditableWarning
        onBlur={onBlur}
        onInput={onInput}
        aria-hidden
    >{name}</h2>;
}