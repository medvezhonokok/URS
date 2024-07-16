import React from 'react';
import './SideBarMenu.css';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import {MdBusinessCenter} from 'react-icons/md';
import {NavLink} from 'react-router-dom';

const SideBarButtons = [
    {
        title: 'Главная',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Схемы сертификации',
        path: '/certification_scheme',
        icon: <FaIcons.FaRegCalendarAlt/>,
        cName: 'nav-text'
    },
    {
        title: 'Сотрудники',
        path: '/users',
        icon: <FaIcons.FaUsers/>,
        cName: 'nav-text'
    },
    {
        title: 'Клиенты',
        path: '/companies',
        icon: <MdBusinessCenter/>,
        cName: 'nav-text'
    },
    {
        title: 'План работ',
        path: '/schedule',
        icon: <FaIcons.FaRegCalendarAlt/>,
        cName: 'nav-text'
    },
    {
        title: 'Статистика',
        path: '/stats',
        icon: <FaIcons.FaArtstation/>,
        cName: 'nav-text'
    }
];

const SideBarMenu = ({user}) => {
    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = "/";
    }

    return (
        <div className="sidebar">
            <nav className='nav-menu'>
                <ul className='nav-menu-items'>
                    {SideBarButtons.map((item, index) => (
                        <li key={index} className={item.cName}>
                            <NavLink
                                to={item.path}
                                className={({isActive}) => isActive ? 'nav-text active' : 'nav-text'}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className='user-info'>
                    <span>{user.userRole} | {user.name}</span>
                    <button className='logout-button' onClick={logout}>
                        Выйти из системы
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default SideBarMenu;
