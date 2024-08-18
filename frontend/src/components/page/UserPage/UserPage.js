import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, CircularProgress, FormControl, List, ListItem, TextField} from '@mui/material';
import * as client from '../../../data/client';
import {AuditCriterion, USER_FIELDS} from '../../../constants/constants';
import './UserPage.css';
import {FaCalendarAlt} from "react-icons/fa";

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('ru-RU', options);
    };

    if (loading) {
        return <div className="loadingContainer"><CircularProgress/></div>;
    }

    if (!userById) {
        return <div>
            No such user.
        </div>
    }

    return (<div>
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
                {user.id !== parseInt(userId) && (userAuditCriterionList && userAuditCriterionList.length > 0
                    ? (<>
                        <h2>Аккредитация эксперта:</h2>
                        <List>
                            {userAuditCriterionList.map((certificate, index) => (
                                <ListItem style={{background: '#83d10b'}} key={index}>
                                    {certificate}
                                </ListItem>
                            ))}
                        </List>
                    </>)
                    : (<p>Нет доступной аккредитации.</p>))}
                {user.id !== parseInt(userId) && (userAudits && userAudits.length > 0
                    ? (<>
                        <h2>Аудиты сотрудника:</h2>
                        <List className="auditList">
                            {userAudits.map(audit => (
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
                        </List>
                    </>)
                    : (<p>Нет доступных аудитов.</p>))}
            </div>
        </div>
    );
};

export default UserPage;
