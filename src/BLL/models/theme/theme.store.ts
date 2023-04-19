import { themeDomain } from '@/BLL/models.domains';
import { PaletteMode } from '@mui/material';

export const $theme = themeDomain.createStore<PaletteMode>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    {
        name: 'theme',
        sid: 'theme',
    },
);
