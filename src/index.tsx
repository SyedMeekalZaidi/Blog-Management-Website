import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';

/**
 * This file can be ignored, please work in ./components/App.jsx
 */

// Purpose: Initialize the react app and import all necessary resources

// Include mock API.
import './mock';

// Include styles.
import './styles/index.css';

// Include application component.
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App /> 
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
