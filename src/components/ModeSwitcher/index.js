// ModeSwitcher
import ArgonBox from 'components/ArgonBox';
import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { setDarkSidenav } from "context";
import { setDarkMode } from "context";
import { useArgonController } from 'context';

const ModeSwitcher = () => {
    const [controller, dispatch] = useArgonController();
    const { darkMode } = controller;

    const handleDarkMode = () => {
        setDarkSidenav(dispatch, !darkMode);
        setDarkMode(dispatch, !darkMode);
    };

    return (
        <ArgonBox variant="outlined" color={!darkMode ? "light" : "light"} sx={{ padding: 0, margin: 0, width: "37px", height: '35px', border: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }} >
            {darkMode ? <DarkModeIcon onClick={handleDarkMode} /> : <LightModeIcon onClick={handleDarkMode} />}
        </ArgonBox>
    );
};

export default ModeSwitcher;
