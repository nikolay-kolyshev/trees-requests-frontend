import { createDomain } from 'effector';

export const rootDomain = createDomain();

export const treesRequestsDomain = rootDomain.createDomain();
export const treesRequestsCreateDomain = rootDomain.createDomain();
export const themeDomain = rootDomain.createDomain();
