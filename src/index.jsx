import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainView } from './components/main-view/main-view';
import './index.scss'; // Ensure global styles are applied

const App = () => {
  return (
    <Router>
      <MainView /> {/* Keep all routing logic inside MainView */}
    </Router>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
