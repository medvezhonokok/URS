import React, {useEffect, useState} from 'react';
import './App.css';
import SideBarMenu from "./components/SideBarMenu/SideBarMenu";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./components/page/HomePage/HomePage";
import UsersPage from "./components/page/UsersPage/UsersPage";
import SchedulePage from "./components/page/SchedulePage/SchedulePage";
import CompaniesPage from "./components/page/CompaniesPage/CompaniesPage";
import {getUser} from "./index";
import CompanyPage from "./components/page/CompanyPage/CompanyPage";
import UserPage from "./components/page/UserPage/UserPage";
import LoginForm from "./components/form/LoginForm/LoginForm";


const App = () => {
    const user = getUser();
    return user ? (
            <>
                <Router>
                    <SideBarMenu user={user}/>
                    <Routes>
                        <Route path='/' exact element={<HomePage user={user}/>}/>
                        <Route path='/users' element={<UsersPage user={user}/>}/>
                        <Route path='/companies' element={<CompaniesPage user={user}/>}/>
                        <Route path='/schedule' element={<SchedulePage user={user}/>}/>
                        <Route path='/company/:companyId' element={<CompanyPage user={user}/>}/>
                        <Route path='/user/:userId' element={<UserPage user={user}/>}/>
                    </Routes>
                </Router>
            </>
        )
        : <LoginForm/>;
}

export default App;
