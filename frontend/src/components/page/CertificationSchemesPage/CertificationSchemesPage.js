import React, {useEffect, useState} from 'react';
import './CertificationSchemesPage.css';
import {Link} from 'react-router-dom';
import {AuditCriterion} from "../../../constants/constants";
import {Button} from "react-bootstrap";
import * as client from "../../../data/client";

const CertificationSchemesPage = ({user}) => {
    const [companiesByAuditCriterionMap, setCompaniesByAuditCriterionMap] = useState(
        AuditCriterion.reduce((map, {key}) => {
            map[key] = [];
            return map;
        }, {}));

    const [selectedCriterion, setSelectedCriterion] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        client.getCompanies().then(companiesJson => {
            const map = companiesByAuditCriterionMap;

            for (const company of companiesJson) {
                map[company.auditCriterion].push(company);
            }

            setCompaniesByAuditCriterionMap(map);
        });
    }, [companiesByAuditCriterionMap]);

    if (!user) {
        return null;
    }

    const handleCriterionClick = (criterion) => {
        setSelectedCriterion(criterion);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCriterion(null);
    };

    function getAuditCriterionTitle(criterion, companies) {
        const auditCriterion = AuditCriterion.find(item => item.key === criterion).value;

        return (auditCriterion.length > 10
            ? auditCriterion.slice(0, 20) + "..."
            : auditCriterion) + " (" + companies.length + ")";
    }

    return (
        <>
            <h1 className="commonPageHeader">Схемы сертификации</h1>
            <div className="certificatesPageContainer">
                {Object.entries(companiesByAuditCriterionMap).map(([auditCriterion, companies]) => (
                    <div key={auditCriterion} className="auditCriterion"
                         onClick={() => handleCriterionClick(auditCriterion)}>
                        {getAuditCriterionTitle(auditCriterion, companies)}
                    </div>
                ))}
            </div>
            {showModal && selectedCriterion && (
                <div className="modalOverlay" onClick={handleCloseModal}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <div className="modalHeaderContainer">
                            <div className="modalHeader">{
                                AuditCriterion.find(item => item.key === selectedCriterion).value
                            }</div>
                            <Button onClick={handleCloseModal}>Закрыть</Button>
                        </div>
                        <ul>
                            {companiesByAuditCriterionMap[selectedCriterion].length > 0
                                ? companiesByAuditCriterionMap[selectedCriterion].map((company) => (
                                    <li key={company.id}>
                                        <Link to={`/company/${company.id}`}> {company.englishName}</Link>
                                    </li>
                                ))
                                : <div style={{margin: "1rem auto"}}>No such companies</div>}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default CertificationSchemesPage;
