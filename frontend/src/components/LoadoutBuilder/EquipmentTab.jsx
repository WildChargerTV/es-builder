// * frontend/src/components/LoadoutBuilder/EquipmentTab.jsx
// TODO docs

import EquipmentList from "./Modules/EquipmentList";
import EquipmentInfo from "./Modules/EquipmentInfo";

export default function EquipmentSelector({ isLoaded }) {
    return isLoaded && (<>
        <EquipmentList />
        <EquipmentInfo />
    </>);
}