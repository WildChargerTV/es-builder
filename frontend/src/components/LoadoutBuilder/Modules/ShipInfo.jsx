// * frontend/src/components/LoadoutBuilder/Modules/ShipSelectorInfo.jsx
// TODO docs

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import shipData from '../../../data/ships';

export default function ShipInfo() {
    const { shipId } = useSelector((state) => state.builder);
    const [currShip, setCurrShip] = useState(null);

    useEffect(() => {
        if(shipId === null) return;

        setCurrShip(shipData[shipId]);
    }, [shipId]);

    if(!currShip) return (<div id='builder-ship-info'>
        <h2>Select Your Ship</h2>
        <p>You will not be able to change this once your loadout has been submitted.</p>
        <h2>Note For Testers</h2>
        <p>
            Due to time constraints, ESBuilder currently ignores any aspect of player 
            progression. This extends to ship perks, so assume that the ship is fully upgraded
            in this regard.
        </p>
    </div>);

    return (<div id='builder-ship-info'>
        <h2>{currShip.name}</h2>
        <p>{currShip.description}</p>
    </div>);

}

