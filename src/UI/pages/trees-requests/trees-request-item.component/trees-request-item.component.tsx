import React, { memo, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import { useMobileNavigation } from '@/UI/common/devices';
import Divider from '@mui/material/Divider';
import { Image } from 'mui-image';
import { Styled } from '@/UI/pages/trees-requests/trees-request-item.component/trees-requests-item.styled';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MyLocationIcon from '@mui/icons-material/MyLocation';

interface ITreesRequestsCreate {
    name: string;
    description: string;
    imageId: number;
    coordinates: {
        accuracy: string;
        latitude: string;
        longitude: string;
    };
}

export const TreesRequestsCreateItem: React.FC<ITreesRequestsCreate> = memo(
    ({ name, description, imageId, coordinates }) => {
        const isMobile = useMobileNavigation();

        const imageUrl = useMemo(() => {
            return `http://localhost:5555/images/${imageId}`;
        }, [imageId]);

        return (
            <Styled.ContentWrapper sx={{ p: isMobile ? 2 : 3 }} elevation={7}>
                <Typography variant="h4">{name}</Typography>
                <Divider />
                <Typography>{description}</Typography>
                <Image src={imageUrl} />
                <Styled.LocationWrapper>
                    <MyLocationIcon color={'error'} />
                    <Typography>
                        Точность локации: <b>{coordinates?.accuracy ?? 'Неизвестно'}</b>
                    </Typography>
                </Styled.LocationWrapper>
                <Styled.LocationWrapper>
                    <FmdGoodIcon />
                    <Typography>
                        Широта: <b>{coordinates?.latitude ?? 'Неизвестно'}</b>
                    </Typography>
                </Styled.LocationWrapper>
                <Styled.LocationWrapper>
                    <FmdGoodIcon />
                    <Typography>
                        Долгота: <b>{coordinates?.longitude ?? 'Неизвестно'}</b>
                    </Typography>
                </Styled.LocationWrapper>
            </Styled.ContentWrapper>
        );
    },
);
