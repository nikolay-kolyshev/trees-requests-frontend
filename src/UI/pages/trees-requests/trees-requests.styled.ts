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

const ListWrapper = styled.div`
    width: 100vw;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    @media ${deviceType.mobileNavigation} {
        max-width: 350px;
        gap: 10px;
    }
`;
export const Styled = {
    ContentWrapper,
    ListWrapper,
};
