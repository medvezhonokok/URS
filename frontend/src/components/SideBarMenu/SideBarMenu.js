import React from 'react';
import './SideBarMenu.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Button } from "react-bootstrap";
import * as index from "../../index";

const SideBarMenu = ({ user, children }) => {
    return (
        <div className="sidebar-container">
            <Sidebar>
                <Menu>
                    <MenuItem>{user.userRole} | {user.name}</MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/"}>Общее</Button></MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/users"}>Сотрудники</Button></MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/schedule"}>Мое расписание</Button></MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/companies"}>Клиенты</Button></MenuItem>
                    <MenuItem><Button className="buttonNavBar" href={"/common"}>Общий график</Button></MenuItem>
                    <SubMenu label="Additional info">
                        <MenuItem><Button className="buttonNavBar" href={"#"}><b>{user.name}</b></Button></MenuItem>
                        <MenuItem><Button onClick={() => index.logout()}>Выйти из системы</Button></MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
            <div className="content-container">
                {children}
            </div>
        </div>
    );
};

export default SideBarMenu;
