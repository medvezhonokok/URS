import React from 'react';
import './TopNavigationBar.css';

const TopNavigationBar = ({user}) => {
    return (
        <div className="topNavBar">
            <b>{user.name}</b>
        </div>
    )
};
export default TopNavigationBar;
