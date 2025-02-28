// * frontend/src/components/LoadoutBuilder/Modules/ShipInfo.jsx
// TODO revisit instructions, maybe dynamic based on mode

// Node Module Imports
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Local Module Imports
import shipData from '../../../data/ships';

/**
 * Renders information about the currently selected ship, or instructional data if no ship is
 * currently selected.
 * @component `ShipInfo`
 * @requires {@linkcode shipData}
 * @requires {@linkcode ShipInfoInstructions}
 */
export default function ShipInfo() {
    // React Hooks
    const { shipId } = useSelector((state) => state.builder);
    const [currShip, setCurrShip] = useState(null);

    /* Get the relevant data associated with the ship ID in the Redux store. */
    useEffect(() => {
        shipId === null 
        ? setCurrShip(null)
        : setCurrShip(shipData[shipId]);
    }, [shipId]);

    /* If no ship has yet been selected, return instructional data instead. */
    if(!currShip) 
        return <ShipInfoInstructions />;

    /* Return the ship's information. */
    return (<div id='builder-ship-info'>
        {/* Ship Name, Class, & Description */}
        <h2 id='ship-info-name'>{currShip.name}</h2>
        <h3 id='ship-info-class'>{currShip.class}</h3>
        <p id='ship-info-desc'>{currShip.description}</p>

        {/* Ship Stats */}
        {currShip?.stats && (<div id='ship-info-stats'>
            {Object.entries(currShip.stats).map(([statName, statVal]) => (
                <div key={statName.toLowerCase().split(' ').join('-')} className='ship-info-single-stat'>
                    <p>{statName}</p>
                    <p>{statVal}</p>
                </div>
            ))}
        </div>)}
    </div>);
}

/**
 * Sub-component of {@linkcode ShipInfo} that renders content for the component when no ship has
 * been selected yet.
 * 
 * This component should only be visible within Create mode, as View and Edit modes already have
 * a ship selected.
 * @component `ShipInfoInstructions`
 */
function ShipInfoInstructions() {
    return (<div id='builder-ship-info'>
        <h2 id='ship-info-name'>Select Ship</h2>
        <p id='ship-info-desc'>
            <span className='yellow'>Welcome to the Loadout Builder!</span> This is where all the
            magic happens. If you know your way around EVERSPACE™ already, this should (hopefully)
            be easy to navigate; but if not, these infoboxes will provide some instructions for
            you!
            <br /><br />
            To begin, select one of the four ships on the left to equip it to your loadout, and 
            it&apos;s information & stats will appear here. You are allowed to change your ship at 
            any time until the loadout is submitted, at which point it will no longer be editable.
            <br /><br />
            Once you&apos;ve chosen a ship, you&apos;ll be able to choose whether to start your
            loadout from scratch, or select one of the loadout presets provided to you by the game.
            Upon selecting your desired option, the Enhancements & Equipment tabs will become
            available!
            <br /><br />
            <span className='yellow'>Be advised:</span> Changing your ship at any point during 
            loadout creation will <span className='red'>reset</span> all of your currently selected
            equipment, so be careful!
        </p>
    </div>);
}
