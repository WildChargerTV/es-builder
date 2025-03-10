// * frontend/src/hooks/windowSize.jsx

// Node Module Imports
import { useLayoutEffect, useState } from 'react';

/**
 * React hook that retrieves the current window viewport size, in pixels. Dynamically updates as
 * the window size changes, allowing for an easy way to detect the current screen size in real
 * time.
 * @returns {[windowX: number, windowY: number]}
 */
export default function useWindowSize() {
    // Local State Values
    const [size, setSize] = useState([0, 0]);

    /* Use an event listener to retrieve the current window size. */
    useLayoutEffect(() => {
        const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    /* Return the retrieved window size. */
    return size;
}
