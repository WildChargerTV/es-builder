// * frontend/src/components/Bucket/BucketImage.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import { retrieveAsset } from '../../store/aws';

export default function BucketImage({ dir }) {
    // React Hooks
    const dispatch = useDispatch();
    const bucket = useSelector((state) => state.aws);
    // Local State Values
    const [url, setUrl] = useState('');

    /** If the image exists in the bucket, grab it. Otherwise request from the bucket. */
    useEffect(() => {
        if(!bucket[dir]) 
            dispatch(retrieveAsset(dir));
        else if(bucket[dir] && !bucket[dir].url) 
            return;
        else 
            setUrl(bucket[dir].url);
    }, [dispatch, bucket, dir]);
    
    // Return the image.
    return <img src={url} alt={`bucketimage-${dir}`} />;
}