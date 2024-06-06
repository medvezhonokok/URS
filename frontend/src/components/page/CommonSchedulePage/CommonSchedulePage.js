import React, {useEffect, useState} from 'react';
import * as storage from "../../../data/storage";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import "./CommonSchedulePage.css";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Button} from "react-bootstrap";
import AddAuditForm from "../../form/AddAuditForm/AddAuditForm";

const CommonSchedulePage = ({user}) => {
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [audits, setAudits] = useState([]);

    const [daysInMonth, setDaysInMonth] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const yearNames = Array.from({
        length: 10
    }, (_, i) => new Date().getFullYear() - i);

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await storage.getUsers();
            const companiesData = await storage.getCompanies();
            const auditsData = await storage.getAudits();

            setUsers(usersData);
            setCompanies(companiesData);
            setAudits(auditsData);

            const days = Array.from({
                length: new Date(selectedYear, selectedMonth, 0).getDate()
            }, (_, i) => i + 1);
            setDaysInMonth(days);
        };

        fetchData();
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const hasAudit = (currentUser, date) => {
        const auditDate = new Date(selectedYear, selectedMonth - 1, date).setHours(0, 0, 0, 0);
        return currentUser.audits.some(audit => {
            const auditStartDate = new Date(audit.startDate).setHours(0, 0, 0, 0);
            const auditEndDate = new Date(audit.endDate).setHours(0, 0, 0, 0);
            return auditStartDate <= auditDate && auditDate <= auditEndDate;
        });
    };

    return (
        user
            ? <div className="usersPageContainer">
                <div className="companiesPageHeader">
                    <h1 className="companiesHeader">Общий график</h1>
                    <div className="companiesAddNewCompanyButton">
                        <Button onClick={() => setIsModalOpen(true)}><h1>ДОБАВИТЬ АУДИТ +</h1></Button>
                        <AddAuditForm isOpen={isModalOpen}
                                      handleClose={() => setIsModalOpen(false)}
                                      companies={companies}
                                      users={users}
                        />
                    </div>
                </div>
                <div className="selectContainer">
                    <FormControl>
                        <InputLabel id="month-select-label">Месяц</InputLabel>
                        <Select
                            labelId="month-select-label"
                            id="month-select"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                        >
                            {storage.monthNames.map(month => (
                                <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="year-select-label">Год</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            value={selectedYear}
                            onChange={handleYearChange}
                        >
                            {yearNames.map(year => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="companies table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                {daysInMonth.map(day => (
                                    <TableCell key={day}>{day}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    {daysInMonth.map(day => (
                                        <TableCell key={`${user.id}-${day}`}
                                                   style={{backgroundColor: hasAudit(user, day) ? 'green' : 'white'}}>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            : null
    );
};

export default CommonSchedulePage;
