import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createClientRequest,
    deleteClientRequest,
    fetchClientRequests,
    updateClientRequest,
} from '../api/clientRequestsApi';

export const CLIENT_REQUESTS_QUERY_KEY = ['client-requests'];

export function useClientRequestsQuery() {
    return useQuery({
        queryKey: CLIENT_REQUESTS_QUERY_KEY,
        queryFn: fetchClientRequests,
        staleTime: 5 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        retry: 1,
    });
}

export function useCreateClientRequestMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createClientRequest,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: CLIENT_REQUESTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ['portal-dashboard'] }),
            ]);
        },
    });
}

export function useUpdateClientRequestMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ requestId, requestData }) => updateClientRequest(requestId, requestData),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: CLIENT_REQUESTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ['portal-dashboard'] }),
            ]);
        },
    });
}

export function useDeleteClientRequestMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteClientRequest,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: CLIENT_REQUESTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ['portal-dashboard'] }),
            ]);
        },
    });
}
