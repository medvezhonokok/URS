import React from 'react';
import {Button} from "react-bootstrap";
import {Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {AuditCriterion} from "../../../constants/constants";
import './AddCompanyForm.css';

const formFields = [
    {label: "Название организации [en]", name: "englishName"},
    {label: "Название организации [ru]", name: "russianName"},
    {label: "Фактический адрес организации [en]", name: "englishAddress"},
    {label: "Фактический адрес организации [ru]", name: "russianAddress"},
    {label: "Postal/Zip Code", name: "postalOrZipCode"},
    {label: "Country/State", name: "countryOrState"},
    {label: "ФИО руководителя (без сокращений) [en]", name: "englishManagerName"},
    {label: "ФИО руководителя (без сокращений) [ru]", name: "russianManagerName"},
    {label: "Должность руководителя", name: "managerPosition"},
    {label: "Телефон руководителя", name: "managerPhoneNumber"},
    {label: "E-mail руководителя", name: "managerEmail"},
    {label: "Web site", name: "webSite"},
    {label: "ФИО контактного лица [en]", name: "englishContactPersonName"},
    {label: "ФИО контактного лица [ru]", name: "russianContactPersonName"},
    {label: "Должность контактного лица", name: "contactPersonPosition"},
    {label: "E-mail контактного лица", name: "contactPersonEmail"},
    {label: "ИНН", name: "tin"},
    {label: "ОКВЭД", name: "okved"},
    {label: "Область сертифицирования [en]", name: "englishCertificationScope"},
    {label: "Область сертифицирования [ru]", name: "russianCertificationScope"},
    {label: "Критерий аудита", name: "auditCriterion"},
    {label: "Дата заключительного собрания", name: "closingMeetingDate"},
    {label: "Дата истечения сертификата", name: "certificateExpirationDate"},
];

const AddCompanyForm = ({open, handleClose, handleSubmit, handleChange, companyCredentials}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="addAuditFormContainer" component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Добавление нового клиента
                </Typography>
                <Grid container spacing={2}>
                    {formFields.map((field, index) => (
                        <Grid item xs={12} key={index}>
                            {field.name === "auditCriterion" ? (
                                <FormControl fullWidth variant="outlined" required>
                                    <InputLabel>{field.label}</InputLabel>
                                    <Select
                                        onChange={(e) => handleChange(e, field.name)}
                                        label={field.label}
                                        defaultValue=""
                                    >
                                        {AuditCriterion.map((type) => (
                                            <MenuItem key={type.key} value={type.key}>
                                                {type.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <TextField
                                    fullWidth
                                    label={field.label}
                                    variant="outlined"
                                    required={true}
                                    onChange={(e) => handleChange(e, field.name)}
                                    value={companyCredentials[field.name] || ''}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
                <div className="modalFooter">
                    <Button className="modalButton" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button className="modalButton" type="submit">
                        Создать
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddCompanyForm;
