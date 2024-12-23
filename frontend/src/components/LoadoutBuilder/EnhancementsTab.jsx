// * frontend/src/components/LoadoutBuilder/EnhancementsTab.jsx
// TODO docs

import EnhancementInfoSelect from './Modules/EnhancementInfoSelect';
import EnhancementList from './Modules/EnhancementList';

export default function EnhancementsTab({ isLoaded }) {
    
    return isLoaded && (<>
        <EnhancementList />
        <EnhancementInfoSelect />
    </>);
}