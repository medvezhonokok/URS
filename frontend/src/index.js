import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (ignored) {
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>);

serviceWorkerRegistration.unregister();

reportWebVitals();
