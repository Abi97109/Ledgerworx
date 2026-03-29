import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPortalBootstrap } from '../api/portalApi';

const PortalSessionContext = createContext(null);

export function PortalSessionProvider({ children }) {
    const bootstrapQuery = useQuery({
        queryKey: ['portal-bootstrap'],
        queryFn: fetchPortalBootstrap,
        staleTime: 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false
    });

    return (
        <PortalSessionContext.Provider value={bootstrapQuery}>
            {children}
        </PortalSessionContext.Provider>
    );
}

export function usePortalSession() {
    const context = useContext(PortalSessionContext);

    if (!context) {
        throw new Error('usePortalSession must be used within PortalSessionProvider.');
    }

    return context;
}
