// * frontend/src/components/Loadouts/Recents.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadoutList from './LoadoutList';
import { getRecentLoadouts } from '../../store/loadout';
import './Recents.css';


export default function RecentLoadouts() {
    const dispatch = useDispatch();
    const { recentLoadouts } = useSelector((state) => state.loadout);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getRecentLoadouts());
    }, [dispatch]);

    useEffect(() => {
        setIsLoaded(!recentLoadouts.list || recentLoadouts.list.length > 0);
    }, [isLoaded, recentLoadouts]);

    return (isLoaded && recentLoadouts.list) && (<main id='site-recent-loadouts-container'>
        <div id='site-recent-loadouts'>
            <h1>Recent Loadouts</h1>
            <LoadoutList idName='recent-loadouts-list' listArr={recentLoadouts.list} />
        </div>
    </main>);
}

