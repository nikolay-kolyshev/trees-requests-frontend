import { $theme, saveThemeToLocalStorageEvent, updateThemeEvent } from '@/BLL/models/theme/theme.store';
import { sample } from 'effector';

sample({
    source: $theme,
    target: saveThemeToLocalStorageEvent,
});

sample({
    clock: updateThemeEvent,
    target: $theme,
});
