import React from 'react';
import './ScheduleTable.css';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

const ScheduleTable = ({daysInMonth, users, hasAudit, handleCellClick}) => {
    return (
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
    );
};

export default ScheduleTable;
