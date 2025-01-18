// * frontend/src/components/LoadoutBuilder/BuilderControls.jsx
// TODO docs

// Node Module Imports
import { useEffect, useState } from 'react';
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// Local Module Imports
import PresetLoadoutModal from './Modals/PresetLoadoutModal';
import OpenModal from '../Modal/OpenModal';
import * as builder from '../../store/builder';
import { createLoadout, updateLoadout } from '../../store/loadout';

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
 * @param {{ isLoaded: boolean }} 
 * @returns {null | ReactElement}
 */
export default function BuilderControls({ isLoaded }) {
    return isLoaded && (<div id='builder-controls'>
        <StartBlankButton />
        <PresetLoadoutButton />
        <ClearEnhancementsButton />
        <SubmitLoadoutButton />
    </div>);
}

/**
 * Renders the button responsible for submitting the loadout. On submission, this component will
 * assemble all of the necessary sections of the Redux state and send them to the backend.
 * @component `SubmitLoadoutButton` 
 * @returns {null | ReactElement}
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
     * In order for the button to be enabled: 
     * 1. There must be an active session user.
     * 2. The loadout's name must be between 4 and 30 characters, inclusive, and must not be the
     *    same as the predefined name.
     * 3. A ship has been selected.
     * 4. A preset loadout was selected, or the user chose to start from scratch (create mode).
     * 5. The loadout has at least one Primary or Secondary Weapon. This check is bypassed if the
     *    `ancientWeaponEquipped` flag is true.
     */
    useEffect(() => {
        const sessionUserExists = sessionUser !== null;
        const isValidName = name.length >= 4 && name.length <= 30 && name !== 'LOADOUT NAME HERE';
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

    
    /** When the Submit button is clicked, send the data to the backend. */
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
            ? dispatch(createLoadout(submissionData))
            : dispatch(updateLoadout(params.loadoutId, submissionData))
        ).then(navigate('/loadouts'));
    };

    /** Return the button. */
    return <button onClick={onClick} disabled={disabled}>
        {mode === 'create'
        ? <>Submit <span className='site-text-icon'><PiMouseLeftClickFill /></span></>
        : <>Submit Changes <span className='site-text-icon'><PiMouseLeftClickFill /></span></>}
    </button>;   
}

/**
 * Renders a button that sets the `shipPreset` slice to `false`. Rendered alongside the
 * {@linkcode PresetLoadoutButton}. Visible only on the Ships tab.
 * 
 * It's important to note that setting `shipPreset` to `false` is meant to indicate to the Loadout
 * Builder that the user has chosen to start from a clean slate. This should be treated separately
 * to `shipPreset` being set to `null`, which means a choice has not been made yet. This is crucial
 * for controlling access to other Loadout Builder controls.
 * @component `StartBlankButton`
 * @returns {null | ReactElement}
 */
function StartBlankButton() {
    // React Hooks
    const dispatch = useDispatch();
    const { mode, tabId, shipId, shipPreset } = useSelector((state) => state.builder);

    /** 
     * When the button is clicked, set `shipPreset` to `false`. As a safeguard, clear any selected 
     * equipment. 
     * TODO make it so that the focusEquip is cleared long before this
     */
    const onClick = () => {
        dispatch(builder.changeShipPreset(false));
        dispatch(builder.changeFocusEquip('reset'));
    }

    /**
     * In order for the button to be enabled:
     * 1. The Loadout Builder must be in create mode.
     * 2. A ship has been selected.
     * 3. A preset loadout has NOT been selected.
     */
    const disabled = mode !== 'create' || (shipId === null || shipPreset !== null);

    /** Return the button if the Loadout Builder is currently on the Ships tab. */
    return tabId === 0 && <button onClick={onClick} disabled={disabled}>
        Start from Scratch <span className='site-text-icon'><PiMouseLeftClickFill /></span>
    </button>;
}

/**
 * Renders a button that allows the user to select one of the three ingame loadout presets based on
 * their currently selected ship. Visible only on the Ships tab.
 * 
 * This button on its own only opens the {@linkcode PresetLoadoutModal}. See its documentation for
 * more information on its functionality.
 * @component `PresetLoadoutButton`
 * @requires {@linkcode OpenModal} {@linkcode PresetLoadoutModal}
 * @returns {ReactElement}
 */
function PresetLoadoutButton() {
    // React Hooks
    const { mode, tabId, shipId, shipPreset } = useSelector((state) => state.builder);

    /**
     * In order for the button to be enabled:
     * 1. The Loadout Builder must be in create mode.
     * 2. A ship has been selected.
     * 3. A preset loadout has NOT been selected.
     */
    const disabled = mode !== 'create' || (shipId === null || shipPreset !== null);

    /** Return the button if the Loadout Builder is currently on the Ships tab. */
    return tabId === 0 && <div id='builder-ctrl-preset'>
        <OpenModal
            elementText={<>
                Choose Preset <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </>}
            modalComponent={<PresetLoadoutModal />}
            disabled={disabled}
        />
    </div>;
}

/**
 * Renders a button that allows the user to clear all of their currently selected enhancements.
 * Visible only on the Enhancements tab.
 * @component `ClearEnhancementsButton`
 * @returns {null | ReactElement}
 */
function ClearEnhancementsButton() {
    // React Hooks
    const dispatch = useDispatch();
    const { tabId, enhancements } = useSelector((state) => state.builder);
    // Local State Values
    const [disabled, setDisabled] = useState(true);

    /** When the button is clicked, clear the enhancements state. */
    const onClick = (event) => {
        event.stopPropagation();
        dispatch(builder.changeEnhancement('reset', null));
    };

    /** In order for the button to be enabled, one or more enhancements must be not null. */
    useEffect(() => {
        setDisabled((() => {
            for(let key in enhancements) {
                if(key === 'selected') continue;
                if(enhancements[key] !== null) return false;
            }
            return true;
        })());
    }, [tabId, enhancements]);

    /** Return the button if the Loadout Builder is currently on the Enhancements tab. */
    return tabId === 1 && <button onClick={onClick} disabled={disabled}>
        Clear Enhancements <span className='site-text-icon'><PiMouseLeftClickFill /></span>
    </button>;
}