import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { updateUserProfile } from '../../services/apiService';

export const ProfileUpdate = ({ user, token, updatedUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(
    user.Birthday ? new Date(user.Birthday).toISOString().substring(0, 10) : ''
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    try {
      const updatedUserData = await updateUserProfile(user.Username, token, updateData);
      alert('Profile updated successfully!');
      updatedUser(updatedUserData);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Profile update failed: ' + error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="profile-update-form">
      <h2 className="text-center">Update Account Information</h2>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave blank to keep current password"
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mt-3">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        Update Profile
      </Button>
    </Form>
  );
};

ProfileUpdate.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  updatedUser: PropTypes.func.isRequired,
};
