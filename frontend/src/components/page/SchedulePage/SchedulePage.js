import React, {useEffect, useState} from 'react';
import * as client from "../../../data/client";
import "./SchedulePage.css";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Button} from "react-bootstrap";
import AddAuditForm from "../../form/AddAuditForm/AddAuditForm";
import {monthNames} from "../../../constants/constants";
import ScheduleTable from "../../ScheduleTable/ScheduleTable";
import AuditModal from "../../modal/AuditModal/AuditModal";

const SchedulePage = ({user, informal}) => {
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
        client.getUsers().then(usersJson => {
            setUsers(usersJson);
        });

        client.getCompanies().then(companiesJson => {
            setCompanies(companiesJson);
        });

        const days = Array.from({
            length: new Date(selectedYear, selectedMonth, 0).getDate()
        }, (_, i) => i + 1);
        setDaysInMonth(days);
        setLoading(false);
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
            const auditStartDate = informal
                ? new Date(audit.informalStartDate).setHours(0, 0, 0, 0)
                : new Date(audit.startDate).setHours(0, 0, 0, 0);

            const auditEndDate = informal
                ? new Date(audit.informalEndDate).setHours(0, 0, 0, 0)
                : new Date(audit.endDate).setHours(0, 0, 0, 0);

            return auditStartDate <= auditDate && auditDate <= auditEndDate;
        });
    };

    const handleCellClick = (user, day, event) => {
        const selectedDate = new Date(selectedYear, selectedMonth - 1, day);
        selectedDate.setHours(0, 0, 0, 0);

        const selectedAudit = user.audits.find(audit => {
            const auditStartDate = informal ? new Date(audit.informalStartDate) : new Date(audit.startDate);
            const auditEndDate = informal ? new Date(audit.informalEndDate) : new Date(audit.endDate);

            auditStartDate.setHours(0, 0, 0, 0);
            auditEndDate.setHours(0, 0, 0, 0);

            return auditStartDate <= selectedDate && selectedDate <= auditEndDate;
        });

        setSelectedAudit(selectedAudit);
        setIsPopoverOpen(true);
        setAnchorEl(event.currentTarget);
    };

    if (!user) {
        return null;
    }

    if (loading) {
        return <div className="loadingContainer"><CircularProgress/></div>;
    }

    return (
        <div>
            <div className="commonPageHeader">
                <h1 className="commonPageHeader">{(informal ? "Неофициальный" : "Официальный") + " общий график"}</h1>
                {!informal && (<div className="headerButtonContainer">
                    <Button onClick={() => setIsModalOpen(true)}>ДОБАВИТЬ АУДИТ +</Button>
                    <AddAuditForm isOpen={isModalOpen}
                                  handleClose={() => setIsModalOpen(false)}
                                  companies={companies}
                                  users={users}
                    />
                </div>)}
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
            <ScheduleTable daysInMonth={daysInMonth}
                           hasAudit={hasAudit}
                           handleCellClick={handleCellClick}
                           users={users}/>
            <AuditModal open={isPopoverOpen}
                        anchorEl={anchorEl}
                        onClose={() => setIsPopoverOpen(false)}
                        audit={selectedAudit}/>
        </div>
    );
};

export default SchedulePage;
