// * frontend/src/components/LoadoutBuilder/Modules/EnhancementGroup.jsx
// TODO docs

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BucketImage from '../../Bucket/BucketImage';
import enhancementData from '../../../data/enhcancements';
import { changeEnhancement } from '../../../store/builder';

const CATEGORIES = [
    'Navigation', 'Damage and Repair', 'Defense', 'Devices', 
    'Sensors', 'Crafting', 'Weapons', 'Movement', 'Energy' 
];

export default function EnhancementList() {
    return (<div id='builder-enhancement-list'>
        {CATEGORIES.map((catName) => <EnhancementGroup key={CATEGORIES.indexOf(catName)} category={catName} />)}
    </div>);
}

function EnhancementGroup({ category }) {
    const res = enhancementData.filter((enhancement) => enhancement.category === category);
    return (<div id={`builder-enhancements-${CATEGORIES.indexOf(category)}`} className='builder-enhancement-list__group-container'>
        <p className='builder-enhancement-list__group-title'>{category}</p>
        <div className='builder-enhancement-list__group'>
            {res.map((enhancement) => <SingleEnhancement key={enhancement.id} data={enhancement} />)}
        </div>
    </div>);
}

function SingleEnhancement({ data }) {
    const dispatch = useDispatch();
    const { mode, shipId, enhancements } = useSelector((state) => state.builder);

    const onClick = (event) => {
        event.stopPropagation();
        dispatch(changeEnhancement('selected', data.id));
        if(!enhancements[0]) dispatch(changeEnhancement(0, data.id));
        else if(!enhancements[1]) dispatch(changeEnhancement(1, data.id));
        else if(!enhancements[2]) dispatch(changeEnhancement(2, data.id));
    }

    const disabled = () => {
        if(mode === 'view') return true;
        for(let i in enhancements) {
            if(i === 'selected') continue;
            if(enhancements[i] === data.id) return true;
        }
        return (data.allowed_ships && (!shipId || data.allowed_ships.indexOf(shipId) === -1))
    }

    /** Force a re-render when the current ship changes. Mainly refreshes button disabled status. */
    useEffect(() => {}, [shipId]);
    
    return <button className='builder-enhancement-list__single' onClick={onClick} disabled={disabled()}>
        <BucketImage dir={data.icon} />
    </button>
}