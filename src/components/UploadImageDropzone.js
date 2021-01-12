import React, { useState, useEffect, useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import useUploadImage from '../hooks/useUploadImage'



const UploadImageDropzone = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log('Got some files', acceptedFiles);
    }, []);
    
    const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} id="upload-image-wrapper" className="px-5 py-3">
        <input {...getInputProps()} />
        
        {
            isDragActive
                ? <img src="image/jpeg,image/jpg,image/tiff,image/gif" className="img-fluid" alt="Drop it!" />
                : <p>Drop me some files!</p>
        }
        
            
        </div>
    )
}

export default UploadImageDropzone
