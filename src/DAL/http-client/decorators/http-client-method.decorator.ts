import { EHttpClientStrategy, THttpClientMethod } from '../http-client.types';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpClientPromise } from '../strategies/http-client-promise.strategy';
import { catchError, defer, map, Observable } from 'rxjs';
import { HttpClientObservable } from '../strategies/http-client-observable.strategy';
import { exhaustiveCheck } from '@/common/helpers/exhaustive-check.helper';

const UNKNOWN_ERROR = 'Что-то пошло не так';

const getErrorMessage = (error: AxiosError) => error?.message ?? UNKNOWN_ERROR;

const getDescriptorOriginalMethod = <ServiceStrategy extends EHttpClientStrategy>(
    descriptorValue: Undefinedtable<THttpClientMethod<ServiceStrategy, any>>,
) => {
    if (!descriptorValue) {
        throw new Error('Метод http-клиента не найден!');
    }
    return descriptorValue;
};

const httpClientMethodPromise = (
    _target: HttpClientPromise,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<THttpClientMethod<EHttpClientStrategy.Promise, any>>,
) => {
    const originalMethod = getDescriptorOriginalMethod<EHttpClientStrategy.Promise>(descriptor.value);

    descriptor.value = async function (...props) {
        try {
            const response = (await originalMethod.apply(this, props)) as AxiosResponse;

            if (!response.data) {
                console.error('Backend не вернул дату!', propertyKey, response.status, response.statusText);
            }

            return response.data;
        } catch (error) {
            const errorMessage = getErrorMessage(error as AxiosError);
            throw new Error(errorMessage);
        }
    };
};
const httpClientMethodObservable = (
    _target: HttpClientObservable,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<THttpClientMethod<EHttpClientStrategy.Observable, any>>,
) => {
    const originalMethod = getDescriptorOriginalMethod<EHttpClientStrategy.Observable>(descriptor.value);

    descriptor.value = function (...props) {
        return defer<Observable<AxiosResponse>>(() => {
            return originalMethod.apply(this, props);
        }).pipe(
            map((result) => result.data),
            catchError((error) => {
                const errorMessage = getErrorMessage(error as AxiosError);
                throw new Error(errorMessage);
            }),
        );
    };
};

export function httpClientMethod(serviceStrategy: EHttpClientStrategy.Promise): typeof httpClientMethodPromise;
export function httpClientMethod(serviceStrategy: EHttpClientStrategy.Observable): typeof httpClientMethodObservable;

export function httpClientMethod(
    serviceStrategy: EHttpClientStrategy,
): typeof httpClientMethodPromise | typeof httpClientMethodObservable {
    switch (serviceStrategy) {
        case EHttpClientStrategy.Promise:
            return httpClientMethodPromise;
        case EHttpClientStrategy.Observable:
            return httpClientMethodObservable;
        default:
            exhaustiveCheck(serviceStrategy);
            return httpClientMethodPromise;
    }
}
