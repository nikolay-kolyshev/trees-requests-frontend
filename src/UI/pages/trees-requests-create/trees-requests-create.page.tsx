import React, { memo, useCallback, useEffect, useState } from 'react';
import { PageWrapper } from '@/UI/common/components/page-wrapper/page-wrapper.component';
import { Styled } from '@/UI/pages/trees-requests-create/trees-requests-create.styled';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FormHelperText, FormLabel, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Image } from 'mui-image';
import { useMobileNavigation } from '@/UI/common/devices';
import { LocationOn as LocationOnIcon, Photo as PhotoIcon, Send as SendIcon } from '@mui/icons-material';
import { TreesRequestsCreateFormValues } from '@/BLL/models/trees-requests-create/trees-requests.types';
import { loadTreesRequestsCreateFx } from '@/BLL/models/trees-requests-create/trees-requests.fx';
import { useUnit } from 'effector-react';
import {
    $treesRequestsCreate,
    resetTreesRequestsCreateStateEvent,
} from '@/BLL/models/trees-requests-create/trees-requests.store';
import LoadingButton from '@mui/lab/LoadingButton';
import { TreesRequestCreateSuccess } from '@/UI/pages/trees-requests-create/trees-request-create-success/trees-request-create-success.component';

const validationSchema = yup.object({
    name: yup.string().required('Название дерева обязательно!'),
    description: yup
        .string()
        .min(12, 'Описание проблемы не может быть меньше 12 символов')
        .required('Описание проблемы обязательно!'),
    coordinates: yup
        .object({
            accuracy: yup.number().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
        })
        .required('Координаты дерева обязательны!'),
    image: yup.string().required('Фотография дерева обязательна!'),
});

export const TreesRequestsCreate: React.FC = memo(() => {
    const loadTreesRequestsCreate = useUnit(loadTreesRequestsCreateFx);
    const resetTreesRequestsCreateState = useUnit(resetTreesRequestsCreateStateEvent);
    const { data, isLoading: isFormDataSending } = useUnit($treesRequestsCreate);

    const isMobile = useMobileNavigation();

    const formik = useFormik<TreesRequestsCreateFormValues>({
        initialValues: {
            name: undefined,
            description: undefined,
            coordinates: {
                accuracy: undefined,
                latitude: undefined,
                longitude: undefined,
            },
            image: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            loadTreesRequestsCreate(values);
        },
    });

    const [imagePreview, setImagePreview] = useState<string>();

    useEffect(() => {
        if (!formik.values.image) {
            setImagePreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(formik.values.image);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [formik.values.image]);

    const handleSelectImageFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e?.target?.files || e.target.files.length === 0) {
                formik.setFieldValue('image', undefined);
                return;
            }

            formik.setFieldValue('image', e.target.files[0]);
        },
        [formik],
    );

    const handleSetCoordinates = useCallback(() => {
        navigator.geolocation.getCurrentPosition((data) => {
            if (!data) {
                formik.setFieldError('coordinates', 'Ошибка при попытке получить координаты дерева');
            }
            formik.setFieldValue(
                'coordinates',
                {
                    accuracy: data.coords.accuracy,
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                },
                true,
            );
        });
    }, [formik]);

    useEffect(() => {
        return resetTreesRequestsCreateState;
    }, [resetTreesRequestsCreateState]);

    if (data?.status === 201) {
        return <TreesRequestCreateSuccess treeName={formik.values.name ?? 'Безымянное'} />;
    }

    return (
        <PageWrapper>
            <Styled.ContentWrapper>
                <Typography variant={isMobile ? 'h6' : 'h5'} align="center">
                    Данные о пострадавшем дереве
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Styled.FormItemsWrapper>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Название дерева"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            required={true}
                            size={isMobile ? 'small' : 'medium'}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Описание проблемы"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            required={true}
                            size={isMobile ? 'small' : 'medium'}
                        />
                        <Divider />
                        <Styled.FormItemsCoordinatesWrapper>
                            <FormLabel required={true}>Точность</FormLabel>
                            <TextField
                                fullWidth
                                id="coordinates.accuracy"
                                name="coordinates.accuracy"
                                type="number"
                                value={formik.values.coordinates.accuracy}
                                required={true}
                                size={'small'}
                            />
                            <FormLabel required={true}>Широта</FormLabel>
                            <TextField
                                fullWidth
                                id="coordinates.latitude"
                                name="coordinates.latitude"
                                type="number"
                                value={formik.values.coordinates.latitude}
                                required={true}
                                size={'small'}
                            />
                            <FormLabel required={true}>Долгота</FormLabel>
                            <TextField
                                fullWidth
                                id="coordinates.longitude"
                                name="coordinates.longitude"
                                type="number"
                                value={formik.values.coordinates.longitude}
                                required={true}
                                size={'small'}
                            />
                            <FormHelperText error={Boolean(formik.errors.coordinates)}>
                                {formik.touched.coordinates && (formik.errors.coordinates?.accuracy ?? '')}
                            </FormHelperText>
                            <Button
                                color="primary"
                                variant="outlined"
                                fullWidth
                                type="button"
                                onClick={handleSetCoordinates}
                                size={isMobile ? 'small' : 'medium'}
                                startIcon={<LocationOnIcon />}
                            >
                                Запросить координаты дерева
                            </Button>
                        </Styled.FormItemsCoordinatesWrapper>
                        <Divider />
                        {formik.touched.image && (formik.errors.image ?? '') && (
                            <FormHelperText error={Boolean(formik.errors.image)}>
                                {formik.touched.image && (formik.errors.image ?? '')}
                            </FormHelperText>
                        )}
                        {imagePreview && (
                            <Paper sx={{ p: 1 }} elevation={10}>
                                <Image src={imagePreview} />{' '}
                            </Paper>
                        )}
                        <Button
                            color="primary"
                            variant="contained"
                            component="label"
                            size={isMobile ? 'small' : 'medium'}
                            startIcon={<PhotoIcon />}
                        >
                            Загрузить фотографию дерева
                            <input
                                hidden
                                accept="image/*"
                                multiple={false}
                                type="file"
                                onChange={handleSelectImageFile}
                            />
                        </Button>
                        <Divider />
                        <LoadingButton
                            color="secondary"
                            size={isMobile ? 'medium' : 'large'}
                            variant="contained"
                            fullWidth
                            type="submit"
                            startIcon={<SendIcon />}
                            loading={isFormDataSending}
                        >
                            Отправить данные
                        </LoadingButton>
                    </Styled.FormItemsWrapper>
                </form>
            </Styled.ContentWrapper>
        </PageWrapper>
    );
});
