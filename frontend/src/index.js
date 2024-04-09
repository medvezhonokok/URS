import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Users from "./components/Users/Users";
import Schedule from "./components/Schedule/Schedule";

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

const router = createBrowserRouter([
    {
        path: '/',
        name: 'Home',
        element: <App/>,
    },
    {
        path: '/users',
        name: 'Users',
        element: <div><Users user={getUser()}/></div>,
    },
    {
        path: '/schedule',
        name: 'Schedule',
        element: <div><Schedule user={getUser()}/></div>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
