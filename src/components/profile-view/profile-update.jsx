import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProfileUpdate = ({ user, token, updatedUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updates = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };

    try {
      const updated = await updateUserProfile(user.Username, token, updates);
      updatedUser(updated);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile: ' + error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Update Profile</Button>
    </Form>
  );
};

ProfileUpdate.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  updatedUser: PropTypes.func.isRequired,
};

export default ProfileUpdate;  // Exporting as default
