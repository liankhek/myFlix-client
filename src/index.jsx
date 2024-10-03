import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainView } from './components/main-view/main-view';
import './index.scss'; // Import global styles

const App = () => {
  return (
    <Router>
      <MainView /> {/* All routing is handled inside MainView */}
    </Router>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
