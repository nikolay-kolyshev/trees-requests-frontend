import { deviceWidth } from '@/UI/common/devices/device-width.constants';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const [initialMobileHeight, initialMobileWidth] = [568, 320];

function calculateWindowMinRatio() {
    const { clientHeight, clientWidth } = document.documentElement;

    return Math.min(clientHeight / initialMobileHeight, clientWidth / initialMobileWidth);
}

export function useWindowMinRatio() {
    const [windowMinRatio, setWindowMinRatio] = useState(calculateWindowMinRatio());

    useEffect(() => {
        function updateWindowMinRatio() {
            setWindowMinRatio(calculateWindowMinRatio());
        }
        window.addEventListener('resize', updateWindowMinRatio);

        return () => window.removeEventListener('resize', updateWindowMinRatio);
    });

    return windowMinRatio;
}

function getWindowWidth() {
    return document.documentElement.clientWidth;
}

export function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());

    useEffect(() => {
        function updateWindowWidth() {
            setWindowWidth(getWindowWidth());
        }
        window.addEventListener('resize', updateWindowWidth);

        return () => window.removeEventListener('resize', updateWindowWidth);
    });

    return windowWidth;
}

export const deviceType = {
    desktopGrid: `(min-width: ${deviceWidth.desktop.minGrid}px)`,
    desktopMedium: `(min-width: ${deviceWidth.desktop.medium}px)`,
    desktopNavigation: `(min-width: ${deviceWidth.desktop.minNavigation}px)`,
    mobileGrid: `(max-width: ${deviceWidth.mobile.maxGrid}px)`,
    mobileNavigation: `(max-width: ${deviceWidth.mobile.maxNavigation}px)`,
    mobileMinNavigation: `(max-width: ${deviceWidth.mobile.minGrid}px)`,
    phone: `(max-width: ${deviceWidth.tablet.min - 1}px)`,
    tablet: `(min-width: ${deviceWidth.tablet.min}px)`,
};

export function useDesktopGrid() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return useMediaQuery({ query: deviceType.desktopGrid });
}

export function useDesktopNavigation() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return useMediaQuery({ query: deviceType.desktopNavigation });
}

export function useDesktopMedium() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return useMediaQuery({ query: deviceType.desktopMedium });
}

export function useMobileGrid() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return useMediaQuery({ query: deviceType.mobileGrid });
}

export function useMobileNavigation() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return useMediaQuery({ query: deviceType.mobileNavigation });
}

export function useMobileMinNavigation() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return useMediaQuery({ query: deviceType.mobileMinNavigation });
}

export function useTablet() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return useMediaQuery({ query: deviceType.tablet });
}

export function usePhone() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return useMediaQuery({ query: deviceType.phone });
}
