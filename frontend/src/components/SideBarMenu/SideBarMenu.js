import React, {useContext} from 'react';
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {FaArtstation, FaCalendarAlt, FaRegCalendarAlt, FaUsers} from 'react-icons/fa';
import {GrUserAdmin} from 'react-icons/gr';
import {MdBusinessCenter} from 'react-icons/md';
import {IoIosLogOut, IoIosSettings} from 'react-icons/io';
import {CiViewTable} from 'react-icons/ci';
import {FaPersonCircleQuestion} from 'react-icons/fa6';
import {ThemeContext} from '../../utils/ThemeContext';
import './SideBarMenu.css';

const SideBarMenu = ({user, setLoading, collapsed}) => {
    const {theme} = useContext(ThemeContext);

    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/';
        setLoading(false);
    };

    return (
        <Sidebar
            style={{
                overflowY: 'auto',
                height: '100vh',
                color: theme === 'dark' ? 'var(--light-gray)' : 'white',
                fontSize: '14px',
                backgroundColor: theme === 'dark' ? 'var(--dark-green)' : 'var(--medium-green)',
            }}
            collapsed={collapsed}
        >
            <Menu menuItemStyles={{
                root: {
                    height: '100%',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    backgroundColor: theme === 'dark' ? 'var(--dark-green)' : 'var(--medium-green)',
                    color: theme === 'dark' ? 'var(--medium-gray)' : 'var(--light-gray)'
                },
                button: {
                    '&:hover': {
                        backgroundColor: theme === 'dark' ? 'var(--medium-green)' : 'var(--light-green)'
                    },
                },
            }}>
                <MenuItem icon={<AiFillHome/>} component={<Link to="/"/>}>
                    Главная
                </MenuItem>
                <SubMenu icon={<FaCalendarAlt/>} label={'Планирование'}>
                    <MenuItem icon={<CiViewTable/>}
                              component={<Link to="/schemes"/>}>
                        Схемы
                    </MenuItem>
                    <MenuItem icon={<FaUsers/>}
                              component={<Link to="/users"/>}>
                        Сотрудники
                    </MenuItem>
                    <MenuItem icon={<MdBusinessCenter/>}
                              component={<Link to="/companies"/>}>
                        Клиенты
                    </MenuItem>
                    <MenuItem icon={<MdBusinessCenter/>}
                              component={<Link to="/applications"/>}>
                        Заявки
                    </MenuItem>
                    <MenuItem icon={<FaRegCalendarAlt/>}
                              component={<Link to="/schedule"/>}>
                        Оф. план работ
                    </MenuItem>
                    <MenuItem icon={<FaRegCalendarAlt/>}
                              component={<Link to="/informal_schedule"/>}>
                        Неоф. план работ
                    </MenuItem>
                    <MenuItem icon={<FaArtstation/>} component={<Link to="/stats"/>}>
                        Статистика
                    </MenuItem>
                </SubMenu>
                {user.role === 'ADMIN' &&
                    (<MenuItem icon={<GrUserAdmin/>} component={<Link to="/admin"/>}>
                        Администрирование
                    </MenuItem>)}
                <SubMenu label="Личное" icon={<FaPersonCircleQuestion/>}>
                    <MenuItem icon={<IoIosSettings/>} component={<Link to={`/settings`}/>}>
                        Настройки
                    </MenuItem>
                    <MenuItem icon={<FaArtstation/>} component={<Link to={`/user/${user.id}`}/>}>
                        Личный кабинет
                    </MenuItem>
                    <MenuItem icon={<IoIosLogOut/>} onClick={logout}>
                        Выйти
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default SideBarMenu;
