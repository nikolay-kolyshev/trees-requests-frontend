import { treesRequestsDomain } from '@/BLL/models.domains';
import { treesRequestsService } from '@/DAL/services';

export const loadTreesRequestsFx = treesRequestsDomain.createEffect(async () => {
    return await treesRequestsService.fetchTreesRequests();
});
