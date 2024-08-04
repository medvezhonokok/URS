import React, {useEffect, useState} from 'react';
import * as client from "../../../data/client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import "./CommonSchedulePage.css";
import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Popover, Select, Typography} from "@mui/material";
import {Button} from "react-bootstrap";
import {MdAccessTimeFilled} from "react-icons/md";
import AddAuditForm from "../../form/AddAuditForm/AddAuditForm";
import {monthNames} from "../../../constants/constants";

const CommonSchedulePage = ({user}) => {
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [daysInMonth, setDaysInMonth] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true);
    const yearNames = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await client.getUsers();
            const companiesData = await client.getCompanies();

            setUsers(usersData);
            setCompanies(companiesData);

            const days = Array.from({length: new Date(selectedYear, selectedMonth, 0).getDate()}, (_, i) => i + 1);
            setDaysInMonth(days);
            setLoading(false);
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

    const handleCellClick = (user, day, event) => {
        const selectedDate = new Date(selectedYear, selectedMonth - 1, day);
        selectedDate.setHours(0, 0, 0, 0);

        const selectedAudit = user.audits.find(audit => {
            const auditStartDate = new Date(audit.startDate);
            const auditEndDate = new Date(audit.endDate);
            auditStartDate.setHours(0, 0, 0, 0);
            auditEndDate.setHours(0, 0, 0, 0);

            return auditStartDate <= selectedDate && selectedDate <= auditEndDate;
        });

        setSelectedAudit(selectedAudit);
        setIsPopoverOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const updateUsersAndCompanies = (newUsers, newCompanies) => {
        setUsers(newUsers);
        setCompanies(newCompanies);
    };

    if (loading) {
        return <div className="loadingContainer"><CircularProgress/></div>;
    }

    return (
        user
            ? <div className="commonPageContainer">
                <div className="commonPageHeader">
                    <h1 className="commonPageHeader">Общий график</h1>
                    <div className="headerButtonContainer">
                        <Button onClick={() => setIsModalOpen(true)}>ДОБАВИТЬ АУДИТ +</Button>
                        <AddAuditForm isOpen={isModalOpen}
                                      handleClose={() => setIsModalOpen(false)}
                                      companies={companies}
                                      users={users}
                                      updateUsersAndCompanies={updateUsersAndCompanies}
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
                            {monthNames.map(month => (
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
                                        <TableCell
                                            key={`${user.id}-${day}`}
                                            className={hasAudit(user, day) ? 'green' : ''}
                                            onClick={(event) => hasAudit(user, day) && handleCellClick(user, day, event)}
                                        >
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {selectedAudit && (
                    <Popover
                        open={isPopoverOpen}
                        anchorEl={anchorEl}
                        PaperProps={{
                            style: {
                                borderRadius: '1rem',
                            },
                        }}
                        onClose={() => setIsPopoverOpen(false)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Box className="popover-content">
                            <Typography variant="h6">Аудирование "{selectedAudit.companyName}"</Typography>
                            <Box className="auditInfoContainer">
                                <Box className="auditInfo">
                                    <Typography>
                                        <span className="label">Локация:</span> {selectedAudit.location}
                                    </Typography>
                                </Box>
                                <Box className="auditInfo">
                                    <Typography>
                                        <span className="label">Активность:</span> {selectedAudit.activity}
                                    </Typography>
                                </Box>
                                <Box className="auditInfo">
                                    <Typography>
                                        <span className="label">Соглашение:</span> {selectedAudit.agreement}
                                    </Typography>
                                </Box>
                                <Box className="auditInfo">
                                    <MdAccessTimeFilled className="dateTimeIcon"/>
                                    <Typography>
                                        <span
                                            className="label">Заключительная встреча:</span> {selectedAudit.closingMeetingDate ? new Date(selectedAudit.closingMeetingDate).toLocaleDateString() : 'Не указана'}
                                    </Typography>
                                </Box>
                                <Box className="auditInfo">
                                    <MdAccessTimeFilled className="dateTimeIcon"/>
                                    <Typography>
                                        <span
                                            className="label">Срок действия сертификата:</span> {selectedAudit.certificateExpirationDate ? new Date(selectedAudit.certificateExpirationDate).toLocaleDateString() : 'Не указана'}
                                    </Typography>
                                </Box>
                                <Box className="auditInfo">
                                    <MdAccessTimeFilled className="dateTimeIcon"/>
                                    <Typography>
                                        {new Date(selectedAudit.startDate).toLocaleDateString()} - {new Date(selectedAudit.endDate).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Popover>
                )}

            </div>
            : null
    );
};

export default CommonSchedulePage;
