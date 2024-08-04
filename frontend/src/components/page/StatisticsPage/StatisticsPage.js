import React, {useEffect, useState} from 'react';
import './StatisticsPage.css';
import * as client from "../../../data/client";
import {BarChart} from '@mui/x-charts/BarChart';
import {AuditCriterion} from "../../../constants/constants";

const StatisticsPage = ({user}) => {
    const [auditData, setAuditData] = useState([]);

    useEffect(() => {
        client.getCompanies().then(companiesJson => {
            const criteriaCount = AuditCriterion.reduce((acc, criterion) => {
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
                <div className="certificatesPageContainer">
                    <BarChart
                        dataset={auditData}
                        yAxis={[{scaleType: 'band', dataKey: 'label'}]}
                        series={[{dataKey: 'value', label: 'Статистика компаний по сертификационным схемам'}]}
                        layout="horizontal"
                        height={400}
                        width={500}
                        barLabel="value"
                        borderRadius={10}
                        margin={{top: 50, bottom: 30, left: 250, right: 10}}
                    />
                </div>
            </div>
            : null
    );
};

export default StatisticsPage;
