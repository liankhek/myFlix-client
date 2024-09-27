import React, { useState } from 'react';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { 
        Username: username,
        Password: password
    };

    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ Username: username, Password: password }),
    })
      .then((response) => response.json())
      .then(data => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch(e => {
        console.error('Login error:', e);
        alert('Something went wrong');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
            type="text" 
            value={username} onChange={(e) => setUsername(e.target.value)} required 
        />
      </label>
      <br />
      <label>
        Password:
        <input 
            type="password" 
            value={password} onChange={(e) => setPassword(e.target.value)} required 
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};
