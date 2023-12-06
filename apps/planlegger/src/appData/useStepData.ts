import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { notEmpty } from '@navikt/fp-validation';
import { Path, REQUIRED_APP_STEPS, PATH_ORDER } from './paths';
import { I18nFn, useCustomIntl } from '@navikt/fp-ui';

// TODO Denne bør flyttast ut
const getPathToLabelMap = (i18n: I18nFn) =>
    ({
        [Path.OM_PLANLEGGER]: i18n('OmPlanleggerenSteg.OmPlanleggeren'),
        [Path.HVEM_PLANLEGGER]: i18n('HvemPlanleggerSteg.HvemPlanlegger'),
    }) as Record<string, string>;

const useStepData = () => {
    const { i18n } = useCustomIntl();
    const pathToLabelMap = getPathToLabelMap(i18n);

    const location = useLocation();

    const currentPath = useMemo(
        () => notEmpty(Object.values(Path).find((v) => v === decodeURIComponent(location.pathname))),
        [],
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
                label: pathToLabelMap[p],
                index,
            })),
        }),
        [],
    );
};

export default useStepData;
