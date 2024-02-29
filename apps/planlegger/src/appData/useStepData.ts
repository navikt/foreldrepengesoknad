import { PATH_ORDER, PlanleggerRoutes, REQUIRED_APP_STEPS } from 'appData/routes';
import { ProgressStep } from 'components/progressStepper/ProgressStepper';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { notEmpty } from '@navikt/fp-validation';

const useStepData = (): Array<ProgressStep<PlanleggerRoutes>> => {
    const location = useLocation();

    const currentPath = useMemo(
        () => notEmpty(Object.values(PlanleggerRoutes).find((v) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );

    const appPathList = useMemo(
        () => PATH_ORDER.flatMap((path) => (REQUIRED_APP_STEPS.includes(path) ? [path] : [])),
        [],
    );

    return appPathList.map((p) => ({
        id: p,
        isSelected: p === currentPath,
    }));
};

export default useStepData;
