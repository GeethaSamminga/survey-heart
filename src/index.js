import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reduxStore from './redux/store/store';
import { Provider } from 'react-redux';  // Correct import of Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>  {/* Make sure 'reduxStore' is passed correctly */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
