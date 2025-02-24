// * frontend/src/context/Modal.jsx

// Node Module Imports
import * as React from 'react';
import ReactDOM from 'react-dom';
// Local Module Imports
import useWindowSize from '../hooks/useWindowSize';
import './Modal.css';

/**
 * React context to render modal pop-ups on the screen.
 */
const ModalContext = React.createContext();

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
export const useModal = () => React.useContext(ModalContext); //eslint-disable-line react-refresh/only-export-components

/**
 * Provider for the Modal context. Applied in `frontend/src/main.jsx`. **Should not be used
 * anywhere else.**
 * @component `ModalProvider`
 * @requires {@linkcode ModalContext}
 * @param {{children: React.JSX.Element}} children
 */
export function ModalProvider({ children }) {
    // React Hooks
    const modalRef = React.useRef();
    const [screenX] = useWindowSize();
    // Local State Values
    // ? Optional: An ID name to be passed to the Modal's content `<div>`.
    const [modalId, setModalId] = React.useState(null);
    // ? Required: A component providing the inner content of the Modal.
    const [modalContent, setModalContent] = React.useState(null);
    // ? Optional: A function to call when the Modal closes.
    const [onModalClose, setOnModalClose] = React.useState(null);

    /**
     * Handle the Modal closure by nulling the component in local state. If a closure function was
     * provided, call it here as well.
     */
    const closeModal = React.useCallback(() => {
        setModalContent(null);
        if(typeof onModalClose === 'function') {
            onModalClose();
            setOnModalClose(null);
        }
    }, [onModalClose]);

    /** 
     * Force-close the Modal if the viewport width goes below the minimum threshold. 
     * ? This should be considered a "controlled crash" that bypasses any Modal closure functions.
     */
    React.useEffect(() => {
        if(modalContent !== null && screenX < 720)
            setModalContent(null);
    }, [modalContent, screenX]);

    /* Put the necessary components together as the `contextValue`. */
    const contextValue = React.useMemo(() => ({ 
        modalContent, modalId, modalRef,
        closeModal, setModalContent, setModalId, setOnModalClose }), 
    [modalContent, modalId, closeModal]);

    /* Return the contents of the Modal provider. */
    return (<>
        <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
        <div ref={modalRef} />
    </>);
}

/**
 * Component to render a Modal on a webpage. Only one Modal can exist at a time. Applied in
 * `frontend/src/main.jsx`. **Should not be used anywhere else.**
 * @component `Modal`
 * @requires {@linkcode ModalContext}
 * @returns {ReactPortal} The rendered modal, as assigned by the `ModalProvider`.
 */
export function Modal() {
    // React Contexts
    const { modalContent, modalId, modalRef, closeModal } = React.useContext(ModalContext);
    
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
            <div id={modalId} className='site-modal-content'>{modalContent}</div>
        </div>, 
        modalRef.current
    );
}
