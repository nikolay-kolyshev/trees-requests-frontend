import { RoutingPageKey } from '@/UI/routing/routing.types';

export const routingPages: Record<RoutingPageKey, { path: `/${string}`; name: string }> = {
    [RoutingPageKey.Home]: {
        path: '/',
        name: 'Главная',
    },
    [RoutingPageKey.TreesRequestsCreate]: {
        path: '/trees-requests/create',
        name: 'Новый запрос',
    },
    [RoutingPageKey.TreesRequests]: {
        path: '/trees-requests',
        name: 'Запросы',
    },
};
