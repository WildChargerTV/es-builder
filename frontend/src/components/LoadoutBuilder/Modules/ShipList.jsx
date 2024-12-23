// * frontend/src/components/LoadoutBuilder/Modules/ShipSelectorGrid.jsx
// TODO documentation

import { useDispatch, useSelector } from 'react-redux';
import { ModalWarnShipSwitch } from '../Modals/MessageModal';
import BucketImage from '../../Bucket/BucketImage';
import { shipData } from '../../../data';
import { changeShip, changeShipPreset, resetSlice } from '../../../store/builder';

export default function ShipList() {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.builder);

    /** When one of the ships is clicked, make that ship the current selection. */
    const onClick = (event) => {
        event.stopPropagation();
        if(mode !== 'create') return;
        const currentActive = document.getElementsByClassName('active')[2];
        if(currentActive === event.target) return;

        const btnNum = Number(event.target.id.split('-')[2]);
        dispatch(changeShip(btnNum));
        dispatch(changeShipPreset('reset'));
        dispatch(resetSlice('primaryWeapons'));
        dispatch(resetSlice('secondaryWeapons'));
        dispatch(resetSlice('devices'));
        dispatch(resetSlice('consumables'));
    }



    // TODO consolidate this eventually into maybe a map function?
    // TODO make title larger than class
    return (<div id='builder-ship-grid'>
        <button id='builder-ship-0' onClick={onClick} disabled={mode !== 'create'}>
            <BucketImage dir='/ships/ship0-top.png' />
            <p>
                Colonial Interceptor<br />
                Medium Fighter Class
            </p>
        </button>
        <button id='builder-ship-1' onClick={onClick} disabled={mode !== 'create'}>
            <BucketImage dir='/ships/ship1-top.png' />
            <p>
                Colonial Scout<br />
                Light Fighter Class
            </p>
        </button>
        <button id='builder-ship-2' onClick={onClick} disabled={mode !== 'create'}>
            <BucketImage dir='/ships/ship2-top.png' />
            <p>
                Colonial Gunship<br />
                Heavy Fighter Class
            </p>
        </button>
        <button id='builder-ship-3' onClick={onClick} disabled={mode !== 'create'}>
            <BucketImage dir='/ships/ship3-top.png' />
            <p>
                Colonial Sentinel<br />
                Medium Fighter Class
            </p>
        </button>
    </div>)
}