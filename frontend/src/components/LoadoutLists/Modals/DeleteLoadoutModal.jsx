// * frontend/src/components/Loadouts/Modals/DeleteLoadoutModal.jsx

// Node Module Imports
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import { useModal } from '../../../context/Modal';
import { deleteLoadout, getRecentLoadouts, getUserLoadouts } from '../../../store/loadout';

/**
 * Renders a modal that prompts the user to confirm whether or not they want to delete one of their
 * currently owned loadouts. The button that opens this modal only appears if the user owns the
 * loadout in question, so no safeguards should be required here.
 * @component `ConfirmLoadoutDeleteModal`
 * @param {{ id: number }}
 * @returns {ReactElement}
 */
export default function ConfirmLoadoutDeleteModal({ id }) {
    // React Hooks
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const { activeUser } = useSelector((state) => state.user);

    /** 
     * When the Confirm button is clicked, delete the loadout, refresh the appropriate Redux 
     * states, and close the Modal.
     */
    const onConfirm = (event) => {
        event.stopPropagation();
        dispatch(deleteLoadout(id))
        .then(dispatch(getRecentLoadouts()))
        .then(() => { if(activeUser.id) dispatch(getUserLoadouts(activeUser.id)); })
            .then(closeModal());
    }

    /** Return the Modal content. */
    return (<>
        {/* Modal Title */}
        <h2 className='modal-title'>Confirm Deletion</h2>

        {/* Modal Infotext */}
        <p className='modal-paragraph'>Are you sue you want to delete the loadout? This action cannot be undone.</p>

        {/* Modal Controls (Cancel, Confirm) */}
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