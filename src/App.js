import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './assets/app.scss';
import CardPhoto from './components/CardPhoto';
import UploadImageDropzone from './components/UploadImageDropzone';
import useImages from './hooks/useImages';
import SimpleReactLightBox, { SRLWrapper } from 'simple-react-lightbox';

  

function App() {
  const { images } = useImages();

return (
  <SimpleReactLightBox>
    <Container className="py-3 mb-5"> 
      <header className="App-header mb-4">
        <h1>Photo review</h1>
      </header>
      
    <SRLWrapper>  
    <Row className= "mb-2">
      {
        images.map(image =>  ( 
            <CardPhoto image={image} key={image.id}/>
          ))	
        }
        </Row>
        </SRLWrapper>

      <UploadImageDropzone />
  
    </Container>	
        
    <footer className="bg-dark text-white text-center py-3">
        <span className="text-muted text-small"> Simple File uploader</span>
    </footer>
  
  </SimpleReactLightBox>
);
}

export default App;