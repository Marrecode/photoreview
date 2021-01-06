import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './assets/app.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { storage } from './firebase';
import Alert from 'react-bootstrap/Alert';


function App() {

  const [image, setImage] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);


  const handleFileChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
    console.log('file changed!', e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      return;
    }
    
   // storage.ref(doc.data().path).getDownloadURL().then()

    const storageRef = storage.ref();

    const fileRef = storageRef.child(`images/${image.name}`);

    const uploadFile = fileRef.put(image, {
      customMetadata: {
      uploadedBy: MG 
    },
  });

    uploadFile.then(snapshot => {
      console.log(snapshot, 'file been upload');
      setAlertMsg({
        type: 'success',
        msg: "Image successfully uploaded"
      });

      snapshot.ref.getDownloadURL().then(url => {
        setUploadedImageUrl(url);
      })

    }).catch(error => {
      console.error('File upload got an error', error);
      setAlertMsg({
        type: 'warning',
        msg: 'Image couldnt be uploaded due to an error'
      });
    });
    console.log('uploadFile', uploadFile);
   
  }

  const handleReset = e => {
    setImage(null);
    setAlertMsg(null);
    setUploadedImageUrl(null);
  }

  return (
    <Container>
        <header className="App-header mb-4">
          <h1> Upload files</h1>

        </header>

          <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Form.Group>
                <Form.File
                  id='upload-image'
                  label='Choose image to upload'
                  custom
                  onChange={handleFileChange}
                />
                </Form.Group>

            <div className="mb-3"> { 
              image 
                ?`${image.name} (${Math.round(image.size/1024)} kb)` 
                : "No image selected" } 
            </div>

            {
              alertMsg && (<Alert variant={alertMsg.type} className="my-3">{alertMsg.msg} </Alert>)
            }

            {
              uploadedImageUrl && (<img src={uploadedImageUrl} className="img-fluid my-3"
              alt="uploaded file" />) 
            }
          <div>
            <Button variant="primary" type="submit">Upload</Button>
            <Button variant="secondary" type="reset">Clear</Button>
          </div>
          </Form>

    </Container>
  );
}

export default App;
