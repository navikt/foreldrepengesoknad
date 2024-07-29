import { PATH_ORDER, PlanleggerRoutes, REQUIRED_APP_STEPS } from 'appData/routes';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Situasjon } from 'types/HvemPlanlegger';
import { erFlereSøkere } from 'utils/HvemPlanleggerUtils';
import { erBarnetFødt } from 'utils/barnetUtils';

import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { ProgressStep } from '@navikt/fp-ui';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './PlanleggerDataContext';

const erBarnIkkeOppgittEllerYngreEnnTreÅr = (omBarnet?: OmBarnet) =>
    !omBarnet || !(erBarnetFødt(omBarnet) && dayjs(omBarnet.fødselsdato).isBefore(DATE_3_YEARS_AGO));

const harMinstEnPartJobb = (arbeidssituasjon: Arbeidssituasjon) =>
    arbeidssituasjon?.status === Arbeidsstatus.JOBBER || arbeidssituasjon?.jobberAnnenPart;

const showFordelingStep = (
    path: PlanleggerRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === PlanleggerRoutes.FORDELING) {
        const hvemPlanlegger = getData(ContextDataType.HVEM_PLANLEGGER);
        const arbeidssituasjon = getData(ContextDataType.ARBEIDSSITUASJON);
        const barnet = getData(ContextDataType.OM_BARNET);

        const erFarOgFar = hvemPlanlegger?.type === Situasjon.FAR_OG_FAR;
        const beggeHarRett = arbeidssituasjon?.status === Arbeidsstatus.JOBBER && !!arbeidssituasjon?.jobberAnnenPart;
        const skalVise =
            hvemPlanlegger && erFlereSøkere(hvemPlanlegger) && beggeHarRett && !(erFarOgFar && barnet?.erFødsel);

        return erBarnIkkeOppgittEllerYngreEnnTreÅr(barnet) && (!arbeidssituasjon || skalVise);
    }
    return false;
};

const showHvorLangPeriodeEllerOversiktStep = (
    path: PlanleggerRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === PlanleggerRoutes.HVOR_LANG_PERIODE || path === PlanleggerRoutes.PLANEN_DERES) {
        const arbeidssituasjon = getData(ContextDataType.ARBEIDSSITUASJON);
        const omBarnet = getData(ContextDataType.OM_BARNET);
        return (
            erBarnIkkeOppgittEllerYngreEnnTreÅr(omBarnet) && (!arbeidssituasjon || harMinstEnPartJobb(arbeidssituasjon))
        );
    }
    return false;
};

const showArbeidssituasjonStep = (
    path: PlanleggerRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === PlanleggerRoutes.ARBEIDSSITUASJON) {
        const omBarnet = getData(ContextDataType.OM_BARNET);
        return erBarnIkkeOppgittEllerYngreEnnTreÅr(omBarnet);
    }
    return false;
};

const useStepData = (): Array<ProgressStep<PlanleggerRoutes>> => {
    const location = useLocation();
    const getStateData = useContextGetAnyData();

    const currentPath = useMemo(() => {
        const route = Object.values(PlanleggerRoutes).find((v) => v === decodeURIComponent(location.pathname));
        return route || PlanleggerRoutes.OM_PLANLEGGEREN;
    }, [location.pathname]);

    const appPathList = useMemo(
        () =>
            PATH_ORDER.flatMap((path) =>
                REQUIRED_APP_STEPS.includes(path) ||
                showArbeidssituasjonStep(path, getStateData) ||
                showFordelingStep(path, getStateData) ||
                showHvorLangPeriodeEllerOversiktStep(path, getStateData)
                    ? [path]
                    : [],
            ),
        [getStateData],
    );

    return appPathList.map((p) => ({
        id: p,
        isSelected: p === currentPath,
    }));
};

export default useStepData;
