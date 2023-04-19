import { reset } from 'patronum';
import {
    $data,
    $error,
    $isLoading,
    resetTreesRequestsCreateStateEvent,
} from '@/BLL/models/trees-requests-create/trees-requests.store';

reset({
    clock: resetTreesRequestsCreateStateEvent,
    target: [$data, $isLoading, $error],
});
