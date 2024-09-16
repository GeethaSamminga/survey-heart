import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reduxStore from './redux/store/store';
import { Provider } from 'react-redux'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>  
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
