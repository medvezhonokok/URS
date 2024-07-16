import React, {useState} from 'react';
import {Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {Button} from 'react-bootstrap';
import './AddAuditForm.css';
import axios from "axios";
import * as constants from "../../../constants/constants";
import {AuditCriterion} from "../../../data/storage";

const AddAuditForm = ({isOpen, handleClose, companies, users, updateUsersAndCompanies}) => {
    const [errors, setErrors] = useState('');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [auditData, setAuditData] = useState({
        location: "",
        activity: "",
        agreement: "",
        closingMeetingDate: null,
        certificateExpirationDate: null,
        startDate: null,
        endDate: null,
        companyId: "",
        userId: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const jwtToken = localStorage.getItem('jwtToken');

        axios.post(constants.BACKEND_JAVA_URL + `/audit/add?jwt=${jwtToken}`, auditData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((ignored) => {
            const updatedUsers = users.map(user => {
                if (user.id === auditData.userId) {
                    user.audits.push(auditData);
                }
                return user;
            });

            const updatedCompanies = companies.map(company => {
                if (company.id === auditData.companyId) {
                    company.audit = auditData;
                }

                return company;
            })

            updateUsersAndCompanies(updatedUsers, updatedCompanies);

            alert("Аудит был добавлен");
            setAuditData({
                location: "",
                activity: "",
                agreement: "",
                closingMeetingDate: null,
                certificateExpirationDate: null,
                startDate: null,
                endDate: null,
                companyId: "",
                userId: ""
            });
            handleClose();
        }).catch((err) => {
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
                                {companies.filter(company => company.audit === null).map(company => (
                                    <MenuItem key={company.id} value={company.id}>
                                        {company.englishName + `\t(${company.auditCriterion})`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   label="Локация"
                                   name="location"
                                   value={auditData.location}
                                   required={true}
                                   onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   label="Активность"
                                   name="activity"
                                   value={auditData.activity}
                                   required={true}
                                   onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   label="Договор"
                                   name="agreement"
                                   value={auditData.agreement}
                                   required={true}
                                   onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   required={true}
                                   type="date"
                                   label="Заключительное совещание"
                                   name="closingMeetingDate"
                                   value={auditData.closingMeetingDate}
                                   onChange={handleInputChange}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                                   required={true}
                                   type="date"
                                   label="Сертификат действителен до:"
                                   name="certificateExpirationDate"
                                   value={auditData.certificateExpirationDate}
                                   onChange={handleInputChange}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}/>
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
    );
};

export default AddAuditForm;
