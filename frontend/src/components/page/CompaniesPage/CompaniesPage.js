import './CompaniesPage.css';
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import * as storage from "../../../data/storage";
import {addNewCompany, AuditCriterion} from "../../../data/storage";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import {
    Box,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";

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
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        storage.getCompanies().then(
            companiesJson => {
                setCompanies(companiesJson);
                setLoading(false);
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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleChange = (event, name) => {
        setCompanyCredentials({
            ...companyCredentials,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewCompany(JSON.stringify(companyCredentials)).then((company) => {
            setCompanies([...companies, company]);
        });
        handleClose();
    };

    const filteredCompanies = companies.filter((company) =>
        company.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.russianName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        user
            ? <div className="commonPageContainer">
                <div className="commonPageHeader">
                    <h1 className="commonPageHeader">Клиенты</h1>

                    <div className="headerButtonContainer">
                        <Button onClick={handleOpen}>ДОБАВИТЬ +</Button>
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
                    </div>
                </div>
                <TextField
                    label="Поиск по названию компании"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    margin="normal"
                />
                {loading ? (
                    <div className="loadingContainer">
                        <CircularProgress/>
                    </div>
                ) : (
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="companies table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
                                    <TableCell>Страна или штат</TableCell>
                                    <TableCell>ФИО контактного лица</TableCell>
                                    <TableCell>ИНН</TableCell>
                                    <TableCell>Код по ОКВЭД</TableCell>
                                    <TableCell>Аудит</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                        ? filteredCompanies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : filteredCompanies
                                ).map((company) => (
                                    <TableRow key={company.id}>
                                        <TableCell>
                                            <Link to={`/company/${company.id}`}>
                                                {company.englishName}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{company.countryOrState}</TableCell>
                                        <TableCell>{company.russianContactPersonName}</TableCell>
                                        <TableCell>{company.tin}</TableCell>
                                        <TableCell>{company.okved}</TableCell>
                                        <TableCell>{company.audit ? "Есть" : "Отсутствует"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filteredCompanies.length}
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
