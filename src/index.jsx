import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import './index.scss';

// Importing Bootstrap CSS globally
import 'bootstrap/dist/css/bootstrap.min.css';

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
