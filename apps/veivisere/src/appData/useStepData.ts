import { HvorMyeRoutes, PATH_ORDER, REQUIRED_APP_STEPS_HVOR_MYE } from 'appData/routes';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { ProgressStep } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

const useStepData = (): Array<ProgressStep<HvorMyeRoutes>> => {
    const location = useLocation();
    console.log(decodeURIComponent(location.pathname));
    const currentPath = useMemo(
        () =>
            notEmpty(
                Object.values(HvorMyeRoutes).find(
                    (v) =>
                        v === decodeURIComponent(location.pathname) ||
                        HvorMyeRoutes.HVOR_MYE + v === decodeURIComponent(location.pathname),
                ),
            ),
        [location.pathname],
    );

    const appPathList = useMemo(
        () => PATH_ORDER.flatMap((path) => (REQUIRED_APP_STEPS_HVOR_MYE.includes(path) ? [path] : [])),
        [],
    );

    return appPathList.map((p) => ({
        id: p,
        isSelected: p === currentPath,
    }));
};

export default useStepData;
