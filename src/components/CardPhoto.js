import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useRemoveImage from '../hooks/useRemoveImage';



const CardPhoto = ({ image }) => {
  const [removeImage, setRemoveImage] = useState(null);
  useRemoveImage(removeImage)

  const handleRemoveImage = () => {
    if (confirm(`You want to remove this file \n"${image.name}"?`))
    setRemoveImage(image);

  };


    return (         
    <Col sm={6} md={4} lg={3}>
        <Card className="mb-2">
        <a href={image.url} title="View image in lightbox" data-attribute="SRL">
          <Card.Img variant="top" src={image.url} />
        </a>
        <Card.Body>
            <Card.Text className="text-muted small">
              {image.name} ({Math.round(image.size/1024)} kb)
            </Card.Text>
          <Button variant="danger" size="sm" onClick={handleRemoveImage}> Remove </Button>
        </Card.Body>
        </Card>
    </Col> );
}
 
export default CardPhoto