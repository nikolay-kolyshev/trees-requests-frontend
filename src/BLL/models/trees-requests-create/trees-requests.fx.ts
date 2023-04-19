import { treesRequestsCreateDomain } from '@/BLL/models.domains';
import { treesRequestsService } from '@/DAL/services';
import { TreesRequestsCreateFormValues } from '@/BLL/models/trees-requests-create/trees-requests.types';

export const loadTreesRequestsCreateFx = treesRequestsCreateDomain.createEffect<
    TreesRequestsCreateFormValues,
    { status: number },
    unknown
>(async (payload) => {
    const formData = new FormData();
    formData.append('name', payload.name ?? '');
    formData.append('description', payload.description ?? '');
    formData.append('coordinatesAccuracy', payload.coordinates.accuracy?.toString() ?? '');
    formData.append('coordinatesLatitude', payload.coordinates.latitude?.toString() ?? '');
    formData.append('coordinatesLongitude', payload.coordinates.longitude?.toString() ?? '');
    formData.append('image', payload.image as Blob);
    return await treesRequestsService.createTreesRequest(formData);
});
