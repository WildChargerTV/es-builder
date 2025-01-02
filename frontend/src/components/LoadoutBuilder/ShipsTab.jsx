// * frontend/src/components/LoadoutBuilder/ShipSelector.jsx

// Local Module Imports
import ShipList from './Modules/ShipList';
import ShipInfo from './Modules/ShipInfo';
import './Styles/ships.css';

/**
 * Abstraction layer that renders the "Ships" tab in the Loadout Builder. Whether or not it is
 * loaded depends on if the `LoadoutBuilderMain` component is also loaded. This component renders
 * the `ShipList` and `ShipInfo` components, in that order.
 * 
 * This component uses its own stylesheet.
 * @component `ShipsTab`
 * @param {{ isLoaded: boolean }} 
 * @returns {null | ReactElement}
 */
export default function ShipsTab({ isLoaded }) {
    /** If the loadout builder has successfully loaded, render the child components. */
    return isLoaded && (<>
        <ShipList />
        <ShipInfo />
    </>);
}