import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {CircularProgress, FormControl, Input, InputLabel, List, ListItem} from "@mui/material";
import * as storage from "../../../data/storage";
import {AuditCriterion} from "../../../data/storage";
import "./UserPage.css";

const UserPage = ({user}) => {
    const {userId} = useParams();
    const [userById, setUserById] = useState(null);
    const [userFields, setUserFields] = useState([]);
    const [userAuditCriterionList, setUserAuditCriterionList] = useState([]);
    const [userAudits, setUserAudits] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getUserAsync = async () => {
            try {
                const userJson = await storage.getUserById(userId);
                if (userJson) {
                    const userAvailableAuditCriterion = userJson.certificates.split('#')
                        .map((cert, index) => cert === "1" ? AuditCriterion[index].value : null)
                        .filter(cert => cert !== null);

                    setUserAuditCriterionList(userAvailableAuditCriterion);

                    setUserFields([
                        {label: "ФИО", value: userJson.name, id: "name"},
                        {label: "Номер телефона", value: userJson.phoneNumber, id: "phoneNumber"},
                        // Add more fields as necessary
                    ]);

                    setUserAudits(userJson.audits || []);

                    setUserById(userJson);
                }
            } catch (error) {
                console.error("Failed to get user:", error);
            }
        };

        if (userId) {
            getUserAsync();
        }
    }, [userId]);

    if (!user || !userId) {
        return null;
    }

    if (loading) {
        return <div className="loadingContainer"><CircularProgress /></div>;
    }

    return (
        userById ? (
            <div className="usersPageContainer">
                <h1 className="companiesHeader">Профиль сотрудника</h1>
                <div className="userInfo">
                    {userFields.map(field => (
                        <FormControl key={field.id} margin="normal" fullWidth variant="standard">
                            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                            <Input id={field.id} value={field.value} disabled/>
                        </FormControl>
                    ))}
                    <h2>Аккредитация эксперта:</h2>
                    {userAuditCriterionList && userAuditCriterionList.length > 0 ? (
                        <List>
                            {userAuditCriterionList.map((certificate, index) => (
                                <ListItem style={{background: "#83d10b"}} key={index}>
                                    {certificate}
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p>Нет доступной аккредитации.</p>
                    )}
                    <h2>Аудиты:</h2>
                    {userAudits && userAudits.length > 0 ? (
                        <List className="auditList">
                            {userAudits.map(audit => (
                                <ListItem key={audit.id} className="auditItem">
                                    <div>Компания: {audit.companyName}</div>
                                    <div>Активность: {audit.activity}</div>
                                    <div>Локация: {audit.location}</div>
                                    <div>Договор: {audit.agreement}</div>
                                    <div>Дата заключительного
                                        собрания: {new Date(audit.closingMeetingDate).toLocaleDateString()}</div>
                                    <div>Дата истечения
                                        сертификата: {new Date(audit.certificateExpirationDate).toLocaleDateString()}</div>
                                    <div className="auditDates">
                                        <span>Дата начала аудита: {new Date(audit.startDate).toLocaleDateString()}</span>
                                        <span>Дата окончания аудита: {new Date(audit.endDate).toLocaleDateString()}</span>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p>Нет доступных аудитов.</p>
                    )}
                </div>
            </div>
        ) : (
            <div>No such user</div>
        )
    );
};

export default UserPage;
