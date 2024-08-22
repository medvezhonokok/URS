import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import './CompanyPage.css';
import * as client from "../../../data/client";
import {AuditCriterion, COMPANY_FIELDS, CompanyStatus} from "../../../constants/constants";
import {FaCalendarAlt} from "react-icons/fa";
import AddAuditForm from "../../form/AddAuditForm/AddAuditForm";

const CompanyPage = ({user}) => {
    const [company, setCompany] = useState(null);
    const [users, setUsers] = useState([]);
    const [companyFields, setCompanyFields] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [errors, setErrors] = useState({});
    const {companyId} = useParams();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (users.length === 0) {
            client.getUsers()
                .then(usersJson => {
                    setUsers(usersJson);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, []);

    useEffect(() => {
        if (companyId && !company) {
            client.getCompanyById(companyId)
                .then((companyById) => {
                    setCompany(companyById);
                    setCompanyFields(COMPANY_FIELDS(companyById));
                    setLoading(false);
                })
                .catch(err => {
                    console.log('Error while getting company', err);
                });
        }
    }, [company, companyId]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFields(companyFields.reduce((acc, field) => ({...acc, [field.name]: field.value}), {}));
    };

    const handleSaveClick = async () => {
        if (validateFields()) {
            try {
                await client.updateCompany(companyId, JSON.stringify(editedFields));
                setCompanyFields(companyFields.map(field => ({...field, value: editedFields[field.name]})));
                setIsEditing(false);
            } catch (error) {
                console.error("Failed to save company:", error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('ru-RU', options);
    };

    const validateFields = () => {
        const newErrors = {};
        companyFields.forEach(field => {
            if (!editedFields[field.name]) {
                newErrors[field.name] = "Поле не может быть пустым";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (id, value) => {
        setEditedFields(prevState => ({...prevState, [id]: value}));
        setErrors(prevState => ({...prevState, [id]: !value ? "Поле не может быть пустым" : ""}));
    };

    if (!user || !companyId || !company) {
        return null;
    }

    if (loading) {
        return <div className="loadingContainer"><CircularProgress/></div>;
    }

    return (<div>
        <div className="commonPageHeader">
            <h1 className="commonPageHeader">Компания "{company.englishName}"</h1>
            <div className="headerButtonContainer">
                {company.status === "ACCEPTED" && !company.audit && (
                    <Button onClick={() => setIsModalOpen(true)}>Запланировать аудит</Button>
                )}
                {isEditing
                    ? <Button onClick={handleSaveClick}>Сохранить</Button>
                    : <Button onClick={handleEditClick}>Редактировать</Button>
                }
                <AddAuditForm isOpen={isModalOpen}
                              handleClose={() => setIsModalOpen(false)}
                              companies={[company]}
                              users={users}
                />
            </div>
        </div>
        <div className="companyInfo">
            {companyFields.map(field => (
                <FormControl margin="normal" fullWidth variant="outlined" required>
                    {field.name !== "auditCriterion" && field.name !== "status"
                        ? <TextField
                            type={field.type ? field.type : 'text'}
                            fullWidth
                            label={field.label}
                            value={isEditing ? editedFields[field.name] : field.value}
                            required={true}
                            onChange={isEditing && ((e) => handleFieldChange(field.name, e.target.value))}
                            disabled={!isEditing}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]}/>
                        : <>
                            <InputLabel>{field.label}</InputLabel>
                            <Select onChange={isEditing && ((e) => handleFieldChange(field.name, e.target.value))}
                                    disabled={!isEditing}
                                    label={field.label}
                                    value={isEditing ? editedFields[field.name] : field.value}>
                                {field.name === "auditCriterion"
                                    ? AuditCriterion.map((type) => (
                                        <MenuItem key={type.key} value={type.key}>
                                            {type.value}
                                        </MenuItem>
                                    ))
                                    : CompanyStatus.map((type) => (
                                        <MenuItem key={type.key} value={type.key}>
                                            {type.value}
                                        </MenuItem>
                                    ))}
                            </Select></>
                    }
                </FormControl>
            ))}
        </div>
        {company.audit && (
            <div className="audit-card">
                <h2 className="commonPageHeader">АУДИТ</h2>
                <h3 className="company-name">{company.audit.companyName}</h3>
                <div className="audit-info">
                    <p>Активность: {company.audit.activity}</p>
                    <p>Договор: {company.audit.agreement}</p>
                    <p>Локация: {company.audit.location}</p>
                    <p>Ответственный: <Link to={`/user/${company.user.id}`}> {company.user.name}</Link></p>
                    <p><FaCalendarAlt className="icon"/><strong> Дата начала
                        аудита: </strong> {formatDate(company.audit.startDate)}</p>
                    <p><FaCalendarAlt className="icon"/><strong> Дата конца
                        аудита: </strong> {formatDate(company.audit.endDate)}
                    </p>
                    <p><FaCalendarAlt className="icon"/><strong> Неофициальная дата начала
                        аудита: </strong> {formatDate(company.audit.informalStartDate)}</p>
                    <p><FaCalendarAlt className="icon"/><strong> Неофициальная дата окончания
                        аудита: </strong> {formatDate(company.audit.informalEndDate)}</p>
                </div>
            </div>
        )}
    </div>);
};

export default CompanyPage;
