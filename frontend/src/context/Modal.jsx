// * frontend/src/context/Modal.jsx

// Node Module Imports
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
// Local Module Imports
import './Modal.css';

/**
 * React context to render modal pop-ups on the screen.
 * @type {React.Context}
 */
const ModalContext = createContext();

/**
 * Invokes the Modal context for application in other components.
 * 
 * A Modal is a `<div>` element which acts as the container for the following two elements:
 * 1. `modal-background`: A fullscreen "background" `<button>` that is designed to close the Modal
 *                        when clicked.
 * 2. `modal-content`: A `<div>` containing passed-in content for the Modal to display.
 * @requires {@linkcode ModalContext}
 * @returns {any} The current value of the Modal context.
 * @example const { modalContent, setModalContent } = useModal();
 */
export const useModal = () => useContext(ModalContext);

/**
 * Provider for the Modal context. Applied in `frontend/src/main.jsx`. **Should not be used
 * anywhere else.**
 * @requires {@linkcode ModalContext}
 * @param {{children: ReactElement}} children The children of the returned element. See `main.jsx`.
 * @returns {ReactElement} The elements to be rendered on the webpage.
 */
export function ModalProvider({ children }) {
    // Refers to the Modal container <div>.
    // ? Remember that a ref acts like an unrendered store that is persistent across re-renders.
    const modalRef = useRef();
    // Refers to the component rendered as Modal content.
    const [modalContent, setModalContent] = useState(null);
    // Refers to the function that is called when the Modal is closing.
    const [onModalClose, setOnModalClose] = useState(null);
    // Handles the Modal closure. 
    const closeModal = useCallback(() => {
        setModalContent(null);
        if(typeof onModalClose === 'function') {
            onModalClose();
            setOnModalClose(null);
        }
    }, [onModalClose]);

    // Put the necessary components together as the contextValue.
    const contextValue = useMemo(() => ({ modalRef, modalContent, setModalContent, setOnModalClose, closeModal }), [modalContent, closeModal]);

    // Return the contents of the Modal provider.
    return (<>
        <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
        <div ref={modalRef} />
    </>);
}

/**
 * Component to render a Modal on a webpage. Only one Modal can exist at a time. Applied in
 * `frontend/src/main.jsx`. **Should not be used anywhere else.**
 * @requires {@linkcode ModalContext}
 * @returns {ReactPortal} The rendered modal, as assigned by the `ModalProvider`.
 */
export function Modal() {
    // Extract the necessary components from the context.
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);
    
    // If modalRef is empty or no modalContent exists, render nothing.
    if(!modalRef?.current || !modalContent) return null;

    // Render the Modal.
    // ? ReactDOM.createPortal assigns the elements defined in the first argument to the <div>
    // ? assigned to modalRef (the one returned by ModalProvider).
    return ReactDOM.createPortal(
        <div id='site-modal'>
            <button id='site-modal-background' onClick={closeModal} />
            <div id='site-modal-content'>{modalContent}</div>
        </div>, 
        modalRef.current
    );
}
