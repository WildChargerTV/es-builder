// * frontend/src/components/LoadoutBuilder/ShipSelector.jsx

// Node Module Imports
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// Local Module Imports
import ShipList from './Modules/ShipList';
import ShipInfo from './Modules/ShipInfo';
import './Styles/ships.css';

/**
 * Abstraction layer that renders the "Ships" tab in the Loadout Builder. Whether or not it is
 * loaded depends on if the `LoadoutBuilderMain` component is also loaded. This component renders
 * the `ShipList` and `ShipInfo` compoenents, in that order.
 * @component `ShipsTab`
 * @param {{ isLoaded: boolean }} 
 * @returns {null | ReactElement}
 */
export default function ShipsTab({ isLoaded }) {
    // React Hooks
    const { shipId } = useSelector((state) => state.builder);

    /** Set the active ship to the one defined in the Redux store. */
    // TODO port this to ShipList
    useEffect(() => {
        if(!isLoaded) return;
        const currentActive = document.getElementsByClassName('active')[2];
        if(currentActive) currentActive.className = '';
        if(shipId !== null) document.getElementById(`builder-ship-${shipId}`).className = 'active';
    }, [shipId, isLoaded]);

    /** If the loadout builder has successfully loaded, render the child components. */
    return isLoaded && (<>
        <ShipList />
        <ShipInfo />
    </>)
}