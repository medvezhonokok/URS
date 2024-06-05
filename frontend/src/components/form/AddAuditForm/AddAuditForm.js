import React, {useState} from 'react';
import {Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {Button} from 'react-bootstrap';
import './AddAuditForm.css';
import axios from "axios";
import * as constants from "../../../constants/constants";

const AddAuditForm = ({isOpen, handleClose, companies, users}) => {
    const [errors, setErrors] = useState({});
    const [auditData, setAuditData] = useState({
        title: "",
        about: "",
        startDate: null,
        endDate: null,
        companyId: "",
        userId: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(constants.BACKEND_JAVA_URL + '/audit/add', auditData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((ignored) => {
            alert("Аудит был добавлен");
            setAuditData({
                title: "",
                about: "",
                startDate: null,
                endDate: null,
                companyId: "",
                userId: ""
            });
            handleClose();
        }).catch((ignored) => {
            setErrors({auditOverlap: 'Выбранный аудитор уже занят в выбранные даты'});
        });
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setAuditData({
            ...auditData,
            [name]: value
        });
    };

    const getCompanyInfoString = (company) => {
        return company.companyName + (company.certificate ? `\t(${company.certificate.certificateType})` : "\t(НОВАЯ)");
    };

    const competentByCertificateType = (user) => {
        return true;
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="addAuditFormContainer" component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Добавление нового аудита
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={auditData.title}
                            required={true}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="About"
                            name="about"
                            value={auditData.about}
                            required={true}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required={true}
                            fullWidth
                            type="datetime-local"
                            label="Start Date"
                            name="startDate"
                            value={auditData.startDate}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required={true}
                            type="datetime-local"
                            label="End Date"
                            name="endDate"
                            value={auditData.endDate}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="company-select-label">Компания</InputLabel>
                            <Select
                                required={true}
                                labelId="company-select-label"
                                id="company-select"
                                name="companyId"
                                value={auditData.companyId}
                                onChange={handleInputChange}
                            >
                                {companies
                                    .filter(company => company.certificate !== null)
                                    .map(company => (
                                        <MenuItem key={company.id} value={company.id}>
                                            {getCompanyInfoString(company)}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="user-select-label">Ответственный</InputLabel>
                            <Select
                                required={true}
                                labelId="user-select-label"
                                id="user-select"
                                name="userId"
                                value={auditData.userId}
                                onChange={handleInputChange}
                            >
                                {users
                                    .filter(user => competentByCertificateType(user))
                                    .map(user => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {errors.auditOverlap && <div className="error">{errors.auditOverlap}</div>}
                <div className="modalFooter">
                    <Button className="companiesButton" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button className="companiesButton" type="submit">
                        Создать аудит
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddAuditForm;
