import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const CardPhoto = ({ image }) => {
    return (         
    <Col sm={6} md={4} lg={3} >
        <Card className="mb-2">
        <a href={image.url} title="View image in lightbox" data-attribute="SRL">
          <Card.Img variant="top" src={image.url} />
        </a>
        <Card.Body>
            <Card.Text>
              {image.name} ({Math.round(image.size/1024)} kb) 
            </Card.Text>
        </Card.Body>
        </Card>
    </Col> );
}
 
export default CardPhoto