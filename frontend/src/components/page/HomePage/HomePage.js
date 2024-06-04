import React, {useEffect, useState} from 'react';
import LoginForm from "../../form/LoginForm/LoginForm";
import * as storage from "../../../data/storage";
import * as index from "../../../index";

function HomePage() {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompany] = useState(null);
    const user = index.getUser();

    useEffect(() => {
        storage.getCompanies().then(
            companiesJson => {
                setCompanies(companiesJson)
            }
        );
    }, []);

    const showCompanyInfoByCompanyId = (companyId) => {
        setSelectedCompany(selectedCompanyId === companyId ? null : companyId);
    };

    const getInProcessCompanies = companies
        .filter(company => company.inProcess)
        .map(company => (
            <div className="companyBox" key={company.id} onClick={() => showCompanyInfoByCompanyId(company.id)}>
                <div>
                    <h3>{company.companyName}</h3>
                    {company.certificate ? (
                        <>
                            <p>Certificate type: {company.certificate.certificateType}</p>
                            <p>Certificate number: {company.certificate.certificateNumber}</p>
                        </>
                    ) : (
                        <p>У компании нет сертификата</p>
                    )}
                    {selectedCompanyId === company.id && (
                        <div>
                            <p>About: {company.about}</p>
                        </div>
                    )}
                </div>
            </div>
        ));

    const getNotInProcessCompanies = companies
        .filter(company => !company.inProcess)
        .map(company => (
            <div className="companyBox" key={company.id} onClick={() => showCompanyInfoByCompanyId(company.id)}>
                <div>
                    <h3>{company.companyName}</h3>
                    {company.certificate ? (
                        <>
                            <p>Certificate type: {company.certificate.certificateType}</p>
                            <p>Certificate number: {company.certificate.certificateNumber}</p>
                        </>
                    ) : (
                        <p>У компании нет сертификата</p>
                    )}
                    {selectedCompanyId === company.id && (
                        <div>
                            <p>About: {company.about}</p>
                        </div>
                    )}
                </div>
            </div>
        ));

    const userCeoContent =
        <div className="App">
            <div>
                <div className="userCard">
                    <h3>COMPANIES</h3>
                    <h2>IN PROCESS</h2>
                    {getInProcessCompanies}
                    <h2>NOT IN PROCESS</h2>
                    {getNotInProcessCompanies}
                </div>
            </div>
        </div>;

    const userDefaultWorkerContent =
        <div className="App">
            <div>

                // TODO....
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

export default HomePage;