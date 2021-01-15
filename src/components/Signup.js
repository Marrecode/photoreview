import React, {useRef, useState, useContext} from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState(null);
    const { signup } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("The passwords does not match");
            return; 
        }
        setError(null);

        try {
            signup(emailRef.current.value, passwordRef.current.value);
        } catch (e) {
            setError(e.message)
        }
    }

    return (
       <>

            <Row>
                <Col md={{ span: 6, offset: 4 }}>
            

                    <Card>
                        <Card.Body>
                            <Card.Title>Sign up</Card.Title>
                    
                    {error && (<Alert variant="danger">{error}</Alert>)}

                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="pass-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <Button type="submit"> Create Account</Button>

                    </Form>
                        
                    </Card.Body>
                </Card>
                    <div className="text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
            
            </Col>
        </Row>


       </>
    )
}

export default Signup
