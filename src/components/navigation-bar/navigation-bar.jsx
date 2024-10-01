import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    onSearch(searchTerm);
    e.target.elements.search.value = ''; // Clear the search input
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">MyFlixDB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {user && (
          <>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Movies</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link
                onClick={() => {
                  onLoggedOut();
                  navigate('/login'); // Navigate to login after logout
                }}
              >
                Log Out
              </Nav.Link>
            </Nav>
            <Form className="d-flex ms-3" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Search Movies"
                className="me-2"
                aria-label="Search"
                name="search"
              />
              <Button variant="outline-success" type="submit">Search</Button>
            </Form>
          </>
        )}
        {!user && (
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
