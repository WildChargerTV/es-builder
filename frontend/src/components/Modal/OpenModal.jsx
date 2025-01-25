// * frontend/src/components/Modal/OpenModal.jsx

// Local Module Imports
import { useModal } from '../../context/Modal';

/**
 * Component that creates & returns an interactive element to open a Modal. See parameter details 
 * below.
 * @component OpenModal
 * @requires {@linkcode useModal}
 * @param {{ 
 *      element: 'button' | 'checkbox',
 *      elementText: string | ReactElement, 
 *      modalComponent: ReactElement, 
 *      disabled: boolean,
 *      onModalOpen?: function, 
 *      onModalClose?: function 
 * }} params This function has the following parameters:
 * - `element`: Name of the element to return. Defaults to `'button'`. Currently supports:
 * - - `'button'`: Returns a `<button>`.
 * - - `'listitem'`: Returns an `<li>`.
 * - `elementText`: Where applicable, the text to display inside the element. Also accepts
 *                  `react-icons`. Defaults to `'Open'`.
 * - `modalComponent`: An element or component to display within the opened Modal.
 * - `disabled`: _(Optional)_ (Button Only) A boolean determining if the Modal is disabled or not.
 *               Recommended to be a dynamic prop.
 * - `onModalOpen`: _(Optional)_ A function to be called whenever the Modal is _opened_.
 * - `onModalClose`: _(Optional)_ A function to be called whenever the Modal is _closed_.
 * @returns {ReactElement}
 */
export default function OpenModal({
    element = 'button',
    elementText = 'Open',
    modalComponent, 
    disabled=false,
    onModalOpen, 
    onModalClose
}) {
    // Bring in the Modal context.
    const { setModalContent, setOnModalClose } = useModal();

    // Create an onClick listener for the returned element.
    const onClick = () => {
        // If a closing function was provided, attach it here.
        if(onModalClose) setOnModalClose(onModalClose);
        // Set the modal content to the provided element/component.
        setModalContent(modalComponent);
        // If an opening function was provided, call it now.
        if(onModalOpen) onModalOpen();
    }

    // Return the element based on the provided type. 
    // Returns a button by default, with a console error.
    switch(element) {
        case 'button':
            return <button onClick={onClick} disabled={disabled}>{elementText}</button>;
        case 'checkbox':
            return (<label onClick={onClick} aria-hidden><input type='checkbox' onChange={onClick}/><h4>{elementText}</h4></label>);
        default:
            console.error('Please provide a valid element type!');
            return <button onClick={onClick} disabled={disabled}>{elementText}</button>;
    }
}