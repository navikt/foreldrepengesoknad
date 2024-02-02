import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { notEmpty } from '@navikt/fp-validation';
import { PlanleggerRoutes, REQUIRED_APP_STEPS, PATH_ORDER } from 'appData/routes';

const useStepData = () => {
    const location = useLocation();

    const currentPath = useMemo(
        () => notEmpty(Object.values(PlanleggerRoutes).find((v) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );

    const appPathList = useMemo(
        () => PATH_ORDER.flatMap((path) => (REQUIRED_APP_STEPS.includes(path) ? [path] : [])),
        [],
    );

    return useMemo(
        () => ({
            activeStepId: currentPath,
            stepConfig: appPathList.map((p, index) => ({
                id: p,
                label: '',
                index,
            })),
        }),
        [appPathList, currentPath],
    );
};

export default useStepData;
