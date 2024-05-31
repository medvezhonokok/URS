import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SideBarMenu from "../../SideBarMenu/SideBarMenu";

import * as storage from "./../../../data/storage";

const UserPage = ({authUser}) => {
    const {userId} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(storage.getUserById(userId));
    })

    return (
        authUser ?
            <div>
                <SideBarMenu user={user} children={
                    user
                        ? <div className="companyContainer" style={{width: "80%"}}>
                            <h1>User page</h1>
                            <h1>{user.name}</h1>
                            <h1>{user.phoneNumber}</h1>
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
