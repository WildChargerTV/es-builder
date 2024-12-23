

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';

export default function SelectEquipModal({ currEquip }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const modal = document.getElementById('site-modal-content');
        modal.className = 'item-select-menu';
    }, []);

    return (<>
        <h2 className='modal-title'>Select Item</h2>
    </>);
}