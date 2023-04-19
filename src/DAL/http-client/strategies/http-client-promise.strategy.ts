import {
    THttpClientMethodMutableConfig,
    THttpClientMethodUnMutableConfig,
    THttpClientRequest,
} from '../http-client.types';
import { httpClientMethod } from '../decorators/http-client-method.decorator';
import { HttpClientBase } from '../http-client-base.abstract';
import { EHttpClientStrategy } from '../http-client.types';
import { Service } from 'typedi';

@Service()
export class HttpClientPromise extends HttpClientBase<EHttpClientStrategy.Promise> {
    @httpClientMethod(EHttpClientStrategy.Promise)
    override async getData<R>(url: string, config?: THttpClientRequest & THttpClientMethodUnMutableConfig): Promise<R> {
        return await this.apiInstance.get(url, {
            params: config?.queryParams ?? {},
            headers: config?.headers ?? {},
        });
    }

    @httpClientMethod(EHttpClientStrategy.Promise)
    override async postData<R>(url: string, config?: THttpClientRequest & THttpClientMethodMutableConfig): Promise<R> {
        const formDataHeaders = { 'Content-Type': 'multipart/form-data' };
        return await this.apiInstance.post(url, config?.formData ?? config?.body ?? {}, {
            params: config?.queryParams,
            headers: config?.formData
                ? config?.headers
                    ? { ...formDataHeaders, ...config?.headers }
                    : formDataHeaders
                : {},
        });
    }

    @httpClientMethod(EHttpClientStrategy.Promise)
    override async putData<R>(url: string, config?: THttpClientRequest & THttpClientMethodMutableConfig): Promise<R> {
        const formDataHeaders = { 'Content-Type': 'multipart/form-data' };
        return await this.apiInstance.put(url, config?.formData ?? config?.body ?? {}, {
            params: config?.queryParams,
            headers: config?.formData
                ? config?.headers
                    ? { ...formDataHeaders, ...config?.headers }
                    : formDataHeaders
                : {},
        });
    }
    @httpClientMethod(EHttpClientStrategy.Promise)
    override async deleteData<R>(
        url: string,
        config?: THttpClientRequest & THttpClientMethodUnMutableConfig,
    ): Promise<R> {
        return await this.apiInstance.delete(url, {
            params: config?.queryParams ?? {},
            headers: config?.headers ?? {},
        });
    }
}
