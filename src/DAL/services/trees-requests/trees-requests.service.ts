import { Inject, Service } from 'typedi';
import { BaseService } from '../base.service';
import { HttpClientPromise } from '@/DAL/http-client/strategies/http-client-promise.strategy';
import { STTreeRequestPreview } from '@/DAL/services/trees-requests/trees-requsts.service-types';

@Service()
export class TreesRequestsService extends BaseService {
    constructor(
        @Inject()
        private readonly httpClient: HttpClientPromise,
    ) {
        super();
        this.serviceUrl = '/trees-requests';
    }

    async fetchTreesRequests(): Promise<STTreeRequestPreview[]> {
        return await this.httpClient.getData(this.getServiceEndpoint('/'));
    }

    async createTreesRequest(payload: FormData): Promise<{ status: number }> {
        return await this.httpClient.postData(this.getServiceEndpoint('/create'), {
            body: payload,
        });
    }
}
