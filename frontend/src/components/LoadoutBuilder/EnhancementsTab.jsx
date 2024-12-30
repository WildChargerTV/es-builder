// * frontend/src/components/LoadoutBuilder/EnhancementsTab.jsx
// TODO docs

import EnhancementInfoSelect from './Modules/EnhancementInfoSelect';
import EnhancementList from './Modules/EnhancementList';
import './Styles/enhancements.css';

export default function EnhancementsTab({ isLoaded }) {
    return isLoaded && (<>
        <EnhancementList />
        <EnhancementInfoSelect />
    </>);
}