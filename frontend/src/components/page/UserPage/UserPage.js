import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SideBarMenu from "../../SideBarMenu/SideBarMenu";
import * as storage from "./../../../data/storage";
import {CertificateTypes} from "../../../data/storage";
import './UserPage.css';

const UserPage = ({authUser}) => {
    const {userId} = useParams();
    const [user, setUser] = useState(null);
    const [userCertificatesList, setUserCertificatesList] = useState([]);

    useEffect(() => {
        const getUserAsync = async () => {
            return await storage.getUserById(userId);
        };

        getUserAsync().then(userJson => {
            if (userJson) {
                const userAvailableCertificates = userJson.certificates.split('#')
                    .map((cert, index) => cert === "1" ? CertificateTypes[index].value : null)
                    .filter(cert => cert !== null);

                setUserCertificatesList(userAvailableCertificates);
            }

            setUser(userJson)
        });
    }, [userId]);

    return (
        authUser ?
            <div className="userPageContainer">
                {user ?
                    <div>
                        <h1 className="userHeader">User page</h1>
                        <h1 className="userInfo">{user.name}</h1>
                        <h1 className="userInfo">{user.phoneNumber}</h1>
                        <h1 className="certificatesHeader">Список доступных сертификатов сотрудника:</h1>
                        {userCertificatesList && userCertificatesList.length > 0 ? (
                            <ul className="certificatesList">
                                {userCertificatesList.map((certificate, index) => (
                                    <li key={index}>{certificate}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Нет доступных сертификатов.</p>
                        )}
                    </div>
                    : <div>No such user</div>
                }
            </div>
            : null
    );
};

export default UserPage;
