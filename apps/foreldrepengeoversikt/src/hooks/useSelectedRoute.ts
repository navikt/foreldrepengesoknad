import { useEffect } from 'react';

import { useOversiktState } from './../context/OversiktStateContext';
import { OversiktRoutes } from './../routes/routes';

export const useGetSelectedRoute = () => {
    const { selectedRoute } = useOversiktState();
    return selectedRoute;
};

export const useSetSelectedRoute = (route: OversiktRoutes) => {
    const { setSelectedRoute } = useOversiktState();

    useEffect(() => {
        setSelectedRoute(route);
    }, [setSelectedRoute, route]);
};
