// * frontend/src/components/LoadoutBuilder/ShipSelector.jsx

// Local Module Imports
import ShipList from './Modules/ShipList';
import ShipInfo from './Modules/ShipInfo';
import './Styles/ships.css';

/**
 * Abstraction layer that renders the "Ships" tab in the Loadout Builder. Whether or not it is
 * loaded depends on if the `LoadoutBuilderMain` component is also loaded. This component renders
 * the {@linkcode ShipList} and {@linkcode ShipInfo} components, in that order.
 * @component `ShipsTab`
 * @requires {@linkcode ShipList}, {@linkcode ShipInfo}
 * @param {{ isLoaded: boolean }} props
 */
export default function ShipsTab({ isLoaded }) {
    /* If the loadout builder has successfully loaded, render the child components. */
    return isLoaded && (<>
        <ShipList />
        <ShipInfo />
    </>);
}