import React, {useEffect, useState} from 'react';
import TopNavigationBar from "../TopNavigationBar/TopNavigationBar";
import * as storage from "../../data/storage";
import './Users.css';

const Users = ({user}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        storage.getUsers().then(
            usersJson => {
                setUsers(usersJson)
            }
        );
    }, []);

    const mappedUsers = users
        .map(user => (
            <div className="userCard" key={user.id}>
                ФИО: <p>{user.name}</p>
                Номер телефона: <p>{user.phoneNumber}</p>
                ROLE: <p>{user.role}</p>
            </div>
        ));

    return (
        user
            ? (
                <div className="Users">
                    <TopNavigationBar user={user}/>
                    {mappedUsers}
                </div>)
            : null
    )
};

export default Users;
