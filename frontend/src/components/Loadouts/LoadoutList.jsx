

import { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmLoadoutDeleteModal from './Modals/DeleteLoadoutModal';
import BucketImage from '../Bucket/BucketImage';
import OpenModal from '../Modal/OpenModal';
import { shipData } from '../../data';
import { updateActiveId } from '../../store/loadout';
import './LoadoutList.css';

export default function LoadoutList({ idName, listArr }) {

    return (<div className='site-loadout-list' id={idName}>
        {listArr.map((loadout) => <SingleLoadout key={loadout.id} data={loadout} />)}
    </div>);

}

function SingleLoadout({ data }) {
    const { id, name, shipId, User } = data;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const [showCtrls, setShowCtrls] = useState(false);
    const currShip = shipData[shipId];

    const createdAt = new Date(data.createdAt);
    const updatedAt = new Date(data.updatedAt);

    const editLoadout = (event) => {
        event.stopPropagation();
        dispatch(updateActiveId(id));
        navigate(`/loadouts/${id}/edit`);
    };
    const viewLoadout = (event) => {
        event.stopPropagation();
        if(event.target.localName === 'div') {
            dispatch(updateActiveId(id));
            navigate(`/loadouts/${id}`);
        }
    };

    useEffect(() => {
        setShowCtrls(sessionUser !== null && sessionUser.id === User.id);
    }, [sessionUser, User.id]);

    return (<div className='site-single-loadout' onClick={viewLoadout} aria-hidden>
        <div className='single-loadout-info'>
            <h2>{name}</h2>
            <div className='single-loadout-info__ship'>
                <BucketImage dir={`/ships/ship${shipId}-icon.png`} />
                {currShip.name}
            </div>
            
        </div>
        <div className='single-loadout-grid'>
            
        </div>
        <div className='single-loadout-owner'>
            <Link to={`/users/${User.id}`}>{User.username}</Link>
            <p>Created {createdAt.toLocaleDateString('en-US')}</p>
            {(createdAt.valueOf() !== updatedAt.valueOf()) && <p>Modified {updatedAt.toLocaleDateString('en-US')}</p>}
            {showCtrls && <div className='single-loadout-owner__ctrls'>
                <button onClick={editLoadout}><FaPencilAlt /></button>
                <OpenModal
                    elementText={<FaTrashAlt />}
                    modalComponent={<ConfirmLoadoutDeleteModal id={id} />}
                />
            </div>}
        </div>
    </div>);
}