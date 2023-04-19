import React, { memo, useCallback, useMemo } from 'react';
import { PageWrapper } from '@/UI/common/components/page-wrapper/page-wrapper.component';
import { Image } from 'mui-image';
import { Styled } from '@/UI/pages/home/home.styled';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useNavbarHeight } from '@/UI/common/devices/use-navbar-height';
import { useNavigate } from 'react-router-dom';
import { routingPages } from '@/UI/routing/routing.constants';

export const HomePage: React.FC = memo(() => {
    const navbarHeight = useNavbarHeight();

    const imageHeight = useMemo(() => {
        return `calc(100vh - ${navbarHeight}px)`;
    }, [navbarHeight]);

    const navigate = useNavigate();

    const handleNavigatePage = useCallback(
        (path: string) => {
            navigate(path, {
                replace: true,
            });
        },
        [navigate],
    );

    return (
        <PageWrapper>
            <Image
                src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614624777_11-p-fon-lesa-dlya-fotoshopa-12.jpg"
                height={imageHeight}
                width="100vw"
                fit="cover"
                duration={1500}
                easing="cubic-bezier(0.7, 0, 0.6, 1)"
                showLoading={false}
                errorIcon={true}
                shift={null}
                distance="100px"
                shiftDuration={900}
                bgColor="inherit"
            />
            <Styled.ContentWrapper>
                <Paper sx={{ p: 3 }} elevation={10}>
                    <Typography variant="h4">Лечение деревьев</Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Styled.DescriptionWrapper>
                        <Typography>
                            Мы стараемся помочь поврежденным деревьям и предлагаем Вам отправить нам информацию об
                            обнаруженном дереве, которое нуждается в срочной помощи
                        </Typography>
                    </Styled.DescriptionWrapper>
                    <Styled.NavigationButtonsWrapper>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => handleNavigatePage(routingPages.TreesRequestsCreate.path)}
                        >
                            Сделать новый запрос
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => handleNavigatePage(routingPages.TreesRequests.path)}
                        >
                            Посмотреть запросы
                        </Button>
                    </Styled.NavigationButtonsWrapper>
                </Paper>
            </Styled.ContentWrapper>
        </PageWrapper>
    );
});
