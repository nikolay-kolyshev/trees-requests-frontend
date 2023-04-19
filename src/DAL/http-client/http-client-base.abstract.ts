import axios, { AxiosInstance } from 'axios';
import {
    EHttpClientStrategy,
    THttpClientMethodMutableConfig,
    THttpClientMethodUnMutableConfig,
    THttpClientRequest,
    THttpClientResponse,
} from './http-client.types';

export abstract class HttpClientBase<HttpClientStrategy extends EHttpClientStrategy> {
    private readonly baseUrl = 'http://localhost:5555';

    protected apiInstance: AxiosInstance = axios;

    constructor() {
        this.apiInstance = axios.create({
            baseURL: this.baseUrl,
        });
    }

    protected abstract getData<ResponseData>(
        url: string,
        config?: THttpClientRequest & THttpClientMethodUnMutableConfig,
    ): THttpClientResponse<HttpClientStrategy, ResponseData>;

    protected abstract postData<ResponseData>(
        url: string,
        config?: THttpClientRequest & THttpClientMethodMutableConfig,
    ): THttpClientResponse<HttpClientStrategy, ResponseData>;

    protected abstract putData<ResponseData>(
        url: string,
        config?: THttpClientRequest & THttpClientMethodMutableConfig,
    ): THttpClientResponse<HttpClientStrategy, ResponseData>;

    protected abstract deleteData<ResponseData>(
        url: string,
        config?: THttpClientRequest & THttpClientMethodUnMutableConfig,
    ): THttpClientResponse<HttpClientStrategy, ResponseData>;
}
