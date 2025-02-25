// * frontend/src/components/LoadoutBuilder/BuilderControls.jsx

// Node Module Imports
import { Filter } from 'bad-words';
import { useEffect, useState } from 'react';
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// Local Module Imports
import SelectPresetModal from './Modals/SelectPresetModal';
import OpenModal from '../../utils/OpenModal';
import { allowedProfanity } from '../../data';
import * as builderActions from '../../store/builder';
import * as loadoutActions from '../../store/loadout';

/* Declare the profanity filter, and remove some common swears. */
const filter = new Filter();
filter.removeWords(...allowedProfanity);

/**
 * Renders a set of control buttons at the bottom of the Layout Builder. Access to use these
 * controls are made available if the Loadout Builder is either in `'create'` mode, or an
 * authorized user has accessed the loadout in `'edit'` mode.
 * 
 * Each button that makes up this component has its own functionality, and this component functions
 * as an abstraction layer & container element. See each button's documentaton for more information
 * on their functionalities.
 * @component `BuilderControls`
 * @requires {@linkcode StartBlankButton} {@linkcode PresetLoadoutButton}
 * @requires {@linkcode ClearEnhancementsButton}
 * @requires {@linkcode SubmitLoadoutButton}
 * @param {{ isLoaded: boolean }} props
 */
export default function BuilderControls({ isLoaded }) {
    return isLoaded && (<div id='builder-controls'>
        <StartBlankButton />
        <SelectPresetButton />
        <ClearEnhancementsButton />
        <SubmitLoadoutButton />
    </div>);
}

/**
 * Sub-component of {@linkcode BuilderControls} that renders the button responsible for submitting
 * the loadout. On submission, this component will properly organize the loadout data before
 * sending it to the backend.
 * 
 * TODO The button should display a modal listing criteria not yet met, rather than be disabled
 * @component `SubmitLoadoutButton` 
 * @requires {@linkcode loadoutActions}
 */
function SubmitLoadoutButton() {
    // React Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { mode, flags, name, shipId, shipPreset, enhancements, primaryWeapons, secondaryWeapons,
            devices, consumables } = useSelector((state) => state.builder);
    const { sessionUser } = useSelector((state) => state.session);
    // Local State Values
    const [disabled, setDisabled] = useState(true);
    
    /** 
     * Determine whether or not the submission button should be enabled, based on the following
     * criteria:
     * 1. There must be an active session user.
     * 2. The loadout's name must be between 4 and 30 characters, inclusive, must not be the same
     *    as the predefined name, and must not contain profanity.
     * 3. A ship has been selected.
     * 4. A preset loadout was selected, or the user chose to start from scratch (create mode).
     * 5. The loadout has at least one Primary or Secondary Weapon. This check is bypassed if the
     *    `ancientWeaponEquipped` flag is true.
     * TODO look into standardizing disabled functionality across components, e.g. some work using a function instead of useEffect
     */
    useEffect(() => {
        const sessionUserExists = sessionUser !== null;
        const isValidName = (
            name.length >= 4 && name.length <= 30 && 
            name !== 'LOADOUT NAME HERE' &&
            filter.clean(name) === name
        );
        const shipChosen = shipId >= 0;
        const presetChosen = mode !== 'create' || 
            (shipPreset === false || ['a', 'b', 'c'].includes(shipPreset));
        const hasOnePrimary = primaryWeapons && (flags.ancientWeaponEquipped ||
            Object.values(primaryWeapons).filter((primary) => primary.id !== null).length > 0);
        const hasOneSecondary = secondaryWeapons &&
            Object.values(secondaryWeapons).filter((secondary) => secondary !== null).length > 0;
        
        setDisabled(!(sessionUserExists && isValidName && shipChosen && presetChosen &&
            hasOnePrimary && hasOneSecondary));
    }, [sessionUser, mode, flags, name, shipId, shipPreset, primaryWeapons, secondaryWeapons]);

    
    /* When the button is clicked, organize the Redux data & create the loadout. */
    const onClick = (event) => {
        event.stopPropagation();

        // Get rid of the `selected` field from enhancements.
        const enhanceClone = structuredClone(enhancements);
        delete enhanceClone.selected;

        // Assemble the submission data. `mode`, `shipPreset`, and `focusedEquipment` are excluded.
        const submissionData = JSON.stringify({
            flags, name, shipId, enhancements: enhanceClone, primaryWeapons, secondaryWeapons, 
            devices, consumables
        });
        
        // Send the data to create or change the loadout respectively.
        (mode === 'create'
            ? dispatch(loadoutActions.createLoadout(submissionData))
            : dispatch(loadoutActions.updateLoadout(params.loadoutId, submissionData))
        ).then(navigate('/loadouts'));
    };

    /* Return the submission button. */
    return (<button onClick={onClick} disabled={disabled}>
        {mode === 'create'
            ? <>Submit <span className='site-text-icon'><PiMouseLeftClickFill /></span></>
            : <>Submit Changes <span className='site-text-icon'><PiMouseLeftClickFill /></span></>
        }
    </button>);   
}

/**
 * Sub-component of {@linkcode BuilderControls} that renders a button allowing the user to start
 * building a loadout from scratch, rather than using a ship preset. Visible only on the Ships tab.
 * 
 * This component simply sets the `shipPreset` state slice to `false`, indicating that the user has 
 * chosen to start from a clean slate. This should be treated separately from `shipPreset` being 
 * set to `null`, which means a choice has not been made yet.
 * @component `StartBlankButton`
 * @requires {@linkcode builderActions}
 */
function StartBlankButton() {
    // React Hooks
    const dispatch = useDispatch();
    const { mode, tabId, shipId, shipPreset } = useSelector((state) => state.builder);

    /* When the button is clicked, set `shipPreset` to `false`. */
    const onClick = (event) => {
        event.stopPropagation();
        dispatch(builderActions.updateShipPreset(false));
    };

    /**
     * In order for the button to be enabled:
     * 1. The Loadout Builder must be in create mode.
     * 2. A ship has been selected.
     * 3. A preset loadout has NOT been selected.
     */
    const disabled = mode !== 'create' || (shipId === null || shipPreset !== null);

    /* Return the button if the Loadout Builder is currently on the Ships tab. */
    return tabId === 0 && (<button onClick={onClick} disabled={disabled}>
        Start from Scratch <span className='site-text-icon'><PiMouseLeftClickFill /></span>
    </button>);
}

/**
 * Sub-component of {@linkcode BuilderControls} that renders a button allowing the user to select
 * an ingame loadout preset based on their currently selected ship. Visible only on the Ships tab.
 * 
 * This button on its own only opens the {@linkcode SelectPresetModal}. See its documentation for
 * more information on its functionality.
 * @component `SelectPresetButton`
 * @requires {@linkcode OpenModal} {@linkcode SelectPresetModal}
 */
function SelectPresetButton() {
    // React Hooks
    const { mode, tabId, shipId, shipPreset } = useSelector((state) => state.builder);

    /**
     * In order for the button to be enabled:
     * 1. The Loadout Builder must be in create mode.
     * 2. A ship has been selected.
     * 3. A preset loadout has NOT been selected.
     */
    const disabled = mode !== 'create' || (shipId === null || shipPreset !== null);

    /* Return the button if the Loadout Builder is currently on the Ships tab. */
    return tabId === 0 && <OpenModal
        elementText={<>
            Choose Preset <span className='site-text-icon'><PiMouseLeftClickFill /></span>
        </>}
        modalComponent={<SelectPresetModal />}
        modalId='select-preset-modal'
        disabled={disabled}
    />;
}

/**
 * Sub-component of {@linkcode BuilderControls} that renders a button allowing the user to clear
 * all of their currently selected enhancements. Visible only on the Enhancements tab.
 * @component `ClearEnhancementsButton`
 * @requires {@linkcode builderActions}
 */
function ClearEnhancementsButton() {
    // React Hooks
    const dispatch = useDispatch();
    const { tabId, enhancements } = useSelector((state) => state.builder);
    // Local State Values
    const [disabled, setDisabled] = useState(true);

    /** 
     * When the button is clicked, clear the enhancements state. 
     * TODO should use a state slice resetter, reset as a param should be deprecated
     */
    const onClick = (event) => {
        event.stopPropagation();
        dispatch(builderActions.updateEnhancement('reset', null));
    };

    /* In order for the button to be enabled, one or more enhancements must be not null. */
    useEffect(() => {
        setDisabled((() => {
            for(let key in enhancements) {
                if(key === 'selected') continue;
                if(enhancements[key] !== null) return false;
            }
            return true;
        })());
    }, [tabId, enhancements]);

    /* Return the button if the Loadout Builder is currently on the Enhancements tab. */
    return tabId === 1 && (<button onClick={onClick} disabled={disabled}>
        Clear Enhancements <span className='site-text-icon'><PiMouseLeftClickFill /></span>
    </button>);
}
