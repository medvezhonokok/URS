import React from 'react';
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {AiFillHome} from 'react-icons/ai';
import {FaArtstation, FaCalendarAlt, FaRegCalendarAlt, FaUsers} from 'react-icons/fa';
import {GrUserAdmin} from 'react-icons/gr';
import {MdBusinessCenter} from 'react-icons/md';
import {Link} from 'react-router-dom';
import './SideBarMenu.css';
import {IoIosLogOut, IoIosSettings} from "react-icons/io";
import {CiViewTable} from "react-icons/ci";
import {FaPersonCircleQuestion} from "react-icons/fa6";

const SideBarMenu = ({user, setLoading}) => {
    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/';
        setLoading(false);
    };

    return (
        <Sidebar>
            <Menu>
                <MenuItem icon={<AiFillHome/>} component={<Link to="/"/>}>Главная</MenuItem>
                <SubMenu icon={<FaCalendarAlt/>} label={'Планирование'}>
                    <MenuItem icon={<CiViewTable/>} component={<Link to="/certification_scheme"/>}>Схемы</MenuItem>
                    <MenuItem icon={<FaUsers/>} component={<Link to="/users"/>}>Сотрудники</MenuItem>
                    <MenuItem icon={<MdBusinessCenter/>} component={<Link to="/companies"/>}>Клиенты</MenuItem>
                    <MenuItem icon={<FaRegCalendarAlt/>} component={<Link to="/schedule"/>}>План работ</MenuItem>
                    <MenuItem icon={<FaArtstation/>} component={<Link to="/stats"/>}>Статистика</MenuItem>
                </SubMenu>
                {user.role === 'ADMIN' && (
                    <MenuItem icon={<GrUserAdmin/>} component={<Link to="/admin"/>}>Администрирование</MenuItem>
                )}
                <SubMenu label="Личное" icon={<FaPersonCircleQuestion/>}>
                    <MenuItem icon={<IoIosSettings/>} component={<Link to={`/settings`}/>}>Настройки</MenuItem>
                    <MenuItem icon={<FaArtstation/>} component={<Link to={`/user/${user.id}`}/>}>Личный
                        кабинет</MenuItem>
                    <MenuItem icon={<IoIosLogOut/>} className="logout-menu-button" onClick={logout}>
                        Выйти
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default SideBarMenu;
