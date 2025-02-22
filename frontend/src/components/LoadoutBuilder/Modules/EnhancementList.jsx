// * frontend/src/components/LoadoutBuilder/Modules/EnhancementList.jsx
// TODO currently selected enhancement and currently selected equipment should be merged

// Node Module Imports
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import enhancementData from '../../../data/enhcancements';
import * as builderActions from '../../../store/builder';
import BucketImage from '../../../utils/BucketImage';

/* List of all valid Enhancement Categories. */
const CATEGORIES = [
    'Navigation', 'Damage and Repair', 'Defense', 'Devices', 'Sensors', 'Crafting', 'Weapons', 
    'Movement', 'Energy' 
];

/**
 * Renders the Enhancement Selector, styled almost exactly as it is in-game. The only exception is
 * that the enhancements within each category are ordered alphabetically, rather than retaining
 * their original order.
 * @component `EnhancementList`
 * @requires {@linkcode CATEGORIES}
 * @requires {@linkcode EnhancementGroup}
 */
export default function EnhancementList() {
    /* Return the grid of enhancement groups. */
    return (<div id='builder-enhancement-select'>
        {CATEGORIES.map((catName) => 
            <EnhancementGroup key={CATEGORIES.indexOf(catName)} category={catName} />
        )}
    </div>);
}

/**
 * Sub-component of {@linkcode EnhancementList} that renders a single group of enhancements from 
 * one of the seven valid categories.
 * @component `EnhancementGroup`
 * @requires {@linkcode enhancementData}
 * @requires {@linkcode EnhancementCell}
 * @param {{ category: string }} props
 */
function EnhancementGroup({ category }) {
    /* Filter out all enhancements that are not applicable to the current category. */
    const res = enhancementData.filter((enhancement) => enhancement.category === category);

    /* Give the enhancement group its ID number based on its position in the `CATEGORIES` array. */
    const groupId = `builder-enhancements-category-${CATEGORIES.indexOf(category)}`;

    /* Return the enhancement group & the enhancements within it. */
    return (<div id={groupId} className='builder-enhancement-group'>
        {/* Group Title */}
        <p className='enhancement-group-title'>{category}</p>

        {/* Group List */}
        <div className='enhancement-group-list'>
            {res.map((enhancement) => <EnhancementCell key={enhancement.id} data={enhancement} />)}
        </div>
    </div>);
}

/**
 * Sub-component of {@linkcode EnhancementGroup} that renders a single enhancement cell. 
 * 
 * When selected in Create/Edit mode, the enhancement is added to the loadout, and its cell on this 
 * list becomes disabled until the enhancement is removed or otherwise cleared from the loadout. 
 * All enhancement cells are disabled in View mode.
 * @component `EnhancementCell`
 * @requires {@linkcode builderActions}
 * @requires {@linkcode BucketImage}
 * @param {{ data: object }} props
 */
function EnhancementCell({ data }) {
    // React Hooks
    const dispatch = useDispatch();
    const { mode, shipId, enhancements } = useSelector((state) => state.builder);

    /* When an enhancement is selected, add it to the selected enhancements. */
    const onClick = (event) => {
        event.stopPropagation();
        
        // Set the currently selected enhancement to the one in this cell.
        dispatch(builderActions.updateEnhancement('selected', data.id));

        // Iterate through the enhancements state. If a null index is found, equip the enhancement
        // to it. Account for the addition of Ancient Weapon & Splitter.
        // ? Ancient Weapon & Splitter CAN be equipped at the same time. Check for Splitter first,
        // ? then Ancient Weapon, as the latter still makes the former functionally null.
        for(const key in enhancements) {
            if(enhancements[key] === null && key !== 'selected') {
                dispatch(builderActions.updateEnhancement(key, data.id));
                data.id === 2 && dispatch(builderActions.updateFlag("ancientWeaponEquipped", true));
                data.id === 24 && dispatch(builderActions.updateFlag("splitterEquipped", true));
                return;
            }
        }   
    };

    /**
     * Disable the cell if:
     * 1. The Loadout Builder is currently in View mode.
     * 2. The current enhancement is already equipped.
     * 3. The current enhancement is not legal to equip on the currently selected ship.
     */
    const disabled = () => {
        if(mode === 'view') return true;
        for(let key in enhancements) {
            if(enhancements[key] === data.id && key !== 'selected') 
                return true;
        }
        return (data.allowed_ships && (!shipId || data.allowed_ships.indexOf(shipId) === -1));
    };
    
    /* Return the enhancement cell. */
    return (<button className='enhancement-group-cell' title={data.name} onClick={onClick} disabled={disabled()}>
        <BucketImage dir={data.icon} />
    </button>);
}
