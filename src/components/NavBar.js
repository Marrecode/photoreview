import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.png'; 


const NavBar = () => {
    return (
    <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Link to="/">
                <Navbar.Brand>
                <img
                    alt="photo album"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                    ohSnapgram
                </Navbar.Brand>
            </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                            <Nav.Link href="/albums">Albums</Nav.Link>
                            <NavDropdown title="User" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/my-profile">My profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
                            </NavDropdown>
                    </Nav>
                    <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container>
        
        </Container>
    </>
    )
}

export default NavBar
