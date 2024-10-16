import ReactDOM from 'react-dom/client';
import ReactModal from 'react-modal';

import './index.css';
import App from './App';

ReactModal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
