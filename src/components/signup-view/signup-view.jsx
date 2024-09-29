import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const SignupView = ({ onSignedUp, setShowLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { FirstName: firstName, LastName: lastName, Username: username, Password: password };

    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert('Signup successful! Please log in.');
          onSignedUp();
        } else {
          alert('Signup failed');
        }
      })
      .catch((e) => {
        console.error('Signup error:', e);
        alert('Something went wrong');
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <div className="form-box">
            <h2>Create Your Account</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Button type="submit">Sign Up</Button>
            </Form>
            <div className="text-center mt-3">
              <span>Already have an account?</span>{' '}
              <a href="#" onClick={() => setShowLogin(true)}>Login</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
