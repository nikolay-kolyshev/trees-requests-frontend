import { STAbstract } from '@/DAL/services/services.types';

export class STTreeRequestPreview extends STAbstract {
    public readonly name: string;
    public readonly description: string;
    public readonly coordinates: {
        accuracy: string;
        latitude: string;
        longitude: string;
    };
    imageId: number;
}
