import { PaletteMode } from '@mui/material';

export const saveThemeStateToLocalStorage = (theme: PaletteMode) => {
    localStorage.setItem('theme', theme);
};

export const getDefaultThemeState = (): PaletteMode => {
    const localStorageTheme = localStorage.getItem('theme');
    if (localStorageTheme) {
        switch (localStorage.getItem('theme')) {
            case 'dark':
                return 'dark';
            case 'light':
                return 'light';
        }
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        saveThemeStateToLocalStorage('dark');
        return 'dark';
    }
    saveThemeStateToLocalStorage('light');
    return 'light';
};
