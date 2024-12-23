// * frontend/src/components/LoadoutBuilder/ShipSelector.jsx
// TODO docs

// Node Module Imports
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// Local Module Imports
import ShipList from './Modules/ShipList';
import ShipInfo from './Modules/ShipInfo';
import './Styles/ships.css';

export default function ShipSelector({ isLoaded }) {
    // React Hooks
    const { shipId } = useSelector((state) => state.builder);

    /** Set the active ship to the one defined in the Redux store. */
    useEffect(() => {
        if(!isLoaded) return;
        const currentActive = document.getElementsByClassName('active')[2];
        if(currentActive) currentActive.className = '';
        if(shipId !== null) document.getElementById(`builder-ship-${shipId}`).className = 'active';
    }, [shipId, isLoaded]);

    
    return isLoaded && (<>
        <ShipList />
        <ShipInfo />
    </>)
}