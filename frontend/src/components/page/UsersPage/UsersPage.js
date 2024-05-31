import React, {useEffect, useState} from 'react';
import * as storage from "../../../data/storage";
import {updateUserCertificatesMap} from "../../../data/storage";
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

const CertificateTypes = [
    {key: "IATF_16949", value: "IATF 16949"},
    {key: "ГОСТР_58139", value: "ГОСТР 58139"},
    {key: "ISO_9001", value: "ISO 9001"},
    {key: "ISO_9001_2015", value: "ISO 9001:2015"},
    {key: "ISO_50001_2018", value: "ISO 50001:2018"},
    {key: "ISO_45001_2018", value: "ISO 45001:2018"},
    {key: "ISO_3834_2021", value: "ISO 3834:2021"},
    {key: "ISO_37001_2016", value: "ISO 37001:2016"},
    {key: "ISO_27001_2013", value: "ISO 27001:2013"},
    {key: "ISO_22001_2018", value: "ISO 22001:2018"},
    {key: "ISO_22000_2018", value: "ISO 22000:2018"},
    {key: "ISO_20000_1_2018", value: "ISO 20000-1:2018"},
    {key: "ISO_14001_2015", value: "ISO 14001:2015"},
    {key: "ISO_13485_2016", value: "ISO 13485:2016"},
    {key: "IATF_16949_2016_TO_ISO_9001_2015", value: "IATF 16949:2016 -> ISO 9001:2015"},
    {key: "IATF_16949_2016", value: "IATF 16949:2016"},
    {key: "FSSC_22000", value: "FSSC 22000"},
    {key: "ГОСТ_ISO_13485_2017", value: "ГОСТ ISO 13485-2017"},
    {key: "ГОСТ_Р_ИСО_МЭК_27001_2021", value: "ГОСТ Р ИСО/МЭК 27001-2021"},
    {key: "ГОСТ_Р_ИСО_9001_2015_СДС", value: "ГОСТ Р ИСО 9001:2015 (СДС)"},
    {key: "ГОСТ_Р_ИСО_45001", value: "ГОСТ Р ИСО 45001"},
    {key: "ГОСТ_Р_ИСО_14001", value: "ГОСТ Р ИСО 14001"},
    {key: "ГОСТ_Р_58139_2018", value: "ГОСТ Р 58139-2018"},
    {key: "EN_14065", value: "EN 14065"},
    {key: "ГОСТ_Р_ИСО_14001_2016", value: "ГОСТ Р ИСО 14001-2016"},
    {key: "ГОСТ_Р_ИСО_9001_2015_ФСА", value: "ГОСТ Р ИСО 9001-2015 (ФСА)"}
];

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
        console.log(userCertificates);
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
