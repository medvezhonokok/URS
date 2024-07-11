import React, {useEffect, useState} from 'react';
import './CertificationSchemePage.css';
import {AuditCriterion} from "../../../data/storage";
import {BarChart} from "@mui/x-charts/BarChart";
import * as storage from "../../../data/storage";

const CertificationSchemePage = ({user}) => {
    const [auditData, setAuditData] = useState([]);

    useEffect(() => {
        storage.getCompanies().then(companiesJson => {
            const criteriaCount = storage.AuditCriterion.reduce((acc, criterion) => {
                acc[criterion.value] = companiesJson.filter(company => company.auditCriterion === criterion.key).length;
                return acc;
            }, {});

            const formattedData = Object.entries(criteriaCount).map(([criterion, count]) => ({
                label: criterion,
                value: count
            }));

            setAuditData(formattedData);
        });
    }, []);


    return (
        user ?
            <div className="commonPageContainer">
                <h1 className="commonPageHeader">Схемы сертификации</h1>
                <div className="certificatesPageContainer">
                    <ul>
                        {AuditCriterion.map((certificateType, index) => (
                            <li key={index} style={{color: "black", textAlign: "left"}}>{certificateType.value}</li>
                        ))}
                    </ul>
                    <h1 className="commonPageHeader">Статистика компаний по схемам сертификации</h1>
                    <BarChart
                        series={[{data: auditData.map(item => item.value)}]}
                        height={290}
                        xAxis={[{
                            data: auditData.map(item => item.label),
                            scaleType: 'band'
                        }]}
                        margin={{top: 10, bottom: 30, left: 40, right: 10}}
                    />
                </div>
            </div>
            : null
    );
};

export default CertificationSchemePage;
