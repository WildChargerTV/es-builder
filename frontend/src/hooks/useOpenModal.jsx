// * frontend/src/hooks/useOpenModal.jsx

// Local Module Imports
import { useModal } from '../context/Modal';

/**
 * React hook that provides the function version of the `OpenModal` component, allowing for the
 * creation of a modal outside of JSX element flow.
 */
export default function useOpenModal() {
    // React Hooks
    const { 
        modalContent, closeModal, setModalContent, setModalId, setOnModalClose 
    } = useModal();
    
    /**
     * Opens a new modal given its content component. Modals can optionally be given an ID string,
     * as well as functions that are called when it opens & closes.
     * @param {React.JSX.Element} modalComponent 
     * @param {string} [modalId]
     * @param {Function} [onModalOpen]
     * @param {Function} [onModalClose]
     */
    return function(modalComponent, modalId, onModalOpen, onModalClose) {
        if(modalContent) 
            closeModal();

        if(onModalClose) setOnModalClose(onModalClose);
        if(modalId) setModalId(modalId);
        setModalContent(modalComponent);
        if(onModalOpen) onModalOpen();
    };
}
