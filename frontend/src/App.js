import React from 'react';
import './App.css';
import LoginForm from "./components/form/LoginForm/LoginForm";
import * as index from "./index";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SideBarMenu from "./components/SideBarMenu/SideBarMenu";
import UsersPage from "./components/page/UsersPage/UsersPage";
import CompaniesPage from "./components/page/CompaniesPage/CompaniesPage";
import SchedulePage from "./components/page/SchedulePage/SchedulePage";
import CompanyPage from "./components/page/CompanyPage/CompanyPage";
import UserPage from "./components/page/UserPage/UserPage";
import HomePage from "./components/page/HomePage/HomePage";
import CommonSchedulePage from "./components/page/CommonSchedulePage/CommonSchedulePage";
import {AnimatePresence} from 'framer-motion';

const App = () => {
    const user = index.getUser();

    return user ? (
        <div className="app-container">
            <Router>
                <SideBarMenu user={user} className="sidebar"/>
                <div className="content">
                    <AnimatePresence>
                        <Routes>
                            <Route path='/' exact element={<HomePage user={user}/>}/>
                            <Route path='/users' element={<UsersPage user={user}/>}/>
                            <Route path='/companies' element={<CompaniesPage user={user}/>}/>
                            <Route path='/schedule' element={<SchedulePage user={user}/>}/>
                            <Route path='/common' element={<CommonSchedulePage user={user}/>}/>
                            <Route path='/company/:companyId' element={<CompanyPage user={user}/>}/>
                            <Route path='/user/:userId' element={<UserPage user={user}/>}/>
                        </Routes>
                    </AnimatePresence>
                </div>
            </Router>
        </div>
    ) : <LoginForm/>;
};

export default App;
