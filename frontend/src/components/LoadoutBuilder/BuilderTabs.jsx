// * frontend/src/components/LoadoutBuilder/BuilderTabs.jsx

// Node Module Imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import { updateTab } from '../../store/builder';

/**
 * Renders an EVERSPACE-style tab navigation menu for the Loadout Builder. Changing the tab updates 
 * the Redux state accordingly. This component will not be visible if the `LoadoutBuilderMain`
 * component is also loaded.
 * 
 * **This component DOES NOT link to the body contents of the Loadout Builder.** This is also
 * handled in `LoadoutBuilderMain`. This component only manages the active tab and communicates it
 * to the Redux state.
 * 
 * At present, the Loadout Builder consists of the following tabs:
 * - `0`: Ship Selection
 * - `1`: Enhancement Selection
 * - `2`: Equipment Selection & Customization
 * @component `BuilderTabs`
 * @requires {@linkcode updateTab}
 * @param {{ isLoaded: boolean }} props
 */
export default function BuilderTabs({ isLoaded }) {
    // React Hooks
    const dispatch = useDispatch();
    const { mode, shipId, shipPreset, tabId } = useSelector((state) => state.builder);

    /* When one of the inactive tabs is clicked, change the ID in the Redux store. */
    const onClick = (event) => {
        const currId = Number(event.target.id.split('-')[2]);
        currId !== tabId && dispatch(updateTab(currId));
    }

    /* Set the active tab to the one defined in the Redux store. */
    useEffect(() => {
        // Return early if the tab menu is not yet loaded.
        if(!isLoaded) return;

        // Iterate through the three tab buttons, and set their active status accordingly.
        for(const tab of Object.values(document.getElementById('builder-tabs').children)) {
            const currId = Number(tab.id.split('-')[2]);
            tab.className = currId === tabId ? 'tab-active' : '';
        }
    }, [isLoaded, tabId]);

    /** 
     * In order for the Loadout Builder's Create mode to function properly, the user cannot be
     * allowed to select Enhancements or Equipment until they have both chosen a ship & chosen
     * (or denied) a preset loadout for that ship.
     */
    const disabled = mode === 'create' && (shipId === null || shipPreset === null);
    
    /* Return the tab menu. */
    return isLoaded && (<div id='builder-tabs'>
        <button id='builder-tab-0' onClick={onClick}>Ships</button>
        <button id='builder-tab-1' onClick={onClick} disabled={disabled}>Enhancements</button>
        <button id='builder-tab-2' onClick={onClick} disabled={disabled}>Equipment</button>
    </div>);
}