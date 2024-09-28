import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.scss'; // Import custom SCSS

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
