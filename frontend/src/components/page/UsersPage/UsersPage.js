import React, {useEffect, useState} from 'react';
import * as storage from "../../../data/storage";
import {CertificateTypes, updateUserCertificatesMap} from "../../../data/storage";
import './UsersPage.css';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "react-bootstrap";
import {Checkbox} from "@mui/material";
import {Link} from "react-router-dom";

const UsersPage = ({user}) => {
    const [users, setUsers] = useState([]);
    const [userCertificates, setUserCertificates] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

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
        if (isEditMode) {
            setUserCertificates(prevState => {
                const updatedUserCertificates = {...prevState};
                updatedUserCertificates[userId] = {
                    ...updatedUserCertificates[userId],
                    [certificateKey]: !updatedUserCertificates[userId][certificateKey]
                };
                return updatedUserCertificates;
            });
        }
    };

    const handleEditToggle = () => {
        setIsEditMode(prevState => !prevState);
    };

    const handleSave = () => {
        updateUserCertificatesMap(userCertificates);
        setIsEditMode(false);
    };

    return (
        user
            ? <div className="usersPageContainer">
                <div className="companiesPageHeader">
                    <h1 className="companiesHeader">Сотрудники</h1>
                    <div className="companiesAddNewCompanyButton">
                    </div>
                </div>
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
                                        <Link to={`/user/${user.id}`}>
                                            {user.name}
                                        </Link>
                                    </TableCell>
                                    {CertificateTypes.map(certificate => (
                                        <TableCell key={certificate.key}>
                                            <Checkbox
                                                className={`checkbox ${isEditMode ? '' : 'checked'}`}
                                                checked={userCertificates[user.id] && userCertificates[user.id][certificate.key]}
                                                onChange={() => handleCertificateToggle(user.id, certificate.key)}
                                                disabled={!isEditMode}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {isEditMode
                    ? <Button variant="contained" onClick={handleSave} className="saveOrEditButton">Сохранить</Button>
                    :
                    <Button variant="contained" onClick={handleEditToggle}
                            className="saveOrEditButton">Редактировать</Button>
                }
            </div>
            : null
    )
};

export default UsersPage;
