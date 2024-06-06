import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {FormControl, Input, InputLabel} from "@mui/material";
import './CompanyPage.css';
import * as storage from "../../../data/storage";

const CompanyPage = ({user}) => {
    const [company, setCompany] = useState(null);
    const [companyFields, setCompanyFields] = useState([]);
    const {companyId} = useParams();

    useEffect(() => {
        const getCompanyAsync = async () => {
            try {
                const companyById = await storage.getCompanyById(companyId);
                setCompany(companyById);
                setCompanyFields(
                    [
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
                        }
                    ]
                )
            } catch (error) {
                console.error("Failed to get company:", error);
            }
        };

        if (companyId && !company) {
            getCompanyAsync();
        }
    }, [companyId]);

    if (!user || !companyId) {
        return null;
    }

    return (
        company
            ? <div className="usersPageContainer">
                <h1 className="companiesHeader">Компания: {company.englishName}</h1>
                <div className="companyInfo">
                    {companyFields.map(field => (
                        <FormControl key={field.id} margin="normal" fullWidth variant="standard">
                            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                            <Input id={field.id} value={field.value} disabled/>
                        </FormControl>
                    ))}
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
