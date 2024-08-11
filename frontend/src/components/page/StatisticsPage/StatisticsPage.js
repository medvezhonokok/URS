import React, {useEffect, useState} from 'react';
import './StatisticsPage.css';
import * as client from "../../../data/client";
import {BarChart} from '@mui/x-charts/BarChart';

const StatisticsPage = ({user}) => {
    const [companiesByAuditCriterionMap, setCompaniesByAuditCriterionMap] = useState([]);

    useEffect(() => {
        client.getCompanies().then(companiesJson => {
            setCompaniesByAuditCriterionMap(Object.entries(companiesJson.reduce((map, company) => {
                if (!map[company.auditCriterion]) {
                    map[company.auditCriterion] = 0;
                }
                map[company.auditCriterion]++;

                return map;
            }, {})).map(([key, value]) => ({
                label: key,
                value: value
            })));
        });
    }, []);

    if (!user) {
        return null;
    }

    return (<BarChart
        dataset={companiesByAuditCriterionMap}
        yAxis={[{scaleType: 'band', dataKey: 'label'}]}
        series={[{dataKey: 'value', label: 'Статистика компаний по сертификационным схемам'}]}
        layout="horizontal"
        height={400}
        width={500}
        barLabel="value"
        borderRadius={10}
        margin={{top: 50, bottom: 30, left: 250, right: 10}}
    />);
};

export default StatisticsPage;
