import React, {useEffect, useState} from 'react';
import * as storage from "../../../data/storage";
import './UsersPage.css';
import SideBarMenu from "../../SideBarMenu/SideBarMenu";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const UsersPage = ({user}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        storage.getUsers().then(
            usersJson => {
                setUsers(usersJson)
            }
        );
    }, []);

    return (
        user
            ? <SideBarMenu user={user} children={
                <div>
                    <h1 className="companiesHeader">Users: </h1>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="companies table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ФИО</TableCell>
                                    <TableCell>Номер телефона</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }/>
            : null
    )
};

export default UsersPage;
