// * frontend/src/components/LoadoutBuilder/Modules/EnhancementList.jsx

// Node Module Imports
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import enhancementData from '../../../data/enhcancements';
import { updateEnhancement, updateFlag } from '../../../store/builder';
import BucketImage from '../../../utils/BucketImage';

/** List of all valid Enhancement Categories. */
const CATEGORIES = [
    'Navigation', 'Damage and Repair', 'Defense', 'Devices', 'Sensors', 'Crafting', 'Weapons', 
    'Movement', 'Energy' 
];

/**
 * Renders the Enhancement Selector, styled almost exactly as it is in-game. The only exception is
 * that the enhancements within each category are ordered alphabetically, rather than retaining
 * their original order.
 * 
 * Component consists of a collection of sub-components assembled into a grid layout.
 * @component `EnhancementList`
 * @requires {@linkcode CATEGORIES}, {@linkcode EnhancementGroup}
 * @returns {ReactElement}
 */
export default function EnhancementList() {
    /** Return the list of `EnhancementGroup`s. */
    return (<div id='builder-enhancement-select'>
        {CATEGORIES.map((catName) => <EnhancementGroup key={CATEGORIES.indexOf(catName)} category={catName} />)}
    </div>);
}

/**
 * Sub-component of `EnhancementList` that renders a single group of enhancements from one of the
 * seven valid categories.
 * @component `EnhancementGroup`
 * @requires {@linkcode SingleEnhancement}, {@linkcode enhancementData}
 * @param {{category: string}}  
 * @returns {ReactElement}
 */
function EnhancementGroup({ category }) {
    /** Filter the list of enhancements down to the ones that apply to the current category. */
    const res = enhancementData.filter((enhancement) => enhancement.category === category);

    /** Return the Enhancement Group, as well as its child `SingleEnhancement`s. */
    return (<div id={`builder-enhancements-${CATEGORIES.indexOf(category)}`} className='builder-enhancement-group'>
        {/* Group Title */}
        <p className='enhancement-group-title'>{category}</p>
        {/* Group List */}
        <div className='enhancement-group-list'>
            {res.map((enhancement) => <EnhancementCell key={enhancement.id} data={enhancement} />)}
        </div>
    </div>);
}

/**
 * Sub-component of `EnhancementGroup` that renders a single enhancement cell based on the provided
 * data. When selected in Create/Edit mode, the enhancement is added to the loadout, and its cell
 * on this list becomes disabled until the enhancement is removed or otherwise cleared from the 
 * loadout. See `EnhancementInfo.jsx` for more information on removing enhancements. All
 * Enhancement List cells are disabled in View mode.
 * 
 * If the **Ancient Weapon** is selected, the loadout's existing Primary and Secondary Weapons are
 * wiped, and the Ancient Weapon is automatically installed into the first Primary Weapon slot with
 * no mods.
 * @component `EnhancementCell`
 * @requires {@linkcode BucketImage}
 * @param {{data: object}} 
 * @returns {ReactElement}
 */
function EnhancementCell({ data }) {
    // React Hooks
    const dispatch = useDispatch();
    const { mode, shipId, enhancements } = useSelector((state) => state.builder);

    /** When an enhancement is selected, add it to the selected enhancements. */
    const onClick = () => {
        // Set the currently selected enhancement to the current one.
        dispatch(updateEnhancement('selected', data.id));

        // Iterate through the enhancements state. If a null index is found, equip the enhancement
        // to it. Account for the addition of Ancient Weapon & Splitter.
        // ? Ancient Weapon & Splitter CAN be equipped at the same time. Check for Splitter first,
        // ? then Ancient Weapon, as the latter still makes the former functionally null.
        for(const key in enhancements) {
            if(enhancements[key] === null && key !== 'selected') {
                dispatch(updateEnhancement(key, data.id));
                data.id === 2 && dispatch(updateFlag("ancientWeaponEquipped", true));
                data.id === 24 && dispatch(updateFlag("splitterEquipped", true));
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
    
    /** Return the enhancement cell. */
    return <button className='enhancement-group-cell' title={data.name} onClick={onClick} disabled={disabled()}>
        <BucketImage dir={data.icon} />
    </button>;
}