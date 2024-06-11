import React, {useEffect, useState} from 'react';
import './HomePage.css';
import * as storage from "../../../data/storage";
import {CircularProgress, List, ListItem} from "@mui/material";
import {Link} from "react-router-dom";

const HomePage = ({user}) => {
    const [companiesWithAudit, setCompaniesWithAudit] = useState([]);
    const [companiesWithoutAudit, setCompaniesWithoutAudit] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        storage.getCompanies().then(companiesJson => {
            const companiesWithAudit = companiesJson
                .filter(company => company.audit && company.audit.certificateExpirationDate)
                .sort((a, b) => new Date(a.audit.certificateExpirationDate) - new Date(b.audit.certificateExpirationDate));

            const companiesWithoutAudit = companiesJson
                .filter(company => !company.audit || !company.audit.certificateExpirationDate);

            setCompaniesWithAudit(companiesWithAudit);
            setCompaniesWithoutAudit(companiesWithoutAudit);
            setLoading(false);
        });
    }, []);

    return (
        user ? (
            <div className="usersPageContainer">
                <h1 className="companiesHeader">Главная</h1>
                {loading ? (
                    <div className="loadingContainer">
                        <CircularProgress/>
                    </div>
                ) : (<div className="homePageContent">
                        <List className="auditList">
                            <h1>Компании с аудитами</h1>
                            {companiesWithAudit.map(company => (
                                <ListItem key={company.id} className="auditItem">
                                    <Link to={`/company/${company.id}`}>
                                        Компания "{company.englishName}"
                                    </Link>
                                    <p>Дата истечения
                                        сертификата: {new Date(company.audit.certificateExpirationDate).toLocaleDateString()}</p>
                                </ListItem>
                            ))}
                            <h1>Компании без аудитов</h1>
                            {companiesWithoutAudit.map(company => (
                                <ListItem key={company.id} className="auditItem">
                                    <Link to={`/company/${company.id}`}>
                                        Компания "{company.englishName}"
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                )}
            </div>
        ) : null
    );
};

export default HomePage;
