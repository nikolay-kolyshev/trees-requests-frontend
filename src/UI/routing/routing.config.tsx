import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { routingPages } from '@/UI/routing/routing.constants';
import { HomePage } from '@/UI/pages/home/home.page';
import { TreesRequestsCreate } from '@/UI/pages/trees-requests-create/trees-requests-create.page';
import { TreesRequests } from '@/UI/pages/trees-requests/trees-requests.page';

export const routerConfig = createBrowserRouter([
    {
        path: routingPages.Home.path,
        element: <HomePage />,
    },
    {
        path: routingPages.TreesRequests.path,
        element: <TreesRequests />,
    },
    {
        path: routingPages.TreesRequestsCreate.path,
        element: <TreesRequestsCreate />,
    },
]);
