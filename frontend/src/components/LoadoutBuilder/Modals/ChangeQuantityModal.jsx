// * frontend/src/components/LoadoutBuilder/Modals/ChangeQuantityModal.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { PiMouseLeftClickFill } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
// Local Module Imports
import { useModal } from '../../../context/Modal';
import { secondaryWeaponData, consumableData } from '../../../data';
import { updateSecondary, updateConsumable } from '../../../store/builder';

/**
 * Modal to change the quantity of a **Secondary Weapon or Consumable**. Consists of a form with a
 * single number `input` field. The form *cannot be submitted* if the value is less than 0, or
 * greater than the maximum possible stack size.
 * @component `ChangeQuantityModal`
 * @requires {@linkcode useModal} 
 * @requires {@linkcode secondaryWeaponData} {@linkcode consumableData}
 * @requires {@linkcode updateSecondary} {@linkcode updateConsumable}
 * @param {{ data: {
 *      type: 'Secondary' | 'Consumables',
 *      id: string,
 *      index: number
 * }}} data Data passed in from the parent.
 * @returns {ReactElement}
 */
export default function ChangeQuantityModal({ data }) {
    // Deconstructed Data
    const { type, equipId, currQuantity, index } = data;
    // React Hooks
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // Local State Values
    const [disabled, setDisabled] = useState(false);
    const [formQuantity, setFormQuantity] = useState(currQuantity);

    /** On form submission, change the quantity of the respective equipment & close the modal. */
    const onSubmit = (event) => {
        event.preventDefault();
        (type === 'Secondary')
        ? dispatch(updateSecondary(index, equipId, formQuantity))
        : dispatch(updateConsumable(index, equipId, formQuantity));
        closeModal();
    }

    /** If the quantity number in the form is either negative or greater than the max stack size,
        disable the submit button. */
    useEffect(() => {
        const maxQuantity = (type === 'Secondary')
        ? secondaryWeaponData[equipId].stack_size
        : consumableData[equipId].stack_size;
        setDisabled((formQuantity < 1) || (formQuantity > maxQuantity));
    }, [formQuantity, equipId, type]);

    /** Return the modal content. */
    return (<>
        {/* Modal Title */}
        <h2 className='modal-title'>Change Quantity</h2>

        {/* Quantity Form */}
        <form className='modal-form' onSubmit={onSubmit}>
            {/* Quantity Number Input */}
            <input
                type='number'
                placeholder='Quantity'
                value={formQuantity}
                onChange={(e) => setFormQuantity(e.target.value)}
                required
            />

            {/* Submit Button - disabled unless specific requirements are met */}
            <button type='submit' disabled={disabled}>
                Confirm <span className='site-text-icon'><PiMouseLeftClickFill /></span>
            </button>
        </form>
    </>);
}