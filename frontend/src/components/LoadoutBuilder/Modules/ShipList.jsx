// * frontend/src/components/LoadoutBuilder/Modules/ShipList.jsx

// Node Module Imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFitText from 'use-fit-text';
// Local Module Imports
import shipData from '../../../data/ships';
import { updateShip } from '../../../store/builder';
import BucketImage from '../../../utils/BucketImage';

/**
 * Renders a 2x2 grid of buttons, allowing the user to select one of EVERSPACE's four available
 * ships.
 * @component `ShipList`
 * @requires {@linkcode shipData}, {@linkcode updateShip}
 * @requires {@linkcode BucketImage}
 */
export default function ShipList() {
    // React Hooks
    const dispatch = useDispatch();
    const { ref, fontSize } = useFitText();
    const { mode, shipId } = useSelector((state) => state.builder);

    /** 
     * When one of the inactive ships is clicked, change the ID in the Redux store. 
     * ? The Redux store will clear all equipment data alongside this change.
     * TODO verify that this clears focused equipment data as well
     */
    const onClick = (event) => {
        const currId = Number(event.target.id.split('-')[2]);
        currId !== shipId && dispatch(updateShip(currId));
    }

    /* Set the active ship to the one defined in the Redux store. */
    useEffect(() => {
        for(const btn of Object.values(document.getElementById('builder-ship-select').children)) {
            const currId = Number(btn.id.split('-')[2]);
            btn.className = currId === shipId ? 'ship-active' : '';
        }
    }, [shipId]);

    /* Return the button grid. */
    return (<div id='builder-ship-select'>
        {Object.values(shipData).map((ship) => (
            <button key={`ship-${ship.id}`} id={`builder-ship-${ship.id}`} ref={ref} onClick={onClick} disabled={mode !== 'create'}>
                {/* Ship Name */}
                <h2 className='builder-ship-name' style={{fontSize}} >{ship.name}</h2>

                {/* Ship Graphic - Contains Top & Front Views */}
                <div className='builder-ship-graphic'>
                    <BucketImage dir={`/ships/ship${ship.id}-top.png`} />
                    <BucketImage dir={`/ships/ship${ship.id}-front.png`} />
                </div>

                {/* Ship Class Name */}
                <h3 className='builder-ship-class' style={{fontSize: `calc(${fontSize} * 0.66)`}} >{ship.class}</h3>
            </button>
        ))}
    </div>);
}
