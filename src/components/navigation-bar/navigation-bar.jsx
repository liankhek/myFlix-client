import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">MyFlixDB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user && (
            <>
              <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
              <Nav.Link as={Link} to={`/users/${user._id}`}>Profile</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Log Out</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
