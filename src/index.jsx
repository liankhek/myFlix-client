import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainView } from './components/main-view/main-view';
import { LoginView } from './components/login-view/login-view';
import { SignupView } from './components/signup-view/signup-view';
import { ProfileView } from './components/profile-view/profile-view';
import './index.scss';
import { NavigationBar } from "./components/navigation-bar/navigation-bar";


const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </Router>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);