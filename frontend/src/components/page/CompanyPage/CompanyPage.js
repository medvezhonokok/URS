import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './CompanyPage.css';
import * as storage from "../../../data/storage";

const CompanyPage = ({user}) => {
    const [company, setCompany] = useState(null);
    const {companyId} = useParams();

    useEffect(() => {
        const getCompanyAsync = async () => {
            try {
                const companyById = await storage.getCompanyById(companyId);
                setCompany(companyById);
            } catch (error) {
                console.error("Failed to get company:", error);
            }
        };

        if (companyId && !company) {
            getCompanyAsync();
        }
    }, [companyId]);


    if (!user || !companyId) {
        return null;
    }

    return (company
            ? <div className="usersPageContainer">
                <h1 className="companiesHeader">Компания: {company.englishName}</h1>
                <p><strong>Address:</strong> {company.companyAddress}</p>
                <p><strong>Contact Email:</strong> {company.headEmail}</p>
                <p><strong>Website:</strong> <a href={company.webSite} target="_blank"
                                                rel="noopener noreferrer">{company.webSite}</a></p>
                <p><strong>About:</strong> {company.about}</p>
                {company.audit && (
                    <div>
                        <h1 className="companiesHeader"> АУДИТ</h1>
                        <p>Ответственный: <a href={`/user/${company.audit.user.id}`}>
                            {company.audit.user.name}
                        </a></p>
                        <p>Дата начала аудита: {company.audit.startDate}</p>
                        <p>Дата окончания аудита: {company.audit.endDate}</p>
                    </div>
                )}
            </div>
            : <p>No such company</p>
    );
};

export default CompanyPage;
