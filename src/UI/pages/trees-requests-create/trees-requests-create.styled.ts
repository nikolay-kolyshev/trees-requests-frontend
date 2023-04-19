import styled from 'styled-components';
import { deviceType } from '@/UI/common/devices';

const ContentWrapper = styled.div`
    width: 100vw;
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
`;

const FormItemsWrapper = styled.div`
    max-width: 500px;
    width: calc(100vw - 30px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;

    @media ${deviceType.mobileNavigation} {
        max-width: none;
        gap: 15px;
    }
`;

const FormItemsCoordinatesWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

export const Styled = {
    ContentWrapper,
    FormItemsWrapper,
    FormItemsCoordinatesWrapper,
};
