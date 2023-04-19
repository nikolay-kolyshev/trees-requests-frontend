import React, { memo, useEffect } from 'react';
import { PageWrapper } from '@/UI/common/components/page-wrapper/page-wrapper.component';
import { Styled } from './trees-requests.styled';
import Typography from '@mui/material/Typography';
import { useMobileNavigation } from '@/UI/common/devices';
import { useUnit } from 'effector-react';
import { $treesRequests } from '@/BLL/models/trees-requests/trees-requests.store';
import { loadTreesRequestsFx } from '@/BLL/models/trees-requests/trees-requests.fx';
import { Skeleton } from '@mui/material';
import { TreesRequestsCreateItem } from '@/UI/pages/trees-requests/trees-request-item.component/trees-request-item.component';

export const TreesRequests: React.FC = memo(() => {
    const loadTreesRequests = useUnit(loadTreesRequestsFx);
    const { data, isLoading } = useUnit($treesRequests);

    const isMobile = useMobileNavigation();

    useEffect(() => {
        loadTreesRequests();
    }, [loadTreesRequests]);

    return (
        <PageWrapper>
            <Styled.ContentWrapper>
                <Typography variant={isMobile ? 'h6' : 'h5'} align="center">
                    Заявки на лечение деревьев
                </Typography>
                <Styled.ListWrapper>
                    {isLoading ? (
                        <>
                            <Typography component="div" variant="h1">
                                <Skeleton />
                            </Typography>
                            <Typography component="div" variant="h1">
                                <Skeleton />
                            </Typography>
                            <Typography component="div" variant="h2">
                                <Skeleton />
                            </Typography>
                            <Typography component="div" variant="h2">
                                <Skeleton />
                            </Typography>
                            <Typography component="div" variant="h3">
                                <Skeleton />
                            </Typography>
                            <Typography component="div" variant="h4">
                                <Skeleton />
                            </Typography>
                            <Typography component="div" variant="h5">
                                <Skeleton />
                            </Typography>
                        </>
                    ) : (
                        data.map((item) => {
                            return (
                                <TreesRequestsCreateItem
                                    key={item.id}
                                    name={item.name}
                                    description={item.description}
                                    coordinates={item.coordinates}
                                    imageId={item.imageId}
                                />
                            );
                        })
                    )}
                </Styled.ListWrapper>
            </Styled.ContentWrapper>
        </PageWrapper>
    );
});
