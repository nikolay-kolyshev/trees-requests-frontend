import styled from 'styled-components';
import { Paper } from '@mui/material';
import { deviceType } from '@/UI/common/devices';

const ContentWrapper = styled(Paper)`
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media ${deviceType.mobileNavigation} {
        gap: 8px;
    }
`;

export const LocationWrapper = styled(Paper).attrs({
    sx: { p: 1 },
    elevation: 3,
})`
    display: flex;
    gap: 8px;
`;

export const Styled = {
    ContentWrapper,
    LocationWrapper,
};
