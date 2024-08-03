import React, {useEffect, useState} from 'react';
import './App.css';
import * as storage from "./data/storage";
import LoginForm from "./components/form/LoginForm/LoginForm";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SideBarMenu from "./components/SideBarMenu/SideBarMenu";
import UsersPage from "./components/page/UsersPage/UsersPage";
import CompaniesPage from "./components/page/CompaniesPage/CompaniesPage";
import CompanyPage from "./components/page/CompanyPage/CompanyPage";
import UserPage from "./components/page/UserPage/UserPage";
import HomePage from "./components/page/HomePage/HomePage";
import CommonSchedulePage from "./components/page/CommonSchedulePage/CommonSchedulePage";
import CertificationSchemePage from "./components/page/CertificationSchemePage/CertificationSchemePage";
import StatisticsPage from "./components/page/StatisticsPage/StatisticsPage";
import {CircularProgress} from "@mui/material";
import AdminPage from "./components/page/AdminPage/AdminPage";

const App = () => {
    const [user, setUser] = useState(null);
    const jwtToken = localStorage.getItem('jwtToken');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (jwtToken && !user) {
            storage.getUserByJWT(jwtToken).then((user) => {
                setLoading(false);
                setUser(user);
            })
        }
    }, [jwtToken, user]);

    if (loading && user) {
        return <div className="loadingContainer"><CircularProgress/></div>;
    }

    return user ? (
        <div className="app-container">
            <Router>
                <SideBarMenu user={user}/>
                <div className="content">
                    <Routes>
                        <Route path='/' exact element={<HomePage user={user}/>}/>
                        <Route path='/certification_scheme' element={<CertificationSchemePage user={user}/>}/>
                        <Route path='/stats' element={<StatisticsPage user={user}/>}/>
                        <Route path='/users' element={<UsersPage user={user}/>}/>
                        <Route path='/companies' element={<CompaniesPage user={user}/>}/>
                        <Route path='/schedule' element={<CommonSchedulePage user={user}/>}/>
                        <Route path='/company/:companyId' element={<CompanyPage user={user}/>}/>
                        <Route path='/user/:userId' element={<UserPage user={user}/>}/>
                        <Route path='/admin' element={<AdminPage user={user}/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    ) : <LoginForm setUser={setUser}/>;
};

export default App;
