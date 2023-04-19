import { useMobileNavigation } from '@/UI/common/devices/device-type';
import { useMemo } from 'react';

export const useNavbarHeight = (): number => {
    const isMobile = useMobileNavigation();
    return useMemo(() => {
        return isMobile ? 56 : 64;
    }, [isMobile]);
};
