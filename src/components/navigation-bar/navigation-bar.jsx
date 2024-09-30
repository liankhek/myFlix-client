import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    navigate(`/users/${encodeURIComponent(user._id)}`); // Navigate to the profile route
    window.location.reload(); // Reload the page to ensure fresh data
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/" // Home route
        >
          MyFlixDB
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && user._id && (
              <>
                <Nav.Link
                  as={Link}
                  to={`/users/${encodeURIComponent(user._id)}`}
                  onClick={handleProfileClick}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={() => {
                    onLoggedOut();
                    navigate("/login");
                  }}
                >
                  Log Out
                </Nav.Link>
              </>
            )}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
