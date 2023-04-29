import { themeDomain } from '@/BLL/models.domains';
import { PaletteMode } from '@mui/material';
import { getDefaultThemeState, saveThemeStateToLocalStorage } from '@/BLL/models/theme/theme.helpers';

export const updateThemeEvent = themeDomain.createEvent<PaletteMode>();
export const saveThemeToLocalStorageEvent = themeDomain.createEvent<PaletteMode>();

export const $theme = themeDomain
    .createStore<PaletteMode>(getDefaultThemeState(), {
        name: 'theme',
        sid: 'theme',
    })
    .on(saveThemeToLocalStorageEvent, (_, theme) => {
        saveThemeStateToLocalStorage(theme);
        return theme;
    });
