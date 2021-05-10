import React, { useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import useRemoveImage from "../../hooks/useRemoveImage";
import { useAuth } from "../../contexts/AuthContext";

const ImagesGrid = ({ images }) => {
  const { currentUser } = useAuth();
  const [removeImage, setRemoveImage] = useState(null);
  useRemoveImage(removeImage);

  const handleRemoveImage = (image) => {
    if (confirm(`You want to remove this file \n"${image.name}"?`))
      setRemoveImage(image);
  };
  return (
    <>
      <SRLWrapper>
        <Row className="my-3">
          {images &&
            images.map((image) => (
              <Col sm={2} md={3} lg={4} key={image.id} className="column">
                <Card className="card">
                  <a
                    href={image.url}
                    title="View image in lightbox"
                    data-attribute="SRL"
                  >
                    <Card.Img
                      variant="top"
                      src={image.url}
                      title={image.name}
                    />
                  </a>
                  {currentUser.uid === image.owner && (
                    <div className="flexButton">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          handleRemoveImage(image);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}

                  <Card.Text className="text-muted small">
                    {image.name} ({Math.round(image.size / 1024)} kb)
                  </Card.Text>

                  <Card.Body>
                    <Link to={`/albums/${image.id}`}>{image.title}</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </SRLWrapper>
    </>
  );
};

export default ImagesGrid;
