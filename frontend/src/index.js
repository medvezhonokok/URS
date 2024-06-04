import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createRoot} from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

export function logout() {
    localStorage.removeItem('user');
    window.location.href = "/";
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (ignored) {
        return null;
    }
}



const root = createRoot(document.getElementById("root"));

root.render(<App />);

serviceWorkerRegistration.unregister();

reportWebVitals();