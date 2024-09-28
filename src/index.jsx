import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

// Import Bootstrap and custom SCSS
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import './index.scss';  // Custom SCSS styles

const App = () => {
  return (
    <div>
      <MainView />
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
