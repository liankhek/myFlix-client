import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut, searchTerm, onSearch }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">MyFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {user && <Nav.Link as={Link} to="/">Movies</Nav.Link>}
          {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search Movies"
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)} // Update searchTerm state
          />
          <Button variant="outline-success" onClick={() => handleSearch()}>Search</Button>
        </Form>
        {user && (
          <Nav className="ml-auto">
            <Nav.Link onClick={() => {
              onLoggedOut();
              navigate('/login');
            }}>Log Out</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
