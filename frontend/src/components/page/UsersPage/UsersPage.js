import React, {useEffect, useState} from 'react';
import * as storage from "../../../data/storage";
import {CertificateTypes, updateUserCertificatesMap} from "../../../data/storage";
import './UsersPage.css';
import SideBarMenu from "../../SideBarMenu/SideBarMenu";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "react-bootstrap";
import {Checkbox} from "@mui/material";

const UsersPage = ({user}) => {
    const [users, setUsers] = useState([]);
    const [userCertificates, setUserCertificates] = useState({});

    useEffect(() => {
        storage.getUsers().then(usersJson => {
            setUsers(usersJson);
            const certificatesMap = {};
            usersJson.forEach(user => {
                const userCertificateString = user.certificates || '';
                const certificateValues = userCertificateString.split('#')
                    .map(value => parseInt(value, 10));

                const userCertificateMap = {};
                certificateValues.forEach((value, index) => {
                    const certificateKey = CertificateTypes[index].key;
                    userCertificateMap[certificateKey] = value === 1;
                });
                certificatesMap[user.id] = userCertificateMap;
            });
            setUserCertificates(certificatesMap);
        });
    }, []);

    const handleCertificateToggle = (userId, certificateKey) => {
        setUserCertificates(prevState => {
            const updatedUserCertificates = {...prevState};
            updatedUserCertificates[userId] = {
                ...updatedUserCertificates[userId],
                [certificateKey]: !updatedUserCertificates[userId][certificateKey]
            };
            return updatedUserCertificates;
        });
    };

    const handleSave = () => {
        updateUserCertificatesMap(userCertificates);
    };

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
                                    {CertificateTypes.map(certificate => (
                                        <TableCell key={certificate.key}>{certificate.value}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <a href={`/user/${user.id}`}>
                                                {user.name}
                                            </a>
                                        </TableCell>
                                        {CertificateTypes.map(certificate => (
                                            <TableCell key={certificate.key}>
                                                <Checkbox
                                                    checked={userCertificates[user.id] && userCertificates[user.id][certificate.key]}
                                                    onChange={() => handleCertificateToggle(user.id, certificate.key)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button variant="contained" onClick={handleSave}>Сохранить</Button>
                </div>
            }/>
            : null
    )
};


export default UsersPage;
