import React from "react";
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Form, Row, Col, Button } from "react-bootstrap";
import { db } from "../../firebase";
import useAlbum from "../../hooks/useAlbum";

const EditAlbum = () => {
  const { albumId } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const edit = useRef();
  const { albums, loading } = useAlbum(albumId);

  if (loading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      db.collection("albums").doc(albumId).update({
        title: edit.current.value,
      });

      navigate(`/albums`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <h2>New album name</h2>
          {error && <Alert variant="warning">{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter name"
                ref={edit}
                defaultValue={albums && albums.title}
                required
              />
            </Form.Group>

            <Button className="btn btn-dark btn-lg" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditAlbum;
