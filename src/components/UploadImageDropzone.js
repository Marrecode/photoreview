import React, { useState, useEffect, useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import useUploadImage from '../hooks/useUploadImage'



const UploadImageDropzone = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log('Got some files', acceptedFiles);
    }, []);
    
    const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept, isDragReject } = 
    useDropzone({ 
        accept: 'image.gif, image/jpeg, image/png',
        onDrop 
    });

    return (
        <div {...getRootProps()} id="upload-image-wrapper" 
        className={`text-center px-4 py-3 my-3 ${isDragAccept ? `drag-accept`: ``} 
        ${isDragReject ? `drag-reject`: ``}`}>
        <input {...getInputProps()} />
        
        {
            isDragActive
                ? isDragAccept ? <p>Drop it!</p> : <p>Should not be dropped here</p> 
                : <p>Drop me some files!</p>
        }
        {acceptedFiles && (
                <div className="accepted-files mt-2">
                    <ul className="list-unstyled">
                    {acceptedFiles.map(file => (
                        <li key={file.name}><small>{file.name} ({Math.round(file.size / 1024)} kb)</small></li>
                    ))}
                    </ul>
                </div>
            )}
        </div>
    )
}




export default UploadImageDropzone
