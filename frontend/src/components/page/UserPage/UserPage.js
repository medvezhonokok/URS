import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { FormControl, Input, InputLabel, List, ListItem } from "@mui/material";
import * as storage from "../../../data/storage";
import { CertificateTypes } from "../../../data/storage";
import "./UserPage.css";

const UserPage = ({ user }) => {
    const { userId } = useParams();
    const [userById, setUserById] = useState(null);
    const [userFields, setUserFields] = useState([]);
    const [userCertificatesList, setUserCertificatesList] = useState([]);
    const [userAudits, setUserAudits] = useState([]);

    useEffect(() => {
        const getUserAsync = async () => {
            try {
                const userJson = await storage.getUserById(userId);
                if (userJson) {
                    const userAvailableCertificates = userJson.certificates.split('#')
                        .map((cert, index) => cert === "1" ? CertificateTypes[index].value : null)
                        .filter(cert => cert !== null);

                    setUserCertificatesList(userAvailableCertificates);

                    setUserFields([
                        { label: "ФИО", value: userJson.name, id: "name" },
                        { label: "Номер телефона", value: userJson.phoneNumber, id: "phoneNumber" },
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

    return (
        userById ? (
            <div className="usersPageContainer">
                <h1 className="companiesHeader">Профиль сотрудника</h1>
                <div className="userInfo">
                    {userFields.map(field => (
                        <FormControl key={field.id} margin="normal" fullWidth variant="standard">
                            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                            <Input id={field.id} value={field.value} disabled />
                        </FormControl>
                    ))}
                    <h2>Список доступных сертификатов сотрудника:</h2>
                    {userCertificatesList && userCertificatesList.length > 0 ? (
                        <List >
                            {userCertificatesList.map((certificate, index) => (
                                <ListItem style={{background: "#83d10b"}} key={index}>
                                    {certificate}
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p>Нет доступных сертификатов.</p>
                    )}
                    <h2>Аудиты:</h2>
                    {userAudits && userAudits.length > 0 ? (
                        <List className="auditList">
                            {userAudits.map(audit => (
                                <ListItem key={audit.id} className="auditItem">
                                    <div>Компания: {audit.companyName}</div>
                                    <div>Название: {audit.title}</div>
                                    <div>Описание: {audit.about}</div>
                                    <div className="auditDates">
                                        <span>Дата начала: {new Date(audit.startDate).toLocaleDateString()}</span>
                                        <span>Дата окончания: {new Date(audit.endDate).toLocaleDateString()}</span>
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
