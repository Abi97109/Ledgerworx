import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    advanceClientRequestDebug,
    createClientRequest,
    deleteClientDocument,
    deleteClientRequest,
    fetchClientDocuments,
    fetchClientRequests,
    updateClientRequest,
} from '../api/clientRequestsApi';

export const CLIENT_REQUESTS_QUERY_KEY = ['client-requests'];
export const CLIENT_DOCUMENTS_QUERY_KEY = ['client-documents'];

export function useClientRequestsQuery() {
    return useQuery({
        queryKey: CLIENT_REQUESTS_QUERY_KEY,
        queryFn: fetchClientRequests,
        staleTime: 0,
        gcTime: 15 * 60 * 1000,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
        refetchIntervalInBackground: false,
        retry: 1,
    });
}

export function useClientDocumentsQuery() {
    return useQuery({
        queryKey: CLIENT_DOCUMENTS_QUERY_KEY,
        queryFn: fetchClientDocuments,
        staleTime: 0,
        gcTime: 15 * 60 * 1000,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
        refetchIntervalInBackground: false,
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
                queryClient.invalidateQueries({ queryKey: CLIENT_DOCUMENTS_QUERY_KEY }),
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
                queryClient.invalidateQueries({ queryKey: CLIENT_DOCUMENTS_QUERY_KEY }),
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
                queryClient.invalidateQueries({ queryKey: CLIENT_DOCUMENTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ['portal-dashboard'] }),
            ]);
        },
    });
}

export function useDeleteClientDocumentMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteClientDocument,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: CLIENT_DOCUMENTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: CLIENT_REQUESTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ['portal-dashboard'] }),
            ]);
        },
    });
}

export function useAdvanceClientRequestDebugMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: advanceClientRequestDebug,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: CLIENT_DOCUMENTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: CLIENT_REQUESTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: ['portal-dashboard'] }),
                queryClient.invalidateQueries({ queryKey: ['portal-notifications'] }),
            ]);
        },
    });
}
