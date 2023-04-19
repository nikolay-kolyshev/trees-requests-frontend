import { Container } from 'typedi';
import { TreesRequestsService } from '@/DAL/services/trees-requests/trees-requests.service';
export const treesRequestsService = Container.get(TreesRequestsService);
