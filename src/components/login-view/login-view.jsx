import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Added eye icon for password toggle
import { Link, useNavigate } from 'react-router-dom';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Username: username, Password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
          navigate('/profile');
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        console.error('Login error:', e);
        alert('Something went wrong');
      });
  };

  return (
    <Container>
      <h1>Welcome to myFlix</h1>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="password-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={passwordShown ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <span
            onClick={() => setPasswordShown(!passwordShown)}
            className="password-toggle"
          >
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </span>
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
      <Link to="/signup">Don't have an account? Sign up!</Link>
    </Container>
  );
};
