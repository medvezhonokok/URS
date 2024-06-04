import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SideBarMenu from "../../SideBarMenu/SideBarMenu";
import * as storage from "./../../../data/storage";
import {CertificateTypes} from "../../../data/storage";

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
            <div>
                <SideBarMenu user={authUser} children={
                    user
                        ? <div className="companyContainer" style={{width: "80%"}}>
                            <h1>User page</h1>
                            <h1>{user.name}</h1>
                            <h1>{user.phoneNumber}</h1>
                            <h1>Список доступных сертификатов сотрудника:</h1>
                            {userCertificatesList && userCertificatesList.length > 0 ? (
                                <ul>
                                    {userCertificatesList.map((certificate, index) => (
                                        <li key={index}>{certificate}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Нет доступных сертификатов.</p>
                            )}
                        </div>
                        : <div>
                            No such user
                        </div>
                }/>
            </div>
            : null
    );
};


export default UserPage;
