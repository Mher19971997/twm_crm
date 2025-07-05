import { CircularProgress } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const I18nProvider = ({ children }) => {
    const { ready } = useTranslation();
    console.log(ready, "readyreadyreadyready");
    if (!ready) {
        return <React.Fragment>
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </React.Fragment>; // Глобальный загрузочный экран
    }

    return <>{children}</>; // Рендерим приложение, когда все готово
};

export default I18nProvider;
