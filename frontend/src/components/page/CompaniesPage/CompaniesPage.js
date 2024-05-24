import './CompaniesPage.css';
import SideBarMenu from "../../SideBarMenu/SideBarMenu";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import * as storage from "../../../data/storage";
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
    {label: "Название организации"}, // companyName
    {label: "Фактический адрес организации"}, // companyAddress
    {label: "Postal/Zip Code"}, //postalOrZipCode
    {label: "Country/State"},
    {label: "ФИО руководителя (без сокращений)"},
    {label: "Телефон"},
    {label: "E-mail"},
    {label: "Web site"},
    {label: "Контактное лицо"},
    {label: "E-mail"},
    {label: "ИНН"},
    {label: "ОКВЭД"},
    {label: "Критерий аудита: (Например ISO9001:2015)"}, // TODO....
    {label: "Запрашиваемая аккредитация (UKAS, NABCB, ANAB, Accredia)"},
    {label: "Тип продукции"},
    {label: "Общее количество сотрудников (включая временных сотрудников и совместителей)"},
    {label: "Укажите количество смен"},
    {label: "Сколько часов длится полный рабочий день?"},
    {label: "Primary Language"},
    {label: "Currency Used"},
    {label: "Дата"}


    // {label: "E-mail", required: true},
    // {label: "Web Site:", required: true},
    // {label: "Контактное лицо (на русском и английском яз.)", required: true},
    // {label: "Должность", required: true},
    // {label: "ИНН", required: true},
    // {label: "ОКВЭД", required: true},
    // {label: "Область сертификации (Точная формулировка на русском и английском языках)", required: true},
    // {label: "Критерий аудита: (Например ISO9001:2015)", required: true},
    // {label: "Запрашиваемая аккредитация (UKAS, NABCB, ANAB, Accredia)", required: true},
    // {label: "Кратко опишите ваши основные процессы и функции, которые относятся к заявляемой области", required: true},
    // {label: "Тип продукции", required: true},
    // {label: "Общее количество сотрудников (включая временных сотрудников и совместителей)", required: true},
    // {label: "Организация работает в несколько смен?", required: true},
    // {label: "Укажите количество смен", required: true},
    // {label: "Максимальное количество сотрудников, находящихся в организации одновременно", required: true},
    // {label: "Количество сотрудников, работающих неполный рабочий день", required: true},
    // {label: "Приблизительное количество сотрудников работающих по совместительству:", required: true},
    // {label: "Совместители работают полный рабочий день?", required: true},
    // {label: "Совместители выполняют однотипную работу?", required: true},
    // {label: "Среднее количество часов, отрабатываемых сотрудниками в день (для сотрудников, которые работают неполный рабочий день)", required: true},
    // {label: "Сколько часов длится полный рабочий день?", required: true},
    // {label: "Количество сотрудников (исключая совместителей), которые выполняют однотипную работу? (например 300 швей-мотористок)", required: true},
    // {label: "Количество сотрудников в отделе проектирования/разработки?", required: true},
    // {label: "Есть ли исключения из требований стандарта?", required: true},
    // {label: "Please state which clause(s)", required: true},
    // {label: "Primary Language", required: true},
    // {label: "Currency Used", required: true},
    // {label: "Это новая заявка или расширение области?", required: true},
    // {label: "Если Вы имеете сертификаты ROS-Group (URS или GRI) по другим стандартам, пожалуйста укажите № сертификата и Стандарт", required: true},
    // {label: "Вы переходите из другого органа по сертификации?", required: true},
    // {label: "Если да, то приложите к анкете копию сертификата, а также отчеты по аудитам за весь последний сертификационный", required: true},
    // {label: "Have you engaged a consultant to assist with the implementation of your Management System", required: true},
    // {label: "If Yes, Full details of consultant used", required: true},
    // {label: "Please provide information about any non-native language spoken in your organisation", required: true},
    // {label: "How do you prefer to receive correspondence?", required: true},
    // {label: "Есть ли у вас дополнительные площадки включаемые в сертификацию?", required: true},
    // {label: "Укажите планируемые сроки проведения аудита", required: true},
    // {label: "Подпись", required: true},
    // {label: "Расшифровка подписи", required: true},
    // {label: "Дата", required: true},
];

const CompaniesPage = ({user}) => {
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = React.useState(false);
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

    const handleChange = (event, label) => {
        setFormData({
            ...formData,
            [label]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Form Submitted with data: ' + JSON.stringify(formData));
        handleClose();
    };

    return (
        user
            ? <SideBarMenu user={user} children={
                <div>
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
                                                    onChange={(e) => handleChange(e, field.label)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <div className="modalFooter">
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Save Changes
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
                                        <TableCell>{company.certificate.certificateNumber}</TableCell>
                                        <TableCell>{company.certificate.certificateType}</TableCell>
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
