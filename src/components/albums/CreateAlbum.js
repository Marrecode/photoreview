import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateAlbum = () => {
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 2) {
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const documentRef = await db.collection("albums").add({
        title,
        owner: currentUser.uid,
      });
      navigate(`/albums/${documentRef.id}`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <Row>
          <Col md={{ span: 6, offset: 4 }}>
            <Card>
              <Card.Body>
                <Card.Title>Create an Album</Card.Title>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group id="title">
                    <Form.Label>Album titel</Form.Label>
                    <Form.Control
                      type="title"
                      onChange={handleTitle}
                      value={title}
                      required
                    />
                    {title && title.length <= 2 && (
                      <Form.Text className="text-muted">
                        Needs to be more than 2 characters long
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button disabled={loading} type="submit">
                    Create
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreateAlbum;
