import { AxiosRequestHeaders } from 'axios';
import { Observable } from 'rxjs';

export type THttpClientMethodConfig = THttpClientRequest & {
    queryParams?: object;
    body?: object;
    formData?: FormData;
};

export type THttpClientMethodMutableConfig = THttpClientMethodConfig;
export type THttpClientMethodUnMutableConfig = Omit<THttpClientMethodConfig, 'body' | 'formData'>;

export type THttpClientMethod<HttpClientStrategy extends EHttpClientStrategy, Request> = <R extends Request>(
    url: string,
    config?: THttpClientMethodMutableConfig | THttpClientMethodUnMutableConfig,
) => THttpClientResponse<HttpClientStrategy, R>;

export type THttpClientRequest = {
    token?: string;
    headers?: AxiosRequestHeaders;
};

export enum EHttpClientStrategy {
    Promise = 'Promise',
    Observable = 'Observable',
}

export type THttpClientResponse<
    HttpClientStrategy extends EHttpClientStrategy,
    ResponseData,
> = HttpClientStrategy extends EHttpClientStrategy.Promise ? Promise<ResponseData> : Observable<ResponseData>;
