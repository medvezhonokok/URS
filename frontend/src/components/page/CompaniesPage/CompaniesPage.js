import './CompaniesPage.css';
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import * as storage from "../../../data/storage";
import {addNewCompany} from "../../../data/storage";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import {Box, Grid, Modal, TextField, Typography} from "@mui/material";

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
    {label: "Название организации", name: "companyName"},
    {label: "Фактический адрес организации", name: "companyAddress"},
    {label: "Postal/Zip Code", name: "postalOrZipCode"},
    {label: "Country/State", name: "countryOrState"},
    {label: "ФИО руководителя (без сокращений)", name: "companyCeoName"},
    {label: "Телефон", name: "headPhoneNumber"},
    {label: "E-mail", name: "headEmail"},
    {label: "Web site", name: "webSite"},
    {label: "Контактное лицо", name: "contactPersonName"},
    {label: "E-mail", name: "contactPersonEmail"},
    {label: "ИНН", name: "tin"},
    {label: "ОКВЭД", name: "okved"},
    {label: "Критерий аудита: (Например ISO9001:2015)", name: "requestedAccreditation"},
    {label: "Запрашиваемая аккредитация (UKAS, NABCB, ANAB, Accredia)", name: "requestedAccreditation"},
    {label: "Тип продукции", name: "productType"},
    {label: "Общее количество сотрудников (включая временных сотрудников и совместителей)", name: "totalWorkerCount"},
    {label: "Укажите количество смен", name: "organizationShiftNumber"},
    {label: "Сколько часов длится полный рабочий день?", name: "workingDayDurationHours"},
    {label: "Primary Language", name: "primaryLanguage"},
    {label: "Currency Used", name: "currencyUsed"}
    // TODO: add more fields & names if need
];

const CompaniesPage = ({user}) => {
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});

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
        setFormData({
            ...formData,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(formData));
        addNewCompany(JSON.stringify(formData));
        handleClose();
    };

    return (
        user
            ?
            <div className="usersPageContainer">
                <div className="companiesPageHeader">
                    <h1 className="companiesHeader">Companies: </h1>
                    <div className="companiesAddNewCompanyButton">
                        <Button onClick={handleOpen}><h1>NEW +</h1></Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box component="form" onSubmit={handleSubmit} sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add New Company
                                </Typography>
                                <Grid container spacing={2}>
                                    {formFields.map((field, index) => (
                                        <Grid item xs={12} key={index}>
                                            <TextField
                                                fullWidth
                                                label={field.label}
                                                variant="outlined"
                                                required={true}
                                                onChange={(e) => handleChange(e, field.name)}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <div className="modalFooter">
                                    <Button className="companiesButton" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button className="companiesButton" type="submit">
                                        Create new company
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
                                            {company.companyName}
                                        </a>
                                    </TableCell>
                                    <TableCell>{company.certificate && company.certificate.certificateNumber}</TableCell>
                                    <TableCell>{company.certificate && company.certificate.certificateType}</TableCell>
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
            : null
    );
};

export default CompaniesPage;
