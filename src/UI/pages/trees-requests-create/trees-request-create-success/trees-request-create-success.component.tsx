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

interface ITreesRequestCreateSuccessProps {
    treeName: string;
}

export const TreesRequestCreateSuccess: React.FC<ITreesRequestCreateSuccessProps> = memo(
    ({ treeName }: ITreesRequestCreateSuccessProps) => {
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
                    src="https://s1.1zoom.ru/b5050/366/Flowering_trees_Sakura_486025_1920x1200.jpg"
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
                        <Typography variant="h4">Спасибо за обращение!</Typography>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Styled.DescriptionWrapper>
                            <Typography>
                                Мы ценим Ваше участие в жизни деревьев и постараемся как можно скорее помочь дереву{' '}
                                <b>{treeName}</b>
                            </Typography>
                        </Styled.DescriptionWrapper>
                        <Styled.NavigationButtonsWrapper>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => handleNavigatePage(routingPages.Home.path)}
                            >
                                На главную
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => handleNavigatePage(routingPages.TreesRequests.path)}
                            >
                                К запросам
                            </Button>
                        </Styled.NavigationButtonsWrapper>
                    </Paper>
                </Styled.ContentWrapper>
            </PageWrapper>
        );
    },
);
