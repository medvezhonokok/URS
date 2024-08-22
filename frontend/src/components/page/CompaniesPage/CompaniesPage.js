import './CompaniesPage.css';
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import * as client from "../../../data/client";
import AddCompanyForm from '../../form/AddCompanyForm/AddCompanyForm';
import {Link} from "react-router-dom";
import {CompanyStatus} from "../../../constants/constants";

const CompaniesPage = ({user, withAudit}) => {
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [companyCredentials, setCompanyCredentials] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.getCompanies().then(
            companiesJson => {
                setCompanies(companiesJson)
                setLoading(false);
            }
        );
    }, []);

    const handleChange = (event, name) => {
        setCompanyCredentials({
            ...companyCredentials,
            [name]: event.target.value,
        });
    };

    const addCompany = (event) => {
        event.preventDefault();
        client.addCompany(JSON.stringify(companyCredentials))
            .then((company) => {
                setCompanies([...companies, company]);
            });
        setOpen(false);
    };

    const filteredCompanies = companies
        .filter((company) => {
            if (withAudit) {
                return company.audit;
            } else {
                return !company.audit;
            }
        })
        .filter((company) =>
            company.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.russianName.toLowerCase().includes(searchQuery.toLowerCase())
        );

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div className="loadingContainer">
                <CircularProgress/>
            </div>
        );
    }

    return (
        <div>
            <div className="commonPageHeader">
                <h1 className="commonPageHeader">{withAudit ? "Клиенты" : "Заявки"}</h1>
                {!withAudit && (
                    <div className="headerButtonContainer">
                        <Button onClick={() => setOpen(true)}>ДОБАВИТЬ +</Button>
                        <AddCompanyForm open={open}
                                        handleClose={() => setOpen(false)}
                                        handleSubmit={addCompany}
                                        handleChange={handleChange}
                                        companyCredentials={companyCredentials}/>
                    </div>
                )}
            </div>
            <TextField
                label={"Поиск по названию " + (withAudit ? "компании..." : "заявки...")}
                variant="outlined"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                fullWidth
                margin="normal"
            />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="companies table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Страна или штат</TableCell>
                            <TableCell>ФИО контактного лица</TableCell>
                            <TableCell>ИНН</TableCell>
                            <TableCell>Статус</TableCell>
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
                                <TableCell>{CompanyStatus.find(item => item.key === company.status).value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredCompanies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(+event.target.value);
                    setPage(0);
                }}
            />
        </div>
    );
};

export default CompaniesPage;
