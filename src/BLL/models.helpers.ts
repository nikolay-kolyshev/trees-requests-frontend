import { createApi, Domain, Effect, Store } from 'effector';
import { BooleanStoreApi, BooleanStoreApiConfig } from '@/BLL/models.helpers-types';
import { and, or } from 'patronum';

/**
 * @name isFxFinally
 * @summary Хэлпер получает на вход массив эффектов и отдает булевый стор, когда все эффекты в состоянии finally
 * @param {Array<Effect<any, any, any>>} effects
 * @param {Domain} domain
 * @return {Store<boolean>}
 */
export function isFxFinally(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    effects: Array<Effect<any, any, any>>,
    domain: Domain,
): Store<boolean>;

/**
 * @name isFxFinally
 * @summary Хэлпер получает на вход массив эффектов и отдает булевый стор, когда все эффекты в состоянии finally
 * @param {Array<Effect<any, any, any>>} effects
 * @param {Domain} domain
 * @param {'every'} unionStrategy
 * @return {Store<boolean>}
 */
export function isFxFinally(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    effects: Array<Effect<any, any, any>>,
    domain: Domain,
    unionStrategy: 'every',
): Store<boolean>;

/**
 * @name isFxFinally
 * @summary Хэлпер получает на вход массив эффектов и отдает булевый стор, когда хотя бы один эффект в состоянии finally
 * @param {Array<Effect<any, any, any>>} effects
 * @param {Domain} domain
 * @param {'some'} unionStrategy
 * @return {Store<boolean>}
 */
export function isFxFinally(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    effects: Array<Effect<any, any, any>>,
    domain: Domain,
    unionStrategy: 'some',
): Store<boolean>;

/**
 * @name isFxFinally
 * @summary Хэлпер получает на вход эффект и отдает булевый стор, когда эффект в состоянии finally
 * @param {Effect<Params = undefined, Done = void, Fail = Error>} effect
 * @param {Domain} domain
 * @return {Store<boolean>}
 */
export function isFxFinally<Params = undefined, Done = void, Fail = Error>(
    effect: Effect<Params, Done, Fail>,
    domain: Domain,
): Store<boolean>;

export function isFxFinally<Params = undefined, Done = void, Fail = Error>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    effectOrEffects: Effect<Params, Done, Fail> | Array<Effect<any, any, any>>,
    domain: Domain,
    unionStrategy: 'every' | 'some' = 'every',
): Store<boolean> {
    if (Array.isArray(effectOrEffects)) {
        const unionMethod = unionStrategy === 'some' ? or : and;
        return unionMethod(...effectOrEffects.map((effect) => isFxFinally(effect, domain)));
    }
    const $isLoaded = domain.createStore(false);
    $isLoaded.on(effectOrEffects, () => false).on(effectOrEffects.finally, () => true);
    return $isLoaded;
}

export function createBooleanStoreApi(
    booleanStore: Store<boolean>,
    withToggle?: false,
): BooleanStoreApi<'setTrue' | 'setFalse'>;

export function createBooleanStoreApi(
    booleanStore: Store<boolean>,
    withToggle: true,
): BooleanStoreApi<'setTrue' | 'setFalse' | 'toggle'>;

export function createBooleanStoreApi(
    booleanStore: Store<Nullable<boolean>>,
    withToggle?: false,
): BooleanStoreApi<'setTrue' | 'setFalse'>;

export function createBooleanStoreApi(
    booleanStore: Store<Nullable<boolean>>,
    withToggle: true,
): BooleanStoreApi<'setTrue' | 'setFalse' | 'toggle'>;

export function createBooleanStoreApi<
    WithToggle extends boolean = false,
    State extends Store<boolean> | Store<Nullable<boolean>> = Store<boolean>,
>(booleanStore: State, withToggle?: WithToggle) {
    const apiConfig: BooleanStoreApiConfig<'setTrue' | 'setFalse' | 'toggle'> = {
        setTrue: () => true,
        setFalse: () => false,
    };

    if (withToggle) {
        apiConfig.toggle = (value) => {
            if (value === null) return value;
            return !value;
        };
    }

    return createApi(booleanStore as Store<boolean>, apiConfig) as unknown as WithToggle extends true
        ? BooleanStoreApi<'setTrue' | 'setFalse' | 'toggle'>
        : BooleanStoreApi<'setTrue' | 'setFalse'>;
}
