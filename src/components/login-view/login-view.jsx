import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userCredentials = {
      Username: username,
      Password: password,
    };

    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          onLoggedIn(data.user, data.token);
          navigate('/');
        } else {
          setErrorMessage('Invalid username or password');
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong. Please try again later.');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login for MyFlix</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
      <p className="mt-3">
        Don't have an account?{' '}
        <a href="/signup" style={{ color: 'orange' }}>
          Sign up!
        </a>
      </p>
    </Form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
