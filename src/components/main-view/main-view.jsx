import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch('https://da-flix-1a4fa4a29dcc.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.log(err));
  }, [token]);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  if (!user) {
    return (
      <Router>
        <Route path="/login" render={() => <LoginView onLoggedIn={onLoggedIn} />} />
        <Route path="/signup" render={() => <SignupView onSignedUp={onLoggedIn} />} />
        <Redirect to="/login" />
      </Router>
    );
  }

  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Container>
        <Route exact path="/movies" render={() => (
          <Row>
            {movies.map(m => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))}
          </Row>
        )} />
        <Route path="/users/:id" render={() => (
          <ProfileView user={user} />
        )} />
        <Redirect to="/movies" />
      </Container>
    </Router>
  );
};
