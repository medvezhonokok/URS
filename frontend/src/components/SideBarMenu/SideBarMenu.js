import React from 'react';
import './SideBarMenu.css';
import {SideBarData} from "./SideBarData";
import {Link} from "react-router-dom";
import {logout} from "../../index";

const SideBarMenu = ({ user }) => {
    console.log(SideBarData);
    return (
        <>
            <div>
                Sidebar
            </div>
            <nav className='nav-menu'>
                <ul className='nav-menu-items'>
                    {SideBarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className='user-info'>
                    <span>{user.userRole} | {user.name}</span>
                    <button className='logout-button' onClick={() => logout()}>Log out</button>
                </div>
            </nav>
        </>
    );
}


export default SideBarMenu;
