// * frontend/src/components/LoadoutBuilder/Modules/EnhancementInfo.jsx
// TODO currently selected enhancement and currently selected equipment should be merged
// TODO revisit instructions, maybe dynamic based on mode

// Node Module Imports
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import * as dataFiles from '../../../data';
import * as builderActions from '../../../store/builder';
import BucketImage from '../../../utils/BucketImage';

/**
 * Renders the group of currently equipped enhancements, as well as information about the currently
 * selected enhancement (or instructional data if no enhancement is currently selected). These
 * are handled as sub-components so that they can re-render independently of one another.
 * @component `EnhancementInfo`
 * @requires {@linkcode CurrentEnhancementGroup}, {@linkcode CurrentEnhancementInfo}
 * @returns {ReactElement}
 */
export default function EnhancementInfo() {
    return (<div id='builder-enhancement-info-select'>
        <CurrentEnhancementGroup />
        <CurrentEnhancementInfo />
    </div>);
}

/**
 * Sub-component of {@linkcode EnhancementInfo} that renders the group of enhancements currently
 * added to the loadout.
 * @component `CurrentEnhancementGroup`
 * @requires {@linkcode dataFiles}, {@linkcode builderActions}
 * @requires {@linkcode CurrentEnhancementCell}
 */
function CurrentEnhancementGroup() {
    // React Hooks
    const dispatch = useDispatch();
    const { shipId, enhancements } = useSelector((state) => state.builder);

    /* Convert the enhancements state into an array of objects, removing the "selected" entry. */
    const groupData = useMemo((clone=structuredClone(enhancements)) => {
        delete clone.selected;
        return Object.entries(clone).map(([index, id]) => ({ index: Number(index), id }));
    }, [enhancements]);

    /* Automatically remove incompatible enhancements if a new ship is selected. */
    useEffect(() => {
        // Return early if no group data exists yet.
        if(!groupData) return;

        // Iterate through the group data array.
        for(let enhancement of groupData) {
            // If no ID exists at the current index, skip it.
            if(!enhancement.id) continue;

            // Get the details of the current enhancement from its ID.
            const eData = dataFiles.enhancementData[enhancement.id];

            // If the enhancement cannot be equipped on the current ship, remove it from the group.
            if(eData?.allowed_ships && (shipId === null || eData.allowed_ships.indexOf(shipId) === -1))
                dispatch(builderActions.updateEnhancement(enhancement.i, null));
        }
    }, [dispatch, groupData, shipId]);

    /* Return the enhancement group. */
    return (<div id='builder-selected-enhancements' className='builder-enhancement-group'>
        {/* Group Title */}
        <p className='enhancement-group-title'>Installed</p>
        
        {/* Group List */}
        <div className='enhancement-group-list'>
            {groupData.map((enhancement) => 
                <CurrentEnhancementCell 
                    key={enhancement.index} 
                    index={enhancement.index} 
                    id={enhancement.id} 
                />
            )}
        </div>
    </div>);
}

/**
 * Sub-component of {@linkcode CurrentEnhancementGroup} that renders a single enhancement cell.
 * 
 * When selected in Create/Edit mode, the enhancement is removed from the loadout, and the cell it 
 * once occupied becomes disabled until a new enhancement is added in its place. When selected in 
 * View mode, the enhancement will become focused, and its details will be provided.
 * 
 * Removing the **Ancient Weapon** or **Splitter** enhancements will set their appropriate flags.
 * @component `CurrentEnhancementCell`
 * @requires {@linkcode dataFiles}, {@linkcode builderActions}
 * @requires {@linkcode BucketImage}
 * @param {{ index: number, id: number }} props
 */
function CurrentEnhancementCell({ index, id }) {
    // React Hooks
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.builder);

    /* Get the enhancement data, if it exists. */
    const enhancement = id !== null && dataFiles.enhancementData[id];
    
    /* Execute the appropriate behavior when the cell is clicked. */
    const onClick = (event) => {
        event.stopPropagation();

        // In View mode, set the selected enhancement to this cell's ID, and return early.
        if(mode === 'view') {
            dispatch(builderActions.updateEnhancement('selected', id));
            return;
        }

        // Remove the enhancement in this cell.
        dispatch(builderActions.updateEnhancement(index, null));

        // Account for the remvoal of Ancient Weapon or Splitter.
        id === 2 && dispatch(builderActions.updateFlag('ancientWeaponEquipped', false));
        id === 24 && dispatch(builderActions.updateFlag('splitterEquipped', false));
    };

    /* Return the enhancement cell. */
    return (<button className='enhancement-group-cell selected' onClick={onClick} disabled={id === null}>
        {id !== null && <BucketImage dir={enhancement.icon} />}
    </button>);
}

/**
 * Sub-component of {@linkcode EnhancementInfo} that renders information about the currently
 * selected enhancement, or instructional data if no enhancement is currently selected.
 * @component `CurrentEnhancementInfo`
 * @requires {@linkcode dataFiles}
 * @requires {@linkcode BucketImage}
 */
function CurrentEnhancementInfo() {
    // React Hooks
    const currEnhancement = useSelector((state) => state.builder.enhancements.selected);

    /* Get the enhancement data, if it exists. */
    const currData = currEnhancement !== null && dataFiles.enhancementData[currEnhancement];

    /* If no enhancement is selected, return instructional data. */
    if(currEnhancement === null) 
        return <EnhancementInfoInstructions />;

    /* Return the enhancement's information. */
    return currEnhancement !== null && (<div id='builder-enhancement-info'>
        {/* Enhancement Name */}
        <h2 id='enhancement-info-name'>{currData.name}</h2>

        {/* Enhancement Positive & Negative Effects */}
        <div id='enhancement-info-effect-pos'>
            <BucketImage dir='/enhancements/enhancement-pos-effect.png' />
            <p>{currData.effect_pos}</p>
        </div>
        {currData.effect_neg && <div id='enhancement-info-effect-neg'>
            <BucketImage dir='/enhancements/enhancement-neg-effect.png' />
            <p>{currData.effect_neg}</p>
        </div>}

        {/* Enhancement Class Restriction(s) */}
        {currData.allowed_ships && <div id='enhancement-info-allowed-ships'>
            <p>Class Restriction</p>
            <p className='enhancement-ship-name' >
                {currData.allowed_ships.map((id) => <>
                    {dataFiles.shipData[id].name.split('Colonial ')[1]}<br />
                </>)}
            </p>
        </div>}
    </div>);
}

/**
 * Sub-component of {@linkcode CurrentEnhancementInfo} that renders content for the component when 
 * no enhancement is currently selected.
 * 
 * This component will provide different instructions, depending on whether it is in Create/Edit
 * mode or View mode.
 * @component `ShipInfoInstructions`
 */
function EnhancementInfoInstructions() {
    // React Hooks
    const { mode } = useSelector((state) => state.builder);
    
    /* Determine if the current builder mode is set to 'view'. */
    const isViewMode = mode === 'view';

    /* Return the infobox content. */
    return (<div id='builder-enhancement-info'>
        {/* Infobox Header */}
        <h2 id='enhancement-info-name'>
            {isViewMode ? 'View Enhancements' : 'Select Enhancements'}
        </h2>

        {/* View Mode Instructions */}
        {isViewMode && <p id='enhancement-info-desc'>
            All loadouts can install up to three unique enhancements, which can be seen within the 
            &quot;Installed&quot; group above. 
            <br /><br />
            Selecting an installed enhancement will display its information here.
        </p>}

        {/* Create & Edit Mode Instructions */}
        {!isViewMode && <p id='enhancement-info-desc'>
            Enhancements are unique, run-length modifications you can install to your ship in order
            to tweak various aspects of your gameplay experience. All loadouts can install up to
            three unique enhancements; however, ones which appear disabled are incompatible with
            your current ship.
            <br /><br />
            Use the menu of icons shown on the left to install enhancements to your loadout. 
            Hovering your cursor over an icon will reveal it&apos;s name, and selecting it will
            install it, at which point it will appear in the &quot;Installed&quot; group above.
            Similarly, selecting any enhancement within that group will uninstall it from your
            loadout.
            <br /><br />
            <span className='red'>WARNING: The</span> <span className='yellow'>Ancient
            Weapon</span> <span  className='red'>&</span> <span className='yellow'>Splitter
            </span> <span className='red'>enhancements both modify the amount of available
            equipment slots in your loadout!</span> Your prior equipment configurations are cached 
            upon installation of either enhancement; however, this data is lost once you have
            submitted the loadout.
        </p>}
    </div>);
}
