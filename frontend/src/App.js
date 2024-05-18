import React, {useEffect, useState} from 'react';
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import * as index from "./index";
import TopNavigationBar from "./components/TopNavigationBar/TopNavigationBar";
import * as storage from "./data/storage";
import AbstractBox from "./components/AbstractBox/AbstractBox";

const App = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompany] = useState(null);
    const user = index.getUser();

    const showCompanyInfoByCompanyId = (companyId) => {
        setSelectedCompany(selectedCompanyId === companyId ? null : companyId);
    };

    const getInProcessCompanies = companies
        .filter(company => company.inProcess)
        .map(company => (
            <div key={company.id} onClick={() => showCompanyInfoByCompanyId(company.id)}>
                <AbstractBox
                    header={<h3>{company.companyName}</h3>}
                    body={
                        <>
                            {company.certificate ? (
                                <>
                                    <p>Certificate type: {company.certificate.certificateType}</p>
                                    <p>Certificate number: {company.certificate.certificateNumber}</p>
                                </>
                            ) : (
                                <p>У компании нет сертификата</p>
                            )}
                        </>
                    }
                    footer={selectedCompanyId === company.id && <p>About: {company.about}</p>}
                />
            </div>
        ));

    const getNotInProcessCompanies = companies
        .filter(company => !company.inProcess)
        .map(company => (
            <div key={company.id} onClick={() => showCompanyInfoByCompanyId(company.id)}>
                <AbstractBox
                    header={<h3>{company.companyName}</h3>}
                    body={
                        <>
                            {company.certificate ? (
                                <>
                                    <p>Certificate type: {company.certificate.certificateType}</p>
                                    <p>Certificate number: {company.certificate.certificateNumber}</p>
                                </>
                            ) : (
                                <p>У компании нет сертификата</p>
                            )}
                        </>
                    }
                    footer={selectedCompanyId === company.id && <p>About: {company.about}</p>}
                />
            </div>
        ));

    const [users, setUsers] = useState([]);

    const mappedUsers = users
        .map(user => (
            <AbstractBox
                key={user.id}
                header={<p> ФИО: {user.name} </p>}
                body={
                    <>
                        <p> Номер телефона: {user.phoneNumber}</p>
                        <p> ROLE: {user.role}</p>
                        {user.companyNames && user.companyNames.length ?
                            (<div>
                                Busy in companies: {user.companyNames.map(name => <div>- {name}</div>)}
                            </div>)
                            :
                            (<>
                                nothing there
                            </>)
                        }
                    </>
                }
            />
        ));

    const userCeoContent =
        <div className="App">
            <div>
                <TopNavigationBar user={user}/>
                <div style={{display: "flex", paddingTop: "5rem"}}>
                    <div className="borderedBox companies">
                        <h3>COMPANIES</h3>
                        <h2>IN PROCESS</h2>
                        {getInProcessCompanies}
                        <h2>NOT IN PROCESS</h2>
                        {getNotInProcessCompanies}
                    </div>
                    <div className="borderedBox users">
                        <h3>USERS</h3>
                        {mappedUsers}
                    </div>
                </div>
            </div>
        </div>;

    const userDefaultWorkerContent =
        <div className="App">
            <div>
                <TopNavigationBar user={user}/>
                <div style={{display: "flex", paddingTop: "5rem"}}>
                    <div className="borderedBox companies">
                        <h3>COMPANIES</h3>
                        <h2>IN PROCESS</h2>
                        {getInProcessCompanies}
                    </div>
                    <div className="borderedBox companies">
                        <h3>COMPANIES</h3>
                        <h2>NOT IN PROCESS</h2>
                        {getNotInProcessCompanies}
                    </div>
                </div>
            </div>
        </div>;

    useEffect(() => {
        storage.getCompanies().then(
            companiesJson => {
                setCompanies(companiesJson)
            }
        );
    }, []);

    useEffect(() => {
        storage.getUsers().then(
            usersJson => {
                setUsers(usersJson)
            }
        );
    }, []);

    return user ? user.userRole === "CEO" ? userCeoContent : userDefaultWorkerContent : <LoginForm/>;
};

export default App;
