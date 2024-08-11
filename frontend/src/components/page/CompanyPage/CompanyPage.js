import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import './CompanyPage.css';
import * as client from "../../../data/client";
import {AuditCriterion, COMPANY_FIELDS} from "../../../constants/constants";

const CompanyPage = ({user}) => {
    const [company, setCompany] = useState(null);
    const [companyFields, setCompanyFields] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [errors, setErrors] = useState({});
    const {companyId} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCompanyAsync = async () => {
            try {
                const companyById = await client.getCompanyById(companyId);
                setCompany(companyById);
                setCompanyFields(COMPANY_FIELDS(companyById));
                setLoading(false);
            } catch (error) {
                console.error("Failed to get company:", error);
                setLoading(false);
            }
        };

        if (companyId && !company) {
            getCompanyAsync();
        }
    }, [company, companyId]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFields(companyFields.reduce((acc, field) => ({...acc, [field.id]: field.value}), {}));
    };

    const handleSaveClick = async () => {
        if (validateFields()) {
            try {
                await client.updateCompany(companyId, JSON.stringify(editedFields));
                setCompanyFields(companyFields.map(field => ({...field, value: editedFields[field.id]})));
                setIsEditing(false);
            } catch (error) {
                console.error("Failed to save company:", error);
            }
        }
    };

    const validateFields = () => {
        const newErrors = {};
        companyFields.forEach(field => {
            if (!editedFields[field.id]) {
                newErrors[field.id] = "Поле не может быть пустым";
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
                {isEditing
                    ? <Button onClick={handleSaveClick}>Сохранить</Button>
                    : <Button onClick={handleEditClick}>Редактировать</Button>
                }
            </div>
        </div>
        <div className="companyInfo">
            {companyFields.map(field => (
                <FormControl key={field.id} margin="normal" fullWidth variant="standard">
                    {field.id !== "auditCriterion"
                        ? <TextField
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
                        :
                        <>
                            <InputLabel>{field.label}</InputLabel>
                            <Select onChange={isEditing && ((e) => handleFieldChange(field.id, e.target.value))}
                                    disabled={!isEditing}
                                    value={isEditing ? editedFields[field.id] : field.value}>
                                {AuditCriterion.map((type) => (
                                    <MenuItem key={type.key} value={type.key}>
                                        {type.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                    }
                </FormControl>
            ))}
        </div>
        {company.audit && (
            <div className="companyAuditInfo">
                <h2 className="commonPageHeader">АУДИТ</h2>
                <p>Ответственный: <Link to={`/user/${company.user.id}`}>{company.user.name}</Link></p>
                <p>Локация: {company.audit.location}</p>
                <p>Активность: {company.audit.activity}</p>
                <p>Договор: {company.audit.agreement}</p>
                <p>Дата заключительного собрания: {company.audit.closingMeetingDate}</p>
                <p>Дата истечения сертификата: {company.audit.certificateExpirationDate}</p>
                <p>Дата начала аудита: {company.audit.startDate}</p>
                <p>Дата окончания аудита: {company.audit.endDate}</p>
            </div>
        )}
    </div>);
};

export default CompanyPage;
