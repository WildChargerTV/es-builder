// * frontend/src/components/LoadoutBuilder/Modals/MessageModal.jsx

// Node Module Imports
import { PiMouseLeftClickFill } from 'react-icons/pi';
// Local Module Imports
import { useModal } from '../../../context/Modal';

function MessageModal({ title, message, confirmTxt, onConfirm, denyTxt, onDeny }) {
    return (<>
        <h2 className='modal-title'>{title}</h2>
        <p className='modal-paragraph'>{message}</p>
        <div className='modal-controls'>
            <button className='modal-button' onClick={onConfirm}>
                {confirmTxt} <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </button>
            {(denyTxt && onDeny) && <button className='modal-button' onClick={onDeny}>
                {denyTxt} <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </button>}
        </div>
    </>);
}

export function ModalWarnShipSwitch() {
    const { closeModal } = useModal();

    const message = 'You have unsaved equipment added to your loadout. Changing your ship selection will clear your equipment. Switch ships?';
    const onConfirm = (event) => {
        event.stopPropagation();
        closeModal();
        return true;
    }
    const onDeny = (event) => {
        event.stopPropagation();
        closeModal();
        return false;
    }

    return <MessageModal
        title='Warning'
        message={message}
        confirmTxt='Yes'
        onConfirm={onConfirm}
        denyTxt='No'
        onDeny={onDeny}
    />
}