import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { ProfileUpdate } from "./profile-update";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, token, updatedUser, onLoggedOut }) => {

  const handleProfileDelete = () => {
    fetch(`https://moviesdb-6abb3284c2fb.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully!");
          onLoggedOut();
        } else {
          alert("Failed to delete account.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Card className="mb-3">
            <Card.Header>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Header>
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="mb-3">
            <Card.Body>
              <ProfileUpdate user={user} token={token} updatedUser={updatedUser} />
            </Card.Body>
            <Card.Body>
              <Button variant="danger" onClick={handleProfileDelete}>
                Delete account
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="mb-3">
            <Card.Body>
              <FavoriteMovies favMovies={user.FavoriteMovies || []} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
