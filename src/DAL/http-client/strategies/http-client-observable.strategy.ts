import {
    THttpClientMethodMutableConfig,
    THttpClientMethodUnMutableConfig,
    THttpClientRequest,
} from '../http-client.types';
import { httpClientMethod } from '../decorators/http-client-method.decorator';
import { HttpClientBase } from '../http-client-base.abstract';
import { EHttpClientStrategy } from '../http-client.types';
import { Observable } from 'rxjs';
import { Service } from 'typedi';

@Service()
export class HttpClientObservable extends HttpClientBase<EHttpClientStrategy.Observable> {
    @httpClientMethod(EHttpClientStrategy.Observable)
    override getData<R>(url: string, config?: THttpClientRequest & THttpClientMethodUnMutableConfig): Observable<R> {
        return this.apiInstance.get(url, {
            params: config?.queryParams ?? {},
            headers: config?.headers ?? {},
        }) as unknown as Observable<R>;
    }

    @httpClientMethod(EHttpClientStrategy.Observable)
    override postData<R>(url: string, config?: THttpClientRequest & THttpClientMethodMutableConfig): Observable<R> {
        return this.apiInstance.post(url, config?.body ?? {}, {
            params: config?.queryParams,
            headers: config?.headers ?? {},
        }) as unknown as Observable<R>;
    }

    @httpClientMethod(EHttpClientStrategy.Observable)
    override putData<R>(url: string, config?: THttpClientRequest & THttpClientMethodMutableConfig): Observable<R> {
        return this.apiInstance.put(url, config?.body ?? {}, {
            params: config?.queryParams,
            headers: config?.headers ?? {},
        }) as unknown as Observable<R>;
    }
    @httpClientMethod(EHttpClientStrategy.Observable)
    override deleteData<R>(url: string, config?: THttpClientRequest & THttpClientMethodUnMutableConfig): Observable<R> {
        return this.apiInstance.delete(url, {
            params: config?.queryParams ?? {},
            headers: config?.headers ?? {},
        }) as unknown as Observable<R>;
    }
}
