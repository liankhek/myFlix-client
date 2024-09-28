import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://da-flix-1a4fa4a29dcc.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((response) => response.json().then(data => ({
        status: response.status,
        data
      })
    ))
    .then(({status, data}) => {
      if (status === 201) {
        alert("Signup successful! Please login.");
        onSignedUp();
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    })
    .catch((error) => {
      console.error("Error during signup:", error);
      alert("Something went wrong");
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="signUpFormUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Choose a username"
        />
      </Form.Group>
  
      <Form.Group controlId="signUpFormPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Choose a password"
        />
      </Form.Group>
  
      <Form.Group controlId="signUpFormEmail" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </Form.Group>
  
      <Form.Group controlId="signUpFormBirthday" className="mt-3">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
  
      <Button variant="primary" type="submit" className="mt-3">
        Sign Up
      </Button>
    </Form>
  );
};
