// * frontend/src/utils/BucketImage.jsx

// Node Module Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Module Imports
import { retrieveAsset } from '../store/aws';

/**
 * Utility component that renders an image fetched from the AWS S3 bucket. This image will not have
 * any built-in CSS.
 * 
 * An image element will be returned regardless of whether or not the image exists in the bucket.
 * If the image does not exist, error handling should occur in the Redux state fetch, handled in
 * the {@linkcode retrieveAsset} function.
 * @component `BucketImage`
 * @requires {@linkcode retrieveAsset}
 * @param {{dir: string}}  
 * @returns {ReactElement}
 */
export default function BucketImage({ dir }) {
    // React Hooks
    const dispatch = useDispatch();
    const aws = useSelector((state) => state.aws);
    // Local State Values
    const [url, setUrl] = useState('');

    /* If the image exists in the bucket, grab it. Otherwise request from the bucket. */
    useEffect(() => {
        if(!aws[dir]) 
            dispatch(retrieveAsset(dir));
        else if(aws[dir] && !aws[dir].url) 
            return;
        else 
            setUrl(aws[dir].url);
    }, [dispatch, aws, dir]);
    
    /* Return the image. */
    return <img src={url} alt={`bucketimage-${dir}`} />;
}
