import React from 'react';
import './SideBarMenu.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Button } from "react-bootstrap";
import * as index from "../../index";

const SideBarMenu = ({ user, children }) => {
    return (
        <div>
        <div className="sidebar-container">
            <Sidebar>
                <Menu>
                    <MenuItem>{user.userRole} | {user.name}</MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/"}>Home</Button></MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/users"}>Users</Button></MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/schedule"}>Schedule</Button></MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/companies"}>Companies</Button></MenuItem>
                    <SubMenu label="Additional info">
                        <MenuItem><Button className="buttonNavBar" href={"#"}><b>{user.name}</b></Button></MenuItem>
                        <MenuItem><Button onClick={() => index.logout()}>Log out</Button></MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
        <div className="content-container">
        {children}
        </div>
        </div>
    );
};

export default SideBarMenu;
