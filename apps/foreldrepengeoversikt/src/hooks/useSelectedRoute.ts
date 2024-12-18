import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { selectedRouteAtom } from './../atoms/selectedRouteAtom';
import { OversiktRoutes } from './../routes/routes';

export const useGetSelectedRoute = () => {
    const selectedRoute = useAtomValue(selectedRouteAtom);
    return selectedRoute;
};

export const useSetSelectedRoute = (route: OversiktRoutes) => {
    const setSelectedRoute = useSetAtom(selectedRouteAtom);

    useEffect(() => {
        setSelectedRoute(route);
    }, [setSelectedRoute, route]);
};
