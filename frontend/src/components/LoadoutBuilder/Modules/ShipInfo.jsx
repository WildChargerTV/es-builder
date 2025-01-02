// * frontend/src/components/LoadoutBuilder/Modules/ShipInfo.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
// Local Module Imports
import shipData from '../../../data/ships';

/**
 * Renders information about the currently selected ship, or instructional data if no ship is
 * currently selected.
 * @component `ShipInfo`
 * @requires {@linkcode shipData}
 * @returns {ReactElement}
 */
export default function ShipInfo() {
    // React Hooks
    const { ref, fontSize } = useFitText();
    const { shipId } = useSelector((state) => state.builder);
    const [currShip, setCurrShip] = useState(null);

    /** Get the relevant data associated with the ship ID in the Redux store. */
    useEffect(() => {
        shipId === null 
        ? setCurrShip(null)
        : setCurrShip(shipData[shipId]);
    }, [shipId]);

    /**
     * If no ship is currently selected, return some instructions for users & testers.
     * ? This returns separately for code readability, as using a ternary operator in this scenario
     * ? may look rather confusing.
     */
    if(!currShip) return (<div id='builder-ship-info'>
        <h2 id='ship-info-name' style={{ fontSize }}>Select Your Ship</h2>
        <p id='ship-info-desc' style={{ fontSize: `calc(${fontSize} * 0.55)` }}>
            You will not be able to change ships once your loadout has been submitted.<br />
            <span className='red'>WARNING:</span> Changing your ship at any point during loadout
            creation will reset all of your currently selected equipment!
            <br /><br />
            <span className='yellow'>Notes for Testers: </span>
            ESBuilder currently ignores any aspect of player progression, as it is currently 
            considered out-of-scope. Until further notice, assume that you have the Encounters DLC,
            and that you have unlocked all possible preset loadouts & maximized all perks on all
            ships.
            <br /><br />
            It is currently a known issue that ship & equipment stats only display as numbers, and 
            do not have any units of measurement alongside them. Currently, the intent is that on
            release, applicable ship stats will be influenced by installed equipment, and equipment
            stats will be influenced by installed mods. Creating these interactions will take a LOT
            of time, and is being saved for later in favor of fleshing out core functionality.
            <br /><br />
            Please feel free to report any other issues you may encounter with the Loadout Builder.
        </p>
    </div>);

    /** Return the ship information. */
    return (<div id='builder-ship-info' ref={ref}>
        {/* Ship Name, Class, & Description */}
        <h2 id='ship-info-name' style={{ fontSize }}>{currShip.name}</h2>
        <h3 id='ship-info-class' style={{ fontSize: `calc(${fontSize} * 0.75)` }}>{currShip.class}</h3>
        <p id='ship-info-desc' style={{ fontSize: `calc(${fontSize} * 0.55)` }}>{currShip.description}</p>
        {/* Ship Stats */}
        {currShip?.stats && (<div id='ship-info-stats'>
            {Object.entries(currShip.stats).map(([statName, statVal]) => (
                <div key={statName.toLowerCase().split(' ').join('-')} className='ship-info-single-stat' style={{ fontSize: `calc(${fontSize} * 0.5)` }}>
                    <p>{statName}</p>
                    <p>{statVal}</p>
                </div>
            ))}
        </div>)}
    </div>);

}

