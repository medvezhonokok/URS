import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SideBarMenu from "../../SideBarMenu/SideBarMenu";

import * as storage from "./../../../data/storage";

const UserPage = ({authUser}) => {
    const {userId} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        storage.getUserById(userId).then(userJson => {
            setUser(userJson);
        });
    }, [userId])

    return (
        authUser ?
            <div>
                <SideBarMenu user={authUser} children={
                    user
                        ? <div className="companyContainer" style={{width: "80%"}}>
                            <h1>User page</h1>
                            <h1>Номер телефона: {user.phoneNumber}</h1>
                        </div>
                        : <div>
                            No such user
                        </div>
                }/>
            </div>
            : <div>
                Nothing there
            </div>
    );
};


export default UserPage;
