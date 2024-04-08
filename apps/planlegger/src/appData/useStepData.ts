import { PATH_ORDER, PlanleggerRoutes, REQUIRED_APP_STEPS } from 'appData/routes';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { isFlere } from 'types/HvemPlanlegger';

import { ProgressStep } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './PlanleggerDataContext';

const isAfterStep = (previousStepPath: PlanleggerRoutes, currentStepPath: PlanleggerRoutes): boolean => {
    return PATH_ORDER.indexOf(currentStepPath) > PATH_ORDER.indexOf(previousStepPath);
};

const showFordelingStep = (
    path: PlanleggerRoutes,
    currentPath: PlanleggerRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === PlanleggerRoutes.FORDELING) {
        const hvemPlanlegger = getData(ContextDataType.HVEM_PLANLEGGER);
        const arbeidssituasjon = getData(ContextDataType.ARBEIDSSITUASJON);
        const skalVise = arbeidssituasjon?.status === Arbeidsstatus.JOBBER && !!arbeidssituasjon?.jobberAnnenPart;
        const erValgtOgEtterSteg =
            hvemPlanlegger &&
            isFlere(hvemPlanlegger) &&
            skalVise &&
            isAfterStep(PlanleggerRoutes.HVOR_LANG_PERIODE, currentPath);
        return erValgtOgEtterSteg || !!getData(ContextDataType.FORDELING);
    }
    return false;
};

const showHvorLangPeriodeEllerOversiktStep = (
    path: PlanleggerRoutes,
    currentPath: PlanleggerRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === PlanleggerRoutes.HVOR_LANG_PERIODE || path === PlanleggerRoutes.OVERSIKT) {
        const arbeidssituasjon = getData(ContextDataType.ARBEIDSSITUASJON);
        const skalVise = arbeidssituasjon?.status === Arbeidsstatus.JOBBER || arbeidssituasjon?.jobberAnnenPart;
        const erValgtOgEtterSteg = skalVise && isAfterStep(PlanleggerRoutes.ARBEIDSSITUASJON, currentPath);
        return erValgtOgEtterSteg || !!getData(ContextDataType.HVOR_LANG_PERIODE);
    }
    return false;
};

const useStepData = (): Array<ProgressStep<PlanleggerRoutes>> => {
    const location = useLocation();
    const getStateData = useContextGetAnyData();

    const currentPath = useMemo(
        () => notEmpty(Object.values(PlanleggerRoutes).find((v) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );

    const appPathList = useMemo(
        () =>
            PATH_ORDER.flatMap((path) =>
                REQUIRED_APP_STEPS.includes(path) ||
                showFordelingStep(path, currentPath, getStateData) ||
                showHvorLangPeriodeEllerOversiktStep(path, currentPath, getStateData)
                    ? [path]
                    : [],
            ),
        [currentPath, getStateData],
    );

    return appPathList.map((p) => ({
        id: p,
        isSelected: p === currentPath,
    }));
};

export default useStepData;
