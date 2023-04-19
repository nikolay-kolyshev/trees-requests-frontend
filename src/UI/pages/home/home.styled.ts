import styled from 'styled-components';
import { deviceType } from '@/UI/common/devices';

const ContentWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NavigationButtonsWrapper = styled.div`
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    @media ${deviceType.mobileNavigation} {
        flex-direction: column;
    }
`;

const DescriptionWrapper = styled.div`
    max-width: 550px;

    @media ${deviceType.mobileNavigation} {
        max-width: 350px;
    }
`;

export const Styled = {
    ContentWrapper,
    DescriptionWrapper,
    NavigationButtonsWrapper,
};
