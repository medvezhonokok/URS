import React, {useEffect, useState} from 'react';
import './AuditsPage.css';
import * as client from "../../../data/client";
import {CircularProgress} from "@mui/material";
import {FaCalendarAlt} from 'react-icons/fa';

const AuditsPage = ({user}) => {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.getAuditsById(user.id).then(auditsJson => {
            setAudits(auditsJson);
            setLoading(false);
        });
    }, [user]);

    if (loading) {
        return <CircularProgress/>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('ru-RU', options);
    };

    return (
        <>
            <div className="commonPageHeader">
                <h1 className="commonPageHeader">Ваши аудиты</h1>
            </div>
            <div className="audits-container">
                {audits.map((audit) => (
                    <div key={audit.id} className="audit-card">
                        <h3 className="company-name">{audit.companyName}</h3>
                        <div className="audit-info">
                            <p><FaCalendarAlt className="icon"/><strong> Дата начала
                                аудита: </strong> {formatDate(audit.startDate)}</p>
                            <p><FaCalendarAlt className="icon"/><strong> Дата конца
                                аудита: </strong> {formatDate(audit.endDate)}
                            </p>
                            <p><FaCalendarAlt className="icon"/><strong> Неофициальная дата начала
                                аудита: </strong> {formatDate(audit.informalStartDate)}</p>
                            <p><FaCalendarAlt className="icon"/><strong> Неофициальная дата окончания
                                аудита: </strong> {formatDate(audit.informalEndDate)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AuditsPage;
