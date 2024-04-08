import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

export function logout() {
    localStorage.removeItem('user');
    window.location.reload();
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
    // {
    //     path: '/orders',
    //     name: 'Orders',
    //     element: <div><Orders/></div>,
    // },
    // {
    //     path: '/tasks',
    //     name: 'Tasks',
    //     element: <div><Tasks user={getUserFromLocalStorage()}/></div>,
    // },
    // {
    //     path: '/schedule',
    //     name: 'Schedule',
    //     element: <div><Schedule user={getUserFromLocalStorage()}/></div>,
    // },
    // {
    //     path: '/profile',
    //     name: 'Profile',
    //     element: <div><UserProfile user={getUserFromLocalStorage()}/></div>,
    // },
    // {
    //     path: '/chat',
    //     name: 'Chat',
    //     element: <div><Chat user={getUserFromLocalStorage()}/></div>,
    // },
    // {
    //     path: '/users',
    //     name: 'Users',
    //     element: <div><Users user={getUserFromLocalStorage()}/></div>,
    // },
    // {
    //     path: "/news",
    //     name: "News",
    //     element: <div><News user={getUserFromLocalStorage()}/></div>
    // }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
