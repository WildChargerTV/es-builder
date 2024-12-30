// * frontend/src/components/LoadoutBuilder/EquipmentTab.jsx
// TODO docs

import EquipmentList from './Modules/EquipmentList';
import EquipmentInfo from './Modules/EquipmentInfo';
import './Styles/equipment.css';

export default function EquipmentSelector({ isLoaded }) {
    return isLoaded && (<>
        <EquipmentList />
        <EquipmentInfo />
    </>);
}