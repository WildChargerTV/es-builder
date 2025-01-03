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
import { shipData } from '../../data';
import * as builder from '../../store/builder';
import { createLoadout, updateLoadout } from '../../store/loadout';

export default function BuilderControls({ isLoaded }) {
    return isLoaded && (<div id='builder-controls'>
        <StartBlankButton />
        <PresetLoadoutButton />
        <ClearEnhancementsButton />
        <SubmitLoadoutButton />
    </div>);
}

function SubmitLoadoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { 
        mode,
        name,
        shipId, 
        enhancements,
        primaryWeapons, 
        secondaryWeapons,
        devices,
        consumables } = useSelector((state) => state.builder);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if(!primaryWeapons[0] && !secondaryWeapons[0]) return;

        const isValidNameLength = name.length >= 4 && name.length <= 30;
        
        const hasOnePrimary = (() => {
            for(let key in primaryWeapons)
                if(primaryWeapons[key].id !== null) return true;
            return false;
        })();
        const hasOneSecondary = (() => {
            for(let key in secondaryWeapons)
                if(secondaryWeapons[key] !== null) return true;
            return false;
        })();

        setDisabled(!(shipId >= 0 && isValidNameLength && (hasOnePrimary || hasOneSecondary)));
    }, [name, shipId, primaryWeapons, secondaryWeapons]);

    

    const onClick = (event) => {
        event.stopPropagation();
        if(mode === 'create')
            dispatch(createLoadout(JSON.stringify({
                name, shipId, enhancements, primaryWeapons, secondaryWeapons, devices, consumables
            }))).then(navigate('/loadouts'));
        else if(mode === 'edit')
            dispatch(updateLoadout(params.loadoutId, JSON.stringify({
                name, shipId, enhancements, primaryWeapons, secondaryWeapons, devices, consumables
            }))).then(navigate('/loadouts'));
    };

    return <button onClick={onClick} disabled={disabled}>
        {mode === 'create'
        ? <>Submit <span className='site-text-icon'><PiMouseLeftClickFill /></span></>
        : <>Submit Changes <span className='site-text-icon'><PiMouseLeftClickFill /></span></>}
    </button>;   
}

function StartBlankButton() {
    const dispatch = useDispatch();
    const { mode, tabId, shipId, shipPreset } = useSelector((state) => state.builder);

    const onClick = () => {
        dispatch(builder.changeShipPreset(false));
        dispatch(builder.changeFocusEquip('reset'));
    }

    const disabled = mode !== 'create' || (shipId === null || shipPreset !== null);

    return tabId === 0 && <button onClick={onClick} disabled={disabled}>
        Start from Scratch <span className='site-text-icon'><PiMouseLeftClickFill /></span>
    </button>
}

function PresetLoadoutButton() {
    const { mode, tabId, shipId, shipPreset } = useSelector((state) => state.builder);

    const elementText = <>
        Choose Preset Loadout <span className='site-text-icon'><PiMouseLeftClickFill /></span>
    </>;

    useEffect(() => {
        if(tabId > 0) return;
        document
            .getElementById('builder-ctrl-preset')
            .firstChild
            .disabled = mode !== 'create' || (shipId === null || shipPreset !== null);
    }, [mode, tabId, shipId, shipPreset]);

    return tabId === 0 && <div id='builder-ctrl-preset'>
        <OpenModal
            elementText={elementText}
            modalComponent={<PresetLoadoutModal />}
        />
    </div>;
}

function ClearEnhancementsButton() {
    const dispatch = useDispatch();
    const { tabId, enhancements } = useSelector((state) => state.builder);
    const [disabled, setDisabled] = useState(true);

    const onClick = (event) => {
        event.stopPropagation();
        dispatch(builder.changeEnhancement('reset', null));
    };

    useEffect(() => {
        setDisabled((() => {
            for(let key in enhancements)
                if(enhancements[key] !== null) return false;
            return true;
        })());
    }, [tabId, enhancements]);

    return tabId === 1 && <button onClick={onClick} disabled={disabled}>
        Clear Enhancements <span className='site-text-icon'><PiMouseLeftClickFill /></span>
    </button>;
}