import React from 'react';
import TopNavigationBar from "../TopNavigationBar/TopNavigationBar";

const Users = ({user}) => {

    return (
        user
            ? (<div className="Users">
                <div>
                    <TopNavigationBar user={user}/>
                    <div style={{display: "flex", paddingTop: "5rem"}}>
                        Users component
                    </div>
                </div>
            </div>)
            : null
    )
};

export default Users;
