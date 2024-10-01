import React, { useState } from 'react';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './auth.scss'; // Importing the auth.scss styles

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

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
          onLoggedIn(data.user, data.token);  // Successful login
          navigate('/profile'); // Navigate to profile only after successful login
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
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card">
          <div className="card-body">
            <h2>Log In</h2>
            <Form onSubmit={handleSubmit}>
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
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordShown ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <InputGroup.Text onClick={togglePasswordVisibility}>
                    {passwordShown ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <div className="text-center">
                <Button type="submit" className="btn-primary w-100">Log In</Button>
              </div>
            </Form>
            <div className="text-center mt-3">
              <Link to="/signup">Don't have an account? Sign up!</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
