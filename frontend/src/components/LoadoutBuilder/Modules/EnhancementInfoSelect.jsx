// * frontend/src/components/LoadoutBuilder/Modules/EnhancementInfoSelect.jsx
// TODO docs && clearer naming

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BucketImage from '../../Bucket/BucketImage';
import enhancementData from '../../../data/enhcancements';
import shipData from '../../../data/ships';
import { changeEnhancement, changePrimary } from '../../../store/builder';

export default function EnhancementInfoSelect() {
    return (<div id='builder-enhancement-info-select'>
        <EnhancementGroup />
        <EnhancementInfo />
    </div>);
}

function EnhancementInfo() {
    const currEnhancement = useSelector((state) => state.builder.enhancements.selected);
    const currData = currEnhancement !== null && enhancementData[currEnhancement];

    return currEnhancement !== null && (<div id='builder-selected-enhancement-info'>
        <h2>{currData.name}</h2>
        <p>{currData.effect_pos}</p>
        <p>{currData.effect_neg}</p>
        {currData.allowed_ships && 
        <p>Class Restriction: {currData.allowed_ships.map((id) => `${shipData[id].name} `)}</p>}
    </div>);
}

// ? Not DRY: this EnhancementGroup serves a different purpose, which is to hold the enhancements in state
function EnhancementGroup() {
    const dispatch = useDispatch();
    const { shipId, enhancements } = useSelector((state) => state.builder);
    const groupData = useMemo(() => []);

    for(let i in enhancements) {
        if(i === 'selected') continue;
        const id = enhancements[i];
        if(id === null) groupData.push({ i, id: null })
        else groupData.push({ i, id })
    }

    useEffect(() => {
        if(!groupData) return;
        for(let e of groupData) {
            if(!e.id) continue;
            const enhancement = enhancementData[e.id];
            if(enhancement.allowed_ships && (shipId === null || enhancement.allowed_ships.indexOf(shipId) === -1))
                dispatch(changeEnhancement(e.i, null));
        }
    }, [dispatch, groupData, shipId]);

    return (<div id='builder-selected-enhancements' className='builder-enhancement-list__group-container'>
        <p className='builder-enhancement-list__group-title' style={{textAlign: 'center'}}>Selected</p>
        <div className='builder-enhancement-list__group'>
            {groupData.map((enhance) => <SingleEnhancement key={enhance.i} id={enhance.id} />)}
        </div>
    </div>);
}

function SingleEnhancement({ id }) {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.builder);
    const enhancement = id !== null && enhancementData[id]
    
    const onClick = (event) => {
        event.stopPropagation();
        const btnList = event.target.parentElement.childNodes
        for(const i of btnList.keys())
            if(btnList[i] === event.target) {
                if(mode === 'view')
                    dispatch(changeEnhancement('selected', id));
                else {
                    dispatch(changeEnhancement(i, null));
                    dispatch(changeEnhancement('selected', null));
                }
            }
        
        if(id === 2)
            dispatch(changePrimary(0, null, null));
    }

    return <button className='builder-enhancement-list__single selected' onClick={onClick} disabled={id === null}>
        {id !== null && <BucketImage dir={enhancement.icon} />}
    </button>
}