import React, { useState } from 'react';
import { Form, Button, Card, InputGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/apiService';  // Import the loginUser function
import '../../index.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setError('');

      try {
          const data = await loginUser(username, password);
          if (data.user) {
              onLoggedIn(data.user, data.token);
          } else {
              setError('No such user');
          }
      } catch (error) {
          console.error('Login error:', error);
          setError('Login failed. Please check your username and password.');
      } finally {
          setLoading(false);
      }
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
                            <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                {showPassword ? 'Hide' : 'Show'}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    <Button variant="primary" type="submit" className="mt-4 w-100">
                        {loading ? <Spinner animation="border" size="sm" /> : 'LOGIN'}
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    Don't have an account? <Link to="/signup">Sign up!</Link>
                </div>
            </Card.Body>
        </Card>
    </div>
  );
};
