import { combine, restore } from 'effector';
import { loadTreesRequestsCreateFx } from '@/BLL/models/trees-requests-create/trees-requests.fx';
import { treesRequestsCreateDomain } from '@/BLL/models.domains';

export const resetTreesRequestsCreateStateEvent = treesRequestsCreateDomain.createEvent();

export const $data = restore(loadTreesRequestsCreateFx, null);
export const $isLoading = loadTreesRequestsCreateFx.pending;
export const $error = restore(loadTreesRequestsCreateFx.failData, null);

export const $treesRequestsCreate = combine({
    data: $data,
    isLoading: $isLoading,
    error: $error,
});
