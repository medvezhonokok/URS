import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import UsersPage from "./components/page/UsersPage/UsersPage";
import SchedulePage from "./components/page/SchedulePage/SchedulePage";
import CompanyPage from "./components/page/CompanyPage/CompanyPage";
import CompaniesPage from "./components/page/CompaniesPage/CompaniesPage";

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
        name: 'UsersPage',
        element: <div><UsersPage user={getUser()}/></div>,
    },
    {
        path: '/schedule',
        name: 'SchedulePage',
        element: <div><SchedulePage user={getUser()}/></div>,
    },
    {
        path: '/companies',
        name: 'CompaniesPage',
        element: <div><CompaniesPage user={getUser()}/></div>,
    },
    {
        path: '/company/:companyId',
        name: 'CompanyPage',
        element: <div><CompanyPage/></div>,
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
