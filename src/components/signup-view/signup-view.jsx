import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.scss';

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { Username: username, Password: password, Email: email, Birthday: birthday };

    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage('Sign-up successful! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 2000); // Redirect after 2 seconds
        } else {
          return response.json().then((data) => {
            setErrorMessage(data.message || 'Sign-up failed. Please try again.');
          });
        }
      })
      .catch((e) => {
        setErrorMessage('An error occurred. Please try again.');
        console.error('Signup error:', e);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 auth-container">
      <Card className="p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ fontSize: '32px', fontWeight: 'bold' }}>
            Sign Up for MyFlix
          </Card.Title>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formBirthday" className="mt-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
};
