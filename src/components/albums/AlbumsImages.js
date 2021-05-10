import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import useRemoveImage from "../../hooks/useRemoveImage";

const AlbumsImages = ({ images, PickedImage, handleLikes, setChooseImg }) => {
  const { currentUser } = useAuth();
  const [removeImage, setRemoveImage] = useState(null);
  useRemoveImage(removeImage);

  const handleRemoveImage = (image) => {
    setRemoveImage(image);
  };

  return (
    <>
      <Row className="my-3">
        {images &&
          images.map((image) => (
            <Col sm={6} md={2} lg={3}>
              <Card key={image.id} className="card">
                <Card.Img
                  variant="top"
                  src={image.url}
                  onClick={() => setChooseImg(image.url)}
                />

                {currentUser ? (
                  <div className="flexButton">
                    <input
                      type="checkbox"
                      id={image.id}
                      onChange={PickedImage}
                    />
                    <label className="photoLabel" htmlFor="photo">
                      Choose
                    </label>

                    <div>
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
                  </div>
                ) : (
                  <>
                    <Row id={image.id} className="flex-space-between">
                      <button
                        className="like"
                        onClick={() => handleLikes(image, true)}
                      >
                        Like
                      </button>

                      <button
                        className="dislike"
                        onClick={() => handleLikes(image, false)}
                      >
                        Dislike
                      </button>
                    </Row>
                  </>
                )}
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default AlbumsImages;
