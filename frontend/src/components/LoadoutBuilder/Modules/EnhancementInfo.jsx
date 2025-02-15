// * frontend/src/components/LoadoutBuilder/Modules/EnhancementInfo.jsx

// Node Module Imports
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import BucketImage from '../../Bucket/BucketImage';
import { enhancementData, shipData } from '../../../data';
import { updateEnhancement, updateFlag } from '../../../store/builder';

/**
 * Renders the group of currently equipped enhancements, as well as information about the currently
 * selected enhancement (or instructional data if no enhancement is currently selected).
 * @component `EnhancementInfo`
 * @requires {@linkcode CurrentEnhancementGroup}, {@linkcode CurrentEnhancementInfo}
 * @returns {ReactElement}
 */
export default function EnhancementInfo() {
    /** Render the child components. */
    return (<div id='builder-enhancement-info-select'>
        <CurrentEnhancementGroup />
        <CurrentEnhancementInfo />
    </div>);
}

/**
 * Sub-component of `EnhancementInfo` that renders the group of enhancements currently added to the
 * loadout. Although visually identical to the Enhancement Groups found in `EnhancementList.jsx`,
 * its functionality is different, and therefore does not violate DRY.
 * @component `CurrentEnhancementGroup`
 * @requires {@linkcode enhancementData}, {@linkcode CurrentSingleEnhancement}
 * @returns {ReactElement}
 */
function CurrentEnhancementGroup() {
    // React Hooks
    const dispatch = useDispatch();
    const { shipId, enhancements } = useSelector((state) => state.builder);

    /** Dynamically update the group's data array based on the current enhancements state. */
    const groupData = useMemo(() => {
        // Declare the array.
        const res = [];

        // Iterate through the enhancements state.
        for(let key in enhancements) {
            // Ignore the 'selected' key (prevents the group having four slots).
            if(key === 'selected') continue;

            // Push the enhancement's object into the array.
            res.push({ index: key, id: enhancements[key] });
        }

        // Return the array.
        return res;
    }, [enhancements]);

    /** 
     * Whenever the current ship changes, and one of the currently equipped enhancements becomes
     * incompatible with that new ship, remove the enhancement from the group.
     */
    useEffect(() => {
        // Return early if no group data exists yet.
        if(!groupData) return;

        // Iterate through the group data array.
        for(let enhancement of groupData) {
            // If no ID exists at the current index, skip it.
            if(!enhancement.id) continue;

            // Get the details of the current enhancement from its ID.
            const eData = enhancementData[enhancement.id];

            // If the enhancement cannot be equipped on the current ship, remove it from the group.
            if(eData?.allowed_ships && (shipId === null || eData.allowed_ships.indexOf(shipId) === -1))
                dispatch(updateEnhancement(enhancement.i, null));
        }
    }, [dispatch, groupData, shipId]);

    /** Return the Enhancement Group. */
    return (<div id='builder-selected-enhancements' className='builder-enhancement-group'>
        {/* Group Title */}
        <p className='enhancement-group-title' style={{textAlign: 'center'}}>Selected</p>
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
 * Sub-component of `CurrentEnhancementGroup` that renders a single enhancement cell based on the
 * provided ID. When selected in Create/Edit mode, the enhancement is removed from the loadout, and
 * the cell it once occupied becomes disabled until a new enhancement is added in its place. See 
 * `EnhancementList.jsx` for more information on adding enhancements. When selected in View mode,
 * the enhancement will become focused, and its details will be provided. Although visually
 * identical to the Enhancement Cells found in `EnhancementList.jsx`, its functionality is
 * different, and therefore does not violate DRY.
 * 
 * Removing the **Ancient Weapon** or **Splitter** enhancements will set their appropriate flags.
 * @component `CurrentEnhancementCell`
 * @requires {@linkcode enhancementData}, {@linkcode shipData}, {@linkcode BucketImage}
 * @param {{ id: number }}
 * @returns {ReactElement}
 */
function CurrentEnhancementCell({ index, id }) {
    // React Hooks
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.builder);

    /** Get the enhancement data, if it exists. */
    const enhancement = id !== null && enhancementData[id];
    
    /** Execute the appropriate behavior when the cell is clicked. */
    const onClick = () => {
        // In View mode, set the selected enhancement to this cell's ID, and return early.
        if(mode === 'view') {
            dispatch(updateEnhancement('selected', id));
            return;
        }

        // Remove the enhancement in this cell.
        dispatch(updateEnhancement(index, null));

        // Account for the remvoal of Ancient Weapon or Splitter.
        id === 2 && dispatch(updateFlag('ancientWeaponEquipped', false));
        id === 24 && dispatch(updateFlag('splitterEquipped', false));
    }

    /** Return the enhancement cell. */
    return <button className='enhancement-group-cell selected' onClick={onClick} disabled={id === null}>
        {id !== null && <BucketImage dir={enhancement.icon} />}
    </button>;
}

/**
 * Renders information about the currently selected enhancement, or instructional data if no
 * enhancement is currently selected.
 * @component `CurrentEnhancementInfo`
 * @requires {@linkcode enhancementData}, {@linkcode BucketImage}
 * @returns {ReactElement}
 */
function CurrentEnhancementInfo() {
    // React Hooks
    const currEnhancement = useSelector((state) => state.builder.enhancements.selected);

    /** Get the enhancement data, if it exists. */
    const currData = currEnhancement !== null && enhancementData[currEnhancement];

    if(currEnhancement === null) return (<div id='builder-enhancement-info'>
        <h2 id='enhancement-info-name'>
            Select Enhancements
        </h2>
        <p id='enhancement-info-desc'>
            Select any one of the available enhancements to add it to your loadout. You may add
            up to three unique enhancements. If an enhancement is greyed out & cannot be clicked,
            that means it is not compatible with your current ship. Clicking on any one of the 
            enhancements in the &quot;Selected&quot; group above will remove it from your loadout.
            <br /><br />
            <span className='red'>WARNING:</span> The <span className='yellow'> Ancient 
            Weapon</span> enhancement replaces your existing Primary & Secondary Weapons when 
            equipped. Similarly, the <span className='yellow'> Splitter</span> enhancement will 
            remove all but the first Secondary Weapons slot when equipped.
            <br /><br />
            The Loadout Builder will cache this data the moment you equip either enhancement, so
            you can unequip it later and retain your prior configuration. However, this data is
            not persistent; submitting your loadout, or your changes to it, will cause the cached
            data to be <span className='red'>wiped</span>. Be careful!
        </p>
    </div>);

    /** Return the enhancement's information. */
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
                {currData.allowed_ships.map((id) => <>{shipData[id].name.split('Colonial ')[1]}<br /></> )}
            </p>
        </div>}
    </div>);
}
