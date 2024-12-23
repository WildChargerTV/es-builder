

import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { deleteLoadout, getRecentLoadouts } from '../../../store/loadout';

export default function ConfirmLoadoutDeleteModal({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const onConfirm = (event) => {
        event.stopPropagation();
        dispatch(deleteLoadout(id))
        .then(dispatch(getRecentLoadouts()))
            .then(closeModal());
    }

    return (<>
        <h2 className='modal-title'>Confirm Deletion</h2>
        <p className='modal-paragraph'>Are you sue you want to delete the loadout? This action cannot be undone.</p>
        <div className='modal-controls'>
            <button className='modal-button' onClick={onConfirm}>
                Confirm <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </button>
            <button className='modal-button' onClick={closeModal}>
                Cancel <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </button>
        </div>
    </>);
}