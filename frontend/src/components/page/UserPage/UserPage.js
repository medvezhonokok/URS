import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, CircularProgress, FormControl, List, ListItem, TextField} from '@mui/material';
import * as client from '../../../data/client';
import {AuditCriterion, USER_FIELDS} from '../../../constants/constants';
import './UserPage.css';

const UserPage = ({user}) => {
    const {userId} = useParams();
    const [userById, setUserById] = useState(null);
    const [userFields, setUserFields] = useState([]);
    const [userAuditCriterionList, setUserAuditCriterionList] = useState([]);
    const [userAudits, setUserAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const getUserAsync = async () => {
            try {
                const userJson = await client.getUserById(userId);
                if (userJson) {
                    const userAvailableAuditCriterion = userJson.certificates.split('#')
                        .map((cert, index) => cert === '1' ? AuditCriterion[index].value : null)
                        .filter(cert => cert !== null);

                    setUserAuditCriterionList(userAvailableAuditCriterion);
                    setUserFields(USER_FIELDS(userJson));
                    setUserAudits(userJson.audits || []);
                    setLoading(false);
                    setUserById(userJson);
                }
            } catch (error) {
                console.error('Failed to get user:', error);
            }
        };

        if (userId) {
            getUserAsync();
        }
    }, [userId]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFields(userFields.reduce((acc, field) => ({...acc, [field.id]: field.value}), {}));
    };

    const handleSaveClick = async () => {
        if (validateFields()) {
            try {
                await client.updateUser(userId, JSON.stringify(editedFields));
                setUserFields(userFields.map(field => ({...field, value: editedFields[field.id]})));
                setIsEditing(false);
            } catch (error) {
                console.error('Failed to update user credentials:', error);
            }
        }
    };

    const validateFields = () => {
        const newErrors = {};
        userFields.forEach(field => {
            if (!editedFields[field.id]) {
                newErrors[field.id] = 'Поле не может быть пустым';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (id, value) => {
        setEditedFields(prevState => ({...prevState, [id]: value}));
        setErrors(prevState => ({...prevState, [id]: !value ? 'Поле не может быть пустым' : ''}));
    };

    if (loading) {
        return <div className="loadingContainer"><CircularProgress/></div>;
    }

    return (
        userById
            ? (<div className="commonPageContainer">
                <div className="commonPageHeader">
                    <h1 className="commonPageHeader">{user.id === parseInt(userId)
                        ? "Личный кабинет"
                        : "Профиль сотрудника"}</h1>
                    {user.id === parseInt(userId) && (
                        <div className="headerButtonContainer">
                            {isEditing
                                ? <Button onClick={handleSaveClick}>Сохранить</Button>
                                : <Button onClick={handleEditClick}>Редактировать</Button>
                            }
                        </div>
                    )}
                </div>
                <div className="userInfo">
                    {userFields.map(field => (
                        <FormControl key={field.id} margin="normal" fullWidth variant="standard">
                            <TextField
                                fullWidth
                                label={field.label}
                                name={field.label}
                                value={isEditing ? editedFields[field.id] : field.value}
                                required
                                onChange={isEditing && ((e) => handleFieldChange(field.id, e.target.value))}
                                disabled={!isEditing}
                                error={!!errors[field.id]}
                                helperText={errors[field.id]}
                            />
                        </FormControl>
                    ))}
                    <h2>Аккредитация эксперта:</h2>
                    {userAuditCriterionList && userAuditCriterionList.length > 0
                        ? (<List>
                            {userAuditCriterionList.map((certificate, index) => (
                                <ListItem style={{background: '#83d10b'}} key={index}>
                                    {certificate}
                                </ListItem>
                            ))}
                        </List>)
                        : (<p>Нет доступной аккредитации.</p>)}
                    <h2>Аудиты сотрудника:</h2>
                    {userAudits && userAudits.length > 0
                        ? (<List className="auditList">
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
                        </List>)
                        : (<p>Нет доступных аудитов.</p>)}
                </div>
            </div>)
            : (<div>No such user</div>)
    );
};

export default UserPage;
