import { useQuery } from '@tanstack/react-query';
import { fetchPortalCatalog, fetchPortalDashboard } from '../api/portalApi';

export function usePortalDashboardQuery() {
    return useQuery({
        queryKey: ['portal-dashboard'],
        queryFn: fetchPortalDashboard,
        staleTime: 5 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        retry: 1
    });
}

export function usePortalCatalogQuery() {
    return useQuery({
        queryKey: ['portal-catalog'],
        queryFn: fetchPortalCatalog,
        staleTime: 15 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: 1
    });
}
