import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut, onSearch, resetSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(e.target.search.value);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ color: 'orange' }}>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          {user && (
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                className="text-light"
                onClick={resetSearch}
              >
                Movies
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/profile"
                className="text-light"
                onClick={resetSearch}
              >
                Profile
              </Nav.Link>
            </Nav>
          )}

          {!['/login', '/signup'].includes(location.pathname) && user && (
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                type="search"
                name="search"
                placeholder="Search Movies"
                className="form-control me-2"
                aria-label="Search"
              />
              <button type="submit" className="btn btn-outline-success">
                Search
              </button>
            </form>
          )}

          {user && (
            <Nav>
              <Nav.Link
                onClick={() => {
                  onLoggedOut();
                  navigate('/login');
                }}
                className="text-light"
              >
                Log Out
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
