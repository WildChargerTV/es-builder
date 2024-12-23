// * frontend/src/components/LoadoutBuilder/LoadoutBuilder.jsx
// TODO complete documentation

// Node Module Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Local Module Imports
import LoadoutTabMenu from './TabMenu';
import ShipSelector from './ShipsTab';
import EnhancementsTab from './EnhancementsTab';
import EquipmentSelector from './EquipmentTab';
import BuilderControls from './BuilderControls';
import * as builderActions from '../../store/builder';
import { getLoadout } from '../../store/loadout';
import './LoadoutBuilder.css';
import './Modals/Modals.css';

export default function LoadoutBuilderMain({ mode }) {
    // React Hooks
    const dispatch = useDispatch();
    const params = useParams();
    const { tabId, name } = useSelector((state) => state.builder);
    
    // Local State Values
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageTitle, setPageTitle] = useState('');

    const checkName = (event) => {
        console.log(event.target.innerText);
        const nameLength = event.target.innerText.split('\n')[0].length;
        if(nameLength < 4 || nameLength > 30)
            event.target.style.color = '#ff5d51';
        else
            event.target.style.color = '#f9e2ad';
    }
    const setName = (event) => {
        const newName = event.target.innerText.split('\n')[0];
        if(name !== newName)
            dispatch(builderActions.changeName(newName));
    }
    
    useEffect(() => {
        dispatch(builderActions.clearState(mode));

        if(mode === 'create') { 
            setIsLoaded(true); 
            setPageTitle('Create New Loadout');
            return; 
        }

        setPageTitle(mode === 'edit' ? 'Modify Loadout': 'View Loadout');
        dispatch(getLoadout(params.loadoutId))
        .then((loadoutData) => {
            dispatch(builderActions.bulkUpdateState(loadoutData));
            setIsLoaded(true);
        });
    }, [dispatch, mode]);

    return isLoaded && (<main id='site-loadout-builder'>
        <div id='loadout-builder-head'>
            <h1>{pageTitle}</h1>
            <h2 
                id='loadout-builder-name'
                contentEditable={mode !== 'view'} suppressContentEditableWarning 
                onBlur={setName} 
                onKeyUp={checkName}
                aria-hidden 
            >{name}</h2>
        </div>
        
        <div id='loadout-builder-container'>
            <LoadoutTabMenu isLoaded={isLoaded} />
            <div id='builder-content'>
                {tabId == 0 && <ShipSelector isLoaded={isLoaded} />}
                {tabId == 1 && <EnhancementsTab isLoaded={isLoaded} />}
                {tabId == 2 && <EquipmentSelector isLoaded={isLoaded} />}
            </div>
            {['create', 'edit'].includes(mode) && <BuilderControls isLoaded={isLoaded} />}
        </div>
    </main>)
}