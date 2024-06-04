import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { MdBusinessCenter } from "react-icons/md";



export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Users',
        path: '/users',
        icon: <FaIcons.FaAddressBook/>,
        cName: 'nav-text'
    },
    {
        title: 'Schedule',
        path: '/schedule',
        icon: <FaIcons.FaCalendarAlt/>,
        cName: 'nav-text'
    },
    {
        title: 'Companies',
        path: '/companies',
        icon: <MdBusinessCenter/>,
        cName: 'nav-text'
    }
];