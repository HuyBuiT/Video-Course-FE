import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ProfilePage from './pages/profile';
import Sidebar from './components/sidebar';


// Acquire a reference to the root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create a root.
const root = ReactDOM.createRoot(rootElement as HTMLElement);

// Use RouterProvider to use the router object you've created
root.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
    
  </React.StrictMode>
);

// Call reportWebVitals if needed
reportWebVitals();
