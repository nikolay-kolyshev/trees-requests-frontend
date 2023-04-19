export class BaseService {
    private _serviceUrl = '/';

    protected set serviceUrl(serviceUrl: string) {
        this._serviceUrl = serviceUrl;
    }

    protected get serviceUrl() {
        return this._serviceUrl;
    }

    protected getServiceEndpoint(endpointUrl: string, uriParam?: string | number): string {
        return `${this.serviceUrl}${endpointUrl}${uriParam ? '/' + uriParam.toString() : ''}`;
    }
}
