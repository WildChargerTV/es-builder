// * frontend/src/components/LoadoutBuilder/EnhancementsTab.jsx

// Local Module Imports
import EnhancementInfo from './Modules/EnhancementInfo';
import EnhancementList from './Modules/EnhancementList';
import './Styles/enhancements.css';

/**
 * Abstraction layer that renders the "Enhancements" tab in the Loadout Builder. Whether or not it
 * is loaded depends on if the `LoadoutBuilderMain` component is also loaded. This component
 * renders the `EnhancementList` and `EnhancementInfoSelect` compoenents, in that order.
 * @component `EnhancementsTab`
 * @param {{ isLoaded: boolean }} 
 * @returns {null | ReactElement}
 */
export default function EnhancementsTab({ isLoaded }) {
    /** If the loadout builder has successfully loaded, render the child components. */
    return isLoaded && (<>
        <EnhancementList />
        <EnhancementInfo />
    </>);
}