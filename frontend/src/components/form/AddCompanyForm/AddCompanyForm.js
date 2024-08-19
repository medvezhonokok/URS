import React from 'react';
import {Button} from "react-bootstrap";
import {Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {AuditCriterion, COMPANY_FIELDS, CompanyStatus} from "../../../constants/constants";
import './AddCompanyForm.css';

const AddCompanyForm = ({open, handleClose, handleSubmit, handleChange, companyCredentials}) => {
    const emptyCompanyFields = COMPANY_FIELDS({
        englishName: '',
        russianName: '',
        englishAddress: '',
        russianAddress: '',
        postalOrZipCode: '',
        countryOrState: '',
        englishManagerName: '',
        russianManagerName: '',
        managerPosition: '',
        managerPhoneNumber: '',
        managerEmail: '',
        webSite: '',
        englishContactPersonName: '',
        russianContactPersonName: '',
        contactPersonPosition: '',
        contactPersonEmail: '',
        tin: '',
        okved: '',
        activity: '',
        location: '',
        agreement: '',
        englishCertificationScope: '',
        russianCertificationScope: '',
        auditCriterion: '',
        certificateNumber: '',
        closingMeetingDate: '',
        certificateExpirationDate: '',
        status: '',
    });

    return (
        <Modal open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box className="addAuditFormContainer" component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Добавление нового клиента
                </Typography>
                <Grid container spacing={2}>
                    {emptyCompanyFields.map((field, index) => (
                        <Grid item xs={12} key={index}>
                            {field.name === "auditCriterion" || field.name === "status"
                                ? (<FormControl fullWidth variant="outlined" required>
                                    <InputLabel>{field.label}</InputLabel>
                                    <Select onChange={(e) => handleChange(e, field.name)}
                                            defaultValue="">
                                        {field.name === "auditCriterion"
                                            ? AuditCriterion.map((type) => (
                                                <MenuItem key={type.key} value={type.key}>
                                                    {type.value}
                                                </MenuItem>))
                                            : CompanyStatus.map((type) => (
                                                <MenuItem key={type.key} value={type.key}>
                                                    {type.value}
                                                </MenuItem>))
                                        }
                                    </Select>
                                </FormControl>)
                                : (<TextField
                                    type={field.type ? field.type : 'text'}
                                    fullWidth
                                    label={field.label}
                                    variant="outlined"
                                    required={true}
                                    onChange={(e) => handleChange(e, field.name)}
                                    value={companyCredentials[field.name] || ''}
                                />)}
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
