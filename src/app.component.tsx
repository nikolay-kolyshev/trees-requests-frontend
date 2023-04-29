// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { GlobalStyles } from '@mui/styled-engine-sc';
import { Styled } from '@/UI/common/styles/global.styled';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { routerConfig } from '@/UI/routing/routing.config';
import { useUnit } from 'effector-react';
import { $theme } from '@/BLL/models/theme/theme.store';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f',
            contrastText: '#fff',
        },
        secondary: {
            light: '#33eb91',
            main: '#00e676',
            dark: '#00a152',
            contrastText: '#000',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f',
            contrastText: '#fff',
        },
        secondary: {
            light: '#33eb91',
            main: '#00e676',
            dark: '#00a152',
            contrastText: '#000',
        },
    },
});

const App = () => {
    const storageTheme = useUnit($theme);

    const theme = useMemo(() => {
        return storageTheme === 'dark' ? darkTheme : lightTheme;
    }, [storageTheme]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={Styled.globalStyles} />
            <RouterProvider router={routerConfig} />
        </ThemeProvider>
    );
};

export default App;
