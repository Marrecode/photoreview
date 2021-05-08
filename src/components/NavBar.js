import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            <img
              alt="pic"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            PhotoReviewer
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink to="/albums" className="nav-link">
                Albums
              </NavLink>
              {currentUser ? (
                <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
                  <NavLink to="/my-profile" className="dropdown-item">
                    My Profile
                  </NavLink>
                  <NavDropdown.Divider />
                  <NavLink to="/logout" className="dropdown-item">
                    Log Out
                  </NavLink>
                </NavDropdown>
              ) : (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
