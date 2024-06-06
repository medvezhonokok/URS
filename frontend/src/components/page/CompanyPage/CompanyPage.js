import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import './CompanyPage.css';
import * as storage from "../../../data/storage";
import {CertificateTypes} from "../../../data/storage";


const CompanyPage = ({user}) => {
    const [company, setCompany] = useState(null);
    const [companyFields, setCompanyFields] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const {companyId} = useParams();

    useEffect(() => {
        const getCompanyAsync = async () => {
            try {
                const companyById = await storage.getCompanyById(companyId);
                setCompany(companyById);
                setCompanyFields(
                    [
                        {label: "Название (английский)", value: companyById.englishName, id: "englishName"},
                        {label: "Название (русский)", value: companyById.russianName, id: "russianName"},
                        {label: "Адрес (английский)", value: companyById.englishAddress, id: "englishAddress"},
                        {label: "Адрес (русский)", value: companyById.russianAddress, id: "russianAddress"},
                        {label: "Почтовый/Почтовый индекс", value: companyById.postalOrZipCode, id: "postalOrZipCode"},
                        {label: "Страна/Штат", value: companyById.countryOrState, id: "countryOrState"},
                        {
                            label: "ФИО руководителя (английский)",
                            value: companyById.englishManagerName,
                            id: "englishManagerName"
                        },
                        {
                            label: "ФИО руководителя (русский)",
                            value: companyById.russianManagerName,
                            id: "russianManagerName"
                        },
                        {label: "Должность руководителя", value: companyById.managerPosition, id: "managerPosition"},
                        {
                            label: "Телефон руководителя",
                            value: companyById.managerPhoneNumber,
                            id: "managerPhoneNumber"
                        },
                        {label: "E-mail руководителя", value: companyById.managerEmail, id: "managerEmail"},
                        {label: "Web сайт", value: companyById.webSite, id: "webSite"},
                        {
                            label: "ФИО контактного лица (английский)",
                            value: companyById.englishContactPersonName,
                            id: "englishContactPersonName"
                        },
                        {
                            label: "ФИО контактного лица (русский)",
                            value: companyById.russianContactPersonName,
                            id: "russianContactPersonName"
                        },
                        {
                            label: "Должность контактного лица",
                            value: companyById.contactPersonPosition,
                            id: "contactPersonPosition"
                        },
                        {
                            label: "E-mail контактного лица",
                            value: companyById.contactPersonEmail,
                            id: "contactPersonEmail"
                        },
                        {label: "ИНН", value: companyById.tin, id: "tin"},
                        {label: "ОКВЭД", value: companyById.okved, id: "okved"},
                        {
                            label: "Область сертификации (английский)",
                            value: companyById.englishCertificationScope,
                            id: "englishCertificationScope"
                        },
                        {
                            label: "Область сертификации (русский)",
                            value: companyById.russianCertificationScope,
                            id: "russianCertificationScope"
                        },
                        {label: "Критерий аудита", value: companyById.certificate.auditCriterion, id: "auditCriterion"}
                    ]
                );
            } catch (error) {
                console.error("Failed to get company:", error);
            }
        };

        if (companyId && !company) {
            getCompanyAsync();
        }
    }, [companyId]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFields(companyFields.reduce((acc, field) => ({...acc, [field.id]: field.value}), {}));
    };

    const handleSaveClick = async () => {
        try {
            await storage.updateCompany(companyId, JSON.stringify(editedFields));
            console.log(editedFields);

            setCompanyFields(companyFields.map(field => ({...field, value: editedFields[field.id]})));
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save company:", error);
        }
    };

    const handleFieldChange = (id, value) => {
        setEditedFields(prevState => ({...prevState, [id]: value}));
    };

    if (!user || !companyId) {
        return null;
    }

    return (
        company
            ? <div className="usersPageContainer">
                <div className="companiesPageHeader">
                    <h1 className="companiesHeader">Компания: {company.englishName}</h1>
                    <div className="companiesAddNewCompanyButton">
                        {/*TODO CEO*/}
                        {isEditing
                            ? <Button onClick={handleSaveClick}>Сохранить</Button>
                            : <Button onClick={handleEditClick}>Редактировать</Button>
                        }
                    </div>
                </div>

                <div className="companyInfo">
                {companyFields.map(field => {
                        return field.id !== "auditCriterion" ? (

                                <FormControl key={field.id} margin="normal" fullWidth variant="standard">
                                    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                                    <Input
                                        id={field.id}
                                        value={isEditing ? editedFields[field.id] : field.value}
                                        onChange={isEditing && ((e) => handleFieldChange(field.id, e.target.value))}
                                        disabled={!isEditing}
                                    />
                                </FormControl>
                            )
                            :
                            (<FormControl key={field.id} margin="normal" fullWidth variant="standard">
                                <Select
                                    onChange={isEditing && ((e) => handleFieldChange(field.id, e.target.value))}
                                    disabled={!isEditing}
                                    label={field.label}
                                    value={isEditing ? editedFields[field.id] : field.value}
                                >
                                    {CertificateTypes.map((type) => (
                                        <MenuItem key={type.key} value={type.key}>
                                            {type.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>);
                    })}
                </div>

                {company.audit && (
                    <div className="auditInfo">
                        <h2 className="companiesHeader">АУДИТ</h2>
                        <p>Ответственный: <a href={`/user/${company.user.id}`}>{company.user.name}</a></p>
                        <p>Дата начала аудита: {company.audit.startDate}</p>
                        <p>Дата окончания аудита: {company.audit.endDate}</p>
                    </div>
                )}
            </div>
            : <p>Компания не найдена</p>
    );
};

export default CompanyPage;
