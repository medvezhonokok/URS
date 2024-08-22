import React, {useState} from 'react';
import {Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {Button} from 'react-bootstrap';
import './AddAuditForm.css';
import {AuditCriterion} from "../../../constants/constants";
import * as client from "../../../data/client";
import {Bounce, toast, ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AddAuditForm = ({isOpen, handleClose, companies, users}) => {
    const [errors, setErrors] = useState('');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [auditData, setAuditData] = useState({
        startDate: null,
        informalStartDate: null,
        endDate: null,
        informalEndDate: null,
        companyId: "",
        userId: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        client.addAudit(auditData)
            .then((ignored) => {
                for (const user of users) {
                    if (user.id === auditData.userId) {
                        user.audits.push(auditData);
                        selectedCompany.user = user;
                        break;
                    }
                }

                selectedCompany.audit = auditData;

                toast('Аудит был добавлен!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });

                setAuditData({
                    startDate: null,
                    informalStartDate: null,
                    endDate: null,
                    informalEndDate: null,
                    companyId: "",
                    userId: ""
                });

                handleClose();
            })
            .catch((err) => {
                setErrors(err.response.data);
            });
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setAuditData({
            ...auditData,
            [name]: value
        });
    };

    const handleCompanyChange = (event) => {
        const companyId = event.target.value;
        const selectedCompany = companies.find(company => company.id === companyId);
        setSelectedCompany(selectedCompany);
        setAuditData({
            ...auditData,
            companyId: companyId,
            companyName: selectedCompany.russianName
        });
    };

    const competentByAuditCriterion = (user) => {
        if (selectedCompany && selectedCompany.auditCriterion) {
            const auditCriterion = selectedCompany.auditCriterion;

            let idx = 0;
            for (const {key} of AuditCriterion) {
                if (key === auditCriterion) {
                    break;
                }
                idx++;
            }

            return user.certificates.split('#')[idx] === '1';
        }

        return false;
    }

    return (
        <div>
            <Modal open={isOpen}
                   onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box className="addAuditFormContainer" component="form" onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Добавление нового аудита
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="company-select-label">Клиент</InputLabel>
                                <Select required={true}
                                        labelId="company-select-label"
                                        id="company-select"
                                        name="companyId"
                                        value={auditData.companyId}
                                        onChange={handleCompanyChange}>
                                    {companies.filter(company => company.audit === null && company.status === 'ACCEPTED')
                                        .map(company => (
                                            <MenuItem key={company.id} value={company.id}>
                                                {company.englishName + `\t(${company.auditCriterion})`}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       required={true}
                                       type="date"
                                       label="Начало аудита"
                                       name="startDate"
                                       value={auditData.startDate}
                                       onChange={handleInputChange}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       required={true}
                                       type="date"
                                       label="Конец аудита"
                                       name="endDate"
                                       value={auditData.endDate}
                                       onChange={handleInputChange}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       required={true}
                                       type="date"
                                       label="Неофициальное начало аудита"
                                       name="informalStartDate"
                                       value={auditData.informalStartDate}
                                       onChange={handleInputChange}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       required={true}
                                       type="date"
                                       label="Неофициальный конец аудита"
                                       name="informalEndDate"
                                       value={auditData.informalEndDate}
                                       onChange={handleInputChange}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="user-select-label">Сотрудник</InputLabel>
                                <Select required={true}
                                        labelId="user-select-label"
                                        id="user-select"
                                        name="userId"
                                        value={auditData.userId}
                                        onChange={handleInputChange}>
                                    {users.filter(user => competentByAuditCriterion(user))
                                        .map(user => (
                                            <MenuItem key={user.id} value={user.id}>
                                                {user.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {errors && <div className="error">{errors}</div>}
                    <div className="modalFooter">
                        <Button className="modalButton" onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button className="modalButton" type="submit">
                            Создать аудит
                        </Button>
                    </div>
                </Box>
            </Modal>
            <ToastContainer/>
        </div>
    );
};

export default AddAuditForm;
