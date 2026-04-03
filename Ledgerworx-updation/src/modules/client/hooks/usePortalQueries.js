import { useQuery } from '@tanstack/react-query';
import { fetchPortalCatalog, fetchPortalDashboard, fetchPortalInvoices } from '../api/portalApi';

export function usePortalDashboardQuery(options = {}) {
    return useQuery({
        queryKey: ['portal-dashboard'],
        queryFn: fetchPortalDashboard,
        staleTime: 0,
        gcTime: 15 * 60 * 1000,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
        refetchIntervalInBackground: false,
        retry: 1,
        ...options
    });
}

export function usePortalCatalogQuery(options = {}) {
    return useQuery({
        queryKey: ['portal-catalog'],
        queryFn: fetchPortalCatalog,
        staleTime: 0,
        gcTime: 30 * 60 * 1000,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
        refetchInterval: 15000,
        refetchIntervalInBackground: false,
        retry: 1,
        ...options
    });
}

export function usePortalInvoicesQuery(options = {}) {
    return useQuery({
        queryKey: ['portal-invoices'],
        queryFn: fetchPortalInvoices,
        staleTime: 0,
        gcTime: 15 * 60 * 1000,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
        refetchInterval: 60000,
        refetchIntervalInBackground: false,
        retry: 1,
        ...options
    });
}
