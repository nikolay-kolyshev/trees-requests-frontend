import {
    useDesktopGrid,
    useDesktopNavigation,
    useMobileGrid,
    useMobileNavigation,
    usePhone,
    useTablet,
} from '@/UI/common/devices/device-type';
import { FC, PropsWithChildren, ReactElement } from 'react';

export const MobileGrid: FC<PropsWithChildren> = ({ children }) => {
    const isMobileGrid = useMobileGrid();

    return isMobileGrid ? (children as ReactElement) : null;
};

export const MobileNavigation: FC<PropsWithChildren> = ({ children }) => {
    const isMobileNavigation = useMobileNavigation();

    return isMobileNavigation ? (children as ReactElement) : null;
};

export const DesktopGrid: FC<PropsWithChildren> = ({ children }) => {
    const isDesktopGrid = useDesktopGrid();

    return isDesktopGrid ? (children as ReactElement) : null;
};

export const DesktopNavigation: FC<PropsWithChildren> = ({ children }) => {
    const isDesktopNavigation = useDesktopNavigation();

    return isDesktopNavigation ? (children as ReactElement) : null;
};

export const Tablet: FC<PropsWithChildren> = ({ children }) => {
    const isTablet = useTablet();

    return isTablet ? (children as ReactElement) : null;
};

export const Phone: FC<PropsWithChildren> = ({ children }) => {
    const isPhone = usePhone();

    return isPhone ? (children as ReactElement) : null;
};
