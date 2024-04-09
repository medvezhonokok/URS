import React, {useEffect, useState} from 'react';
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import * as index from "./index";
import TopNavigationBar from "./components/TopNavigationBar/TopNavigationBar";
import axios from "axios";
import * as constants from "./constants/constants";

const App = () => {
    const [companies, setCompanies] = useState([]);
    const user = index.getUser();

    const getAllCompanies = () => {
        const jwtToken = localStorage.getItem('jwtToken');
        axios.post(constants.BACKEND_JAVA_URL + '/company/all?jwtToken=' + jwtToken)
            .then((response) => {
                const mappedCompanies = response.data.map(company => ({
                    id: company.id,
                    certificate: company.certificate,
                    about: company.about,
                    companyName: company.companyName,
                    pathToReceiptOfPayment: company.pathToReceiptOfPayment,
                    inProcess: company.inProcess
                }));

                setCompanies(mappedCompanies);
            })
            .catch((err) => {
                console.error("Failed to get companies: " + err);
                setCompanies([]);
            });
    };

    const getInProcessCompanies = companies
        .filter(company => company.inProcess)
        .map(company => (
            <div key={company.id}>
                Название: <p>{company.companyName}</p>
                {company.certificate ?
                    <>
                        <p>Certificate type: {company.certificate.certificateType}</p>
                        <p>Certificate number: {company.certificate.certificateNumber}</p>
                    </>
                    : <p>У компании нет сертификата</p>
                }
                About: <p>{company.about}</p>
            </div>
        ));

    const getNotInProcessCompanies = companies
        .filter(company => !company.inProcess)
        .map(company => (
            <div key={company.id}>
                Название: <p>{company.companyName}</p>
                {company.certificate ?
                    <>
                        <p>Certificate type: {company.certificate.certificateType}</p>
                        <p>Certificate number: {company.certificate.certificateNumber}</p>
                    </>
                    : <p>У компании нет сертификата</p>
                }
                About: <p>{company.about}</p>
            </div>
        ));

    useEffect(() => {
        getAllCompanies();
    }, []);

    const userCeoContent =
        <div className="App">
            <div>
                <TopNavigationBar user={user}/>
                <div style={{display: "flex", paddingTop: "5rem"}}>
                    <div className="borderedBox companies">
                        <h3>COMPANIES</h3>
                        <h2>IN PROCESS</h2>
                        {getInProcessCompanies}
                        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
                        <h2>NOT IN PROCESS</h2>
                        {getNotInProcessCompanies}
                    </div>
                    <div className="borderedBox users">
                        <h3>USERS</h3>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias at atque blanditiis
                        ducimus
                        earum illo in laudantium minima, neque non, odio, odit pariatur possimus recusandae rerum
                        saepe
                        sed
                        sint velit veniam? Error impedit minus quam. Ab, fugiat in laudantium pariatur rem
                        repudiandae
                        soluta! Error nihil odit possimus quibusdam voluptates!
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

    return user ? user.userRole === "CEO" ? userCeoContent : userDefaultWorkerContent : <LoginForm/>;
}

export default App;
