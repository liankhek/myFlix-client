import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  
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
        <h1>Welcome to myFlix</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="secondary" onClick={() => setPasswordShown(!passwordShown)}>
                    {passwordShown ? 'Hide' : 'Show'}
                </Button>
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </Form.Group>
            <Button type="submit">Signup</Button>
        </Form>
        <Link to="/login">Already have an account? Login!</Link>
    </Container>
);
};