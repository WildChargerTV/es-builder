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
 * @function useModal
 * @requires {@linkcode ModalContext}
 * @returns {() => useContext} The current value of the Modal context.
 * @example const { modalContent, setModalContent } = useModal();
 */
export const useModal = () => useContext(ModalContext); //eslint-disable-line react-refresh/only-export-components

/**
 * Provider for the Modal context. Applied in `frontend/src/main.jsx`. **Should not be used
 * anywhere else.**
 * @component ModalProvider
 * @requires {@linkcode ModalContext}
 * @param {{children: ReactElement}} children The children of the returned element. See `main.jsx`.
 * @returns {ReactElement} The elements to be rendered on the webpage.
 */
export function ModalProvider({ children }) {
    // React Hooks
    const modalRef = useRef(); // The ref to be attached to the Modal container <div>.
    // Local State Values
    const [modalClass, setModalClass] = useState(null); // The 
    const [modalContent, setModalContent] = useState(null); // The component rendered as Modal content.
    const [onModalClose, setOnModalClose] = useState(null); // The function that is called when the Modal is closing.

    /**
     * Handle the Modal closure by nulling the component in local state. If a closure function was
     * provided, call it here as well.
     */
    const closeModal = useCallback(() => {
        setModalContent(null);
        if(typeof onModalClose === 'function') {
            onModalClose();
            setOnModalClose(null);
        }
    }, [onModalClose]);

    /* Put the necessary components together as the contextValue. */
    const contextValue = useMemo(() => ({ 
        modalClass, modalContent, modalRef,
        closeModal, setModalClass, setModalContent, setOnModalClose }), 
    [modalClass, modalContent, closeModal]);

    /* Return the contents of the Modal provider. */
    return (<>
        <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
        <div ref={modalRef} />
    </>);
}

/**
 * Component to render a Modal on a webpage. Only one Modal can exist at a time. Applied in
 * `frontend/src/main.jsx`. **Should not be used anywhere else.**
 * @component Modal
 * @requires {@linkcode ModalContext}
 * @returns {ReactPortal} The rendered modal, as assigned by the `ModalProvider`.
 */
export function Modal() {
    // React Contexts
    const { modalClass, modalContent, modalRef, closeModal } = useContext(ModalContext);

    console.warn(modalClass);
    
    /* If modalRef is empty or no modalContent exists, render nothing. */
    if(!modalRef?.current || !modalContent) 
        return null;

    /**
     * Render the Modal.
     * ? ReactDOM.createPortal assigns the elements defined in the first argument to the <div>
     * ? assigned to `modalRef` (the one returned by `ModalProvider`).
     */
    return ReactDOM.createPortal(
        <div id='site-modal'>
            <button id='site-modal-background' onClick={closeModal} />
            <div id='site-modal-content' className={modalClass}>{modalContent}</div>
        </div>, 
        modalRef.current
    );
}
