import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const SignupView = ({ onSignedUp, setShowLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { Username: username, Password: password, Email: email };

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
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
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