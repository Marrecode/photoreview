import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { ResetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      setLoading(true);
      await ResetPassword(emailRef.current.value);
      setMsg("Please check your email for further instructions");
    } catch (e) {
      setError("Please check your email address");
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 4 }} className="formCol">
          <Card>
            <Card.Body>
              <Card.Title>Forgot password</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {msg && <Alert variant="success">{msg}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Button disabled={loading} type="submit">
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mt-2">
            Remembered your password? <Link to="/login">Log in</Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
