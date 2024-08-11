import React, {useContext} from 'react';
import {FormControlLabel, Switch} from "@mui/material";
import {ThemeContext} from '../../../utils/ThemeContext';

const SettingsPage = ({collapsed, setCollapsed}) => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (<div>
            <div className="commonPageHeader">
                <h1 className="commonPageHeader">Настройки системы</h1>
            </div>
            <FormControlLabel
                labelPlacement="start"
                onChange={() => {
                    setCollapsed(!collapsed);
                }}
                control={<Switch checked={!collapsed}/>}
                label="Сжать боковое меню"
            />
            <FormControlLabel
                labelPlacement="start"
                onChange={toggleTheme}
                control={<Switch checked={theme === 'dark'}/>}
                label="Темная тема"
            />
        </div>
    );
};

export default SettingsPage;
