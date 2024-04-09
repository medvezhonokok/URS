import React from 'react';
import './TopNavigationBar.css';
import {Button} from "react-bootstrap";
import * as index from "../../index";

const TopNavigationBar = ({user}) => {
    return (
        <div className="topNavBar" style={{marginLeft: "4rem"}}>
            <div>{user.userRole}</div>
            <Button onClick={() => index.logout()}>Log out</Button>
            <Button className="buttonNavBar" href={"users"}>All users</Button>
            <Button className="buttonNavBar" href={"#"}>Companies</Button>
            <Button className="buttonNavBar" href={"#"}>Schedule</Button>
            <Button className="buttonNavBar" href={"#"}><b>{user.name}</b></Button>
        </div>
    )
};
export default TopNavigationBar;
