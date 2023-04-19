import { Event } from 'effector';

export type BooleanStoreApi<EventsNames extends string> = {
    [name in EventsNames]: Event<void>;
};

export type BooleanStoreApiConfig<EventsNames extends string, WithNullable extends boolean = false> = Partial<{
    [name in EventsNames]: (
        store: WithNullable extends true ? Nullable<boolean> : boolean,
    ) => WithNullable extends true ? Nullable<boolean> : boolean;
}>;
