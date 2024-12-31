// * frontend/src/components/LoadoutBuilder/TabMenu.jsx

// Node Module Imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import { changeTab } from '../../store/builder';

/**
 * Tab menu for the Loadout Builder. Changing the tab updates the Redux state accordingly.
 * 
 * Tabs:
 * - `0`: Ship Selection
 * - `1`: Enhancement Selection
 * - `2`: Equipment Selection
 * @component `BuilderTabMenu`
 * @param {{ isLoaded: boolean; }} args Lets the component know if the page has finished loading.
 * @returns {ReactElement}
 */
export default function BuilderTabMenu({ isLoaded }) {
    // React Hooks
    const dispatch = useDispatch();
    const { mode, shipId, shipPreset, tabId } = useSelector((state) => state.builder);

    /** When one of the inactive tabs is clicked, make that tab active. */
    const onClick = (event) => {
        const currentActive = document.getElementsByClassName('active')[1];
        if(currentActive !== event.target) {
            const btnNum = Number(event.target.id.split('-')[2]);
            dispatch(changeTab(btnNum));
        }
    }

    /** Set the active tab to the one defined in the Redux store. */
    useEffect(() => {
        if(!isLoaded) return;
        const currentActive = document.getElementsByClassName('active')[1];
        if(currentActive) currentActive.className = '';
        document.getElementById(`builder-tab-${tabId}`).className = 'active';
    }, [tabId, isLoaded]);

    const disabled = mode === 'create' && (shipId === null || shipPreset === null);
    
    /** Return tab menu content. Enhancement/Equipment tabs are disabled until a ship is chosen. */
    return isLoaded && (<div id='builder-tabs'>
        <button id='builder-tab-0' onClick={onClick}>Ships</button>
        <button id='builder-tab-1' onClick={onClick} disabled={disabled}>Enhancements</button>
        <button id='builder-tab-2' onClick={onClick} disabled={disabled}>Equipment</button>
    </div>);
}