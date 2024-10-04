import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../index.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { Username: username, Password: password };

    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
        console.error('Login error:', e);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ fontSize: '32px', fontWeight: 'bold' }}>
            Login for MyFlix
          </Card.Title>
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
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {passwordShown ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/signup">Sign up!</Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
};
