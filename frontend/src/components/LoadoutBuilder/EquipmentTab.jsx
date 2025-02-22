// * frontend/src/components/LoadoutBuilder/EquipmentTab.jsx

// Local Module Imports
import EquipmentList from './Modules/EquipmentList';
import EquipmentInfo from './Modules/EquipmentInfo';
import './Styles/equipment.css';

/**
 * Abstraction layer that renders the "Equipment" tab in the Loadout Builder. Whether or not it is
 * loaded depends on if the `LoadoutBuilderMain` component is also loaded. This component renders
 * the {@linkcode EquipmentList} and {@linkcode EquipmentInfo} compoenents, in that order.
 * @component `EquipmentTab`
 * @requires {@linkcode EquipmentList}, {@linkcode EquipmentInfo}
 * @param {{ isLoaded: boolean }} 
 */
export default function EquipmentTab({ isLoaded }) {
    /** If the loadout builder has successfully loaded, render the child components. */
    return isLoaded && (<>
        <EquipmentList />
        <EquipmentInfo />
    </>);
}