import './CompaniesPage.css';
import SideBarMenu from "../../SideBarMenu/SideBarMenu";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import * as storage from "../../../data/storage";
import {addNewCompany, CertificateTypes} from "../../../data/storage";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import {Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};

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
    // TODO.....
];

const CompaniesPage = ({user}) => {
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [companyCredentials, setCompanyCredentials] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        storage.getCompanies().then(
            companiesJson => {
                setCompanies(companiesJson)
            }
        );
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (event, name) => {
        setCompanyCredentials({
            ...companyCredentials,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewCompany(JSON.stringify(companyCredentials));
        setCompanies([...companies, companyCredentials]);
        handleClose();
    };

    return (
        user
            ? <SideBarMenu user={user} children={
                <div className="usersPageContainer">
                    <div className="companiesPageHeader">
                        <h1 className="companiesHeader">Клиенты: </h1>
                        <div className="companiesAddNewCompanyButton">
                            <Button onClick={handleOpen}><h1>ДОБАВИТЬ +</h1></Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box component="form" onSubmit={handleSubmit} sx={style}>
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
                                                            {CertificateTypes.map((type) => (
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
                                                    />
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <div className="modalFooter">
                                        <Button className="companiesButton" onClick={handleClose}>
                                            Отмена
                                        </Button>
                                        <Button className="companiesButton" type="submit">
                                            Создать
                                        </Button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="companies table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell>Certificate №</TableCell>
                                    <TableCell>Certificate type</TableCell>
                                    <TableCell>About</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                        ? companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : companies
                                ).map(company => (
                                    <TableRow key={company.id}>
                                        <TableCell>
                                            <a href={`/company/${company.id}`}>
                                                {company.englishName}
                                            </a>
                                        </TableCell>
                                        <TableCell>{company.certificate && company.certificate.certificateNumber}</TableCell>
                                        <TableCell>{company.certificate && company.certificate.auditCriterion}</TableCell>
                                        <TableCell>{company.about}</TableCell>
                                        <TableCell>{company.inProcess === true ? "in process" : "not in process"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={companies.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            }/>
            : null
    );
};

export default CompaniesPage;
