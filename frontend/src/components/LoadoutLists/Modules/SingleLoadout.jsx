// * frontend/src/components/LoadoutLists/Modules/SingleLoadout.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Local Module Imports
import SingleLoadoutEquipList from './SingleLoadoutEquipList';
import ConfirmLoadoutDeleteModal from '../Modals/DeleteLoadoutModal';
import { enhancementData, shipData } from '../../../data';
import { setActiveLoadoutId } from '../../../store/loadout';
import BucketImage from '../../../utils/BucketImage';
import OpenModal from '../../../utils/OpenModal';

/**
 * Sub-component of {@linkcode LoadoutList} that renders a single loadout onto the screen. Given
 * passed-in loadout data, this component will display a summary of the loadout's core components,
 * including its name, ship, enhancements, equipment, & creator. 
 * 
 * The user that owns the Loadout will automatically be provided with the options to edit or delete
 * it. These buttons appear as clickable icons underneath the loadout's creation/modification date.
 * @component `SingleLoadout`
 * @requires {@linkcode shipData} {@linkcode enhancementData} 
 * @param {{ loadoutData: object }} 
 * @returns {ReactElement}
 */
export default function SingleLoadout({ loadoutData }) {
    // Deconstructed Props
    const { id, name, shipId, enhancements, User } = loadoutData;
    // React Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    // Local State Values
    const [showCtrls, setShowCtrls] = useState(false);

    /* Get the data of the loadout's selected ship. */
    const currShip = shipData[shipId];

    /* Convert the loadout's creation & modification dates to Date objects. */
    const [createdAt, updatedAt] = [new Date(loadoutData.createdAt), new Date(loadoutData.updatedAt)];

    /* If the Edit button is clicked, initialize the Loadout Builder in edit mode. */
    const editLoadout = (event) => {
        event.stopPropagation();
        dispatch(setActiveLoadoutId(id));
        navigate(`/loadouts/${id}/edit`);
    };

    /* If the loadout is clicked, initialize the Loadout Builder in view mode. */
    const viewLoadout = (event) => {
        event.stopPropagation();
        if(event.target.localName === 'div') {
            dispatch(setActiveLoadoutId(id));
            navigate(`/loadouts/${id}`);
        }
    };

    /* Determine whether or not to show the Edit & Delete Buttons. */
    useEffect(() => {
        setShowCtrls(sessionUser !== null && sessionUser.id === User.id);
    }, [sessionUser, User.id]);

    /* Return the contents of the loadout list. */
    return (<div className='site-single-loadout' onClick={viewLoadout} aria-hidden>
        {/* Loadout Info: Name, Ship, Enhancements */}
        <div className='single-loadout-info'>
            <h2>{name}</h2>
            <div className='single-loadout-info__ship'>
                <BucketImage dir={`/ships/ship${shipId}-icon.png`} />
                {currShip.name}
            </div>
            <div className='single-loadout-info__enhancements'>
                {Object.values(enhancements).map((id) => <BucketImage 
                        key={id || crypto.randomUUID()} 
                        dir={(id !== null && id >= 0) ? enhancementData[id].icon : '/empty'} 
                    />
                )}
            </div>
        </div>

        {/* Loadout Equipment */}
        <SingleLoadoutEquipList loadoutData={loadoutData} />

        {/* Loadout Owner Info: Link to User Page, Create/Change Dates, Edit/Delete Buttons */}
        <div className='single-loadout-owner'>
            <Link to={`/users/${User.id}/loadouts`}>{User.username}</Link>
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
