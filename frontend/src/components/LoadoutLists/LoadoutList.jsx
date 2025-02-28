// * frontend/src/components/Loadouts/LoadoutList.jsx

// Local Module Imports
import SingleLoadout from './Modules/SingleLoadout';
import './LoadoutList.css';

/**
 * Renders a list of existing loadouts. Able to continue indefinitely within reason. The primary
 * use of this component is to render data passed into it, which means that it must be set up as
 * the child component to a component that actually performs the query.
 * 
 * This component accepts an `idName` which will be applied to the `<div>` that contains the list.
 * The list of loadouts must be passed in as an array. This data is then mapped and passed into
 * {@linkcode SingleLoadout} components (see its documentation for more details).
 * @component `LoadoutList`
 * @requires {@linkcode SingleLoadout}
 * @param {{ idName: string, listArr: object[] }} 
 * @returns {ReactElement}
 */
export default function LoadoutList({ idName, listArr }) {
    /* Render the Loadout List. */
    return (<div className='site-loadout-list' id={idName}>
        {listArr.map((loadout) => <SingleLoadout key={loadout.id} loadoutData={loadout} />)}
    </div>);
}
