import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { Username: username, Password: password, Email: email, Birthday: birthday };
    
    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
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
    <Container className="auth-container">
      <div className="auth-box">
        {/* Signup Section */}
        <div className="left-section">
          <h2>Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="warning" type="submit" block>
              Signup
            </Button>
          </Form>
        </div>

        {/* Login Redirect Section */}
        <div className="right-section">
          <h2>Welcome!</h2>
          <p>Already have an account?</p>
          <Link to="/login">
            <Button variant="warning" block>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};