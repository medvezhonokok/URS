import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import LoginForm from "./components/form/LoginForm/LoginForm";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SideBarMenu from "./components/SideBarMenu/SideBarMenu";
import UsersPage from "./components/page/UsersPage/UsersPage";
import CompaniesPage from "./components/page/CompaniesPage/CompaniesPage";
import CompanyPage from "./components/page/CompanyPage/CompanyPage";
import UserPage from "./components/page/UserPage/UserPage";
import HomePage from "./components/page/HomePage/HomePage";
import OfficialSchedulePage from "./components/page/OfficialSchedulePage/OfficialSchedulePage";
import CertificationSchemePage from "./components/page/CertificationSchemePage/CertificationSchemePage";
import StatisticsPage from "./components/page/StatisticsPage/StatisticsPage";
import {CircularProgress} from "@mui/material";
import AdminPage from "./components/page/AdminPage/AdminPage";
import * as client from "./data/client";
import SettingsPage from "./components/page/SettingsPage/SettingsPage";
import {ThemeContext} from "./utils/ThemeContext";
import InformalSchedulePage from "./components/page/InformalSchedulePage/InformalSchedulePage";

const App = () => {
    const [user, setUser] = useState(null);
    const jwtToken = localStorage.getItem('jwtToken');
    const [loading, setLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        if (jwtToken && !user) {
            client.getUserByJWT(jwtToken).then((user) => {
                setUser(user);
                setLoading(false);
            }).catch(err => {
                setLoading(true);
                console.log(err);
            })
        }

    }, [jwtToken, user]);

    if (loading && jwtToken) {
        return <div className="loadingContainer"><CircularProgress/></div>;
    }

    return user && !loading && jwtToken ? (
        <div className="app-container">
            <Router>
                <SideBarMenu user={user} setLoading={setLoading} collapsed={collapsed}/>
                <div className={`content ${theme}`}>
                    <Routes>
                        <Route path='/' exact element={<HomePage user={user}/>}/>
                        <Route path='/certification_scheme' element={<CertificationSchemePage user={user}/>}/>
                        <Route path='/stats' element={<StatisticsPage user={user}/>}/>
                        <Route path='/users' element={<UsersPage user={user}/>}/>
                        <Route path='/companies' element={<CompaniesPage user={user}/>}/>
                        <Route path='/official_schedule' element={<OfficialSchedulePage user={user}/>}/>
                        <Route path='/informal_schedule' element={<InformalSchedulePage user={user}/>}/>
                        <Route path='/company/:companyId' element={<CompanyPage user={user}/>}/>
                        <Route path='/user/:userId' element={<UserPage user={user}/>}/>
                        <Route path='/admin' element={<AdminPage user={user}/>}/>
                        <Route path='/settings'
                               element={<SettingsPage collapsed={collapsed} setCollapsed={setCollapsed}/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    ) : <LoginForm setUser={setUser}/>;
};

export default App;
