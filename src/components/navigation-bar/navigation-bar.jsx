import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes for type checking

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg" className="px-4 py-3">
      <Navbar.Brand as={Link} to="/" className="brand-logo">
        myFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user ? (
            <>
              <Nav.Link as={Link} to="/" className="mx-2">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" className="mx-2">
                Profile
              </Nav.Link>
              <Button
                variant="outline-danger"
                onClick={onLoggedOut}
                className="mx-2"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="mx-2">
                Log In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className="mx-2">
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

// Adding prop types for better type checking
NavigationBar.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }),
  onLoggedOut: PropTypes.func.isRequired,
};
