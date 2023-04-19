import { combine, restore } from 'effector';
import { loadTreesRequestsFx } from '@/BLL/models/trees-requests/trees-requests.fx';

const $data = restore(loadTreesRequestsFx, []);

const $dataSorted = $data.map((data) => {
    return [...data].reverse();
});

export const $treesRequests = combine({
    data: $dataSorted,
    isLoading: loadTreesRequestsFx.pending,
    error: restore(loadTreesRequestsFx.fail, null),
});
