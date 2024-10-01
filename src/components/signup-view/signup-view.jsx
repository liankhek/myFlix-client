import React, { useState } from 'react';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../auth.scss';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [passwordShown, setPasswordShown] = useState(false); // Toggle password visibility
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { Username: username, Password: password, Email: email, Birthday: birthday };

    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert('Signup successful! Please log in.');
          navigate('/login'); // Redirect to login after successful signup
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
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card">
          <div className="card-body">
            <h2>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter a username"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
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
                    placeholder="Enter a password"
                  />
                  <InputGroup.Text onClick={togglePasswordVisibility}>
                    {passwordShown ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>
              <div className="text-center">
                <Button type="submit" className="btn-primary w-100">Sign Up</Button>
              </div>
            </Form>
            <div className="text-center mt-3">
              <Link to="/login">Already have an account? Log in!</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
