import React, { useState, useEffect, useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import useUploadImage from '../hooks/useUploadImage'
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';



const UploadImageDropzone = () => {
    const [uploadFile, setUploadFile] = useState(null);
    const [message, setMessage] = useState(null);
    const { uploadProgress, error, isSucess} = useUploadImage(uploadFile);


    useEffect(() => {
        if (error) {
            setMessage({
                type: 'true',
                text: error,
            })
        }
        else if (isSucess) {
            setMessage({
                success: true,
                text: 'Image was uploaded successfully',
            });
            setUploadFile(null);
        }
        else {
            setMessage(null);
        }
    }, [error, isSucess])

    const onDrop = useCallback(acceptedFiles => {
        setMessage(null);

        if (acceptedFiles.length === 0 ) {
            return;
        }

        setUploadFile(acceptedFiles[0]);
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
                        <li key={file.name}>
                        <img src={URL.createObjectURL(file)} className="img-fluid w-25" alt="preview" />
                        <small>{file.name} ({Math.round(file.size / 1024)} kb)</small></li>
                    ))}
                    </ul>
                </div>
            )}

                {
                    uploadProgress !== null && (<ProgressBar variant="success" animated now={uploadProgress}/> )}
                    
                    {message && (<Alert variant={message.error ? 'warning' : 'success'}> {message.text}</Alert>)}
                    
                
        </div>
    )
}




export default UploadImageDropzone
