import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      access: username,
      secret: password,
    };

    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/login', {
      method: 'POST',
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          onLoggedIn(username);
        } else {
          alert("Login failed");
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
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
        Submit
      </Button>
    </Form>
  );
};