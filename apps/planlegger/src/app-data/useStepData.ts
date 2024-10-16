import { PATH_ORDER, PlanleggerRoutes, REQUIRED_APP_STEPS } from 'appData/routes';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Situasjon } from 'types/HvemPlanlegger';
import { erFlereSøkere } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';

import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { ProgressStep } from '@navikt/fp-ui';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './PlanleggerDataContext';

const getLabelConfig = (intl: IntlShape): Record<PlanleggerRoutes, string> => ({
    [PlanleggerRoutes.ARBEIDSSITUASJON]: intl.formatMessage({ id: 'ArbeidssituasjonSteg.Tittel' }),
    [PlanleggerRoutes.HVOR_MYE]: intl.formatMessage({ id: 'HvorMyeSteg.Tittel' }),
    [PlanleggerRoutes.FORDELING]: intl.formatMessage({ id: 'FordelingSteg.Tittel' }),
    [PlanleggerRoutes.HVEM_PLANLEGGER]: intl.formatMessage({ id: 'HvemPlanleggerSteg.HvemPlanlegger' }),
    [PlanleggerRoutes.HVOR_LANG_PERIODE]: intl.formatMessage({ id: 'HvorLangPeriodeSteg.Tittel' }),
    [PlanleggerRoutes.OM_BARNET]: intl.formatMessage({ id: 'OmBarnetSteg.Tittel' }),
    [PlanleggerRoutes.BARNEHAGEPLASS]: intl.formatMessage({ id: 'BarnehageplassSteg.Tittel' }),
    [PlanleggerRoutes.OM_PLANLEGGEREN]: intl.formatMessage({ id: 'OmPlanleggerenSteg.Ingress' }),
    [PlanleggerRoutes.PLANEN_DERES]: intl.formatMessage({ id: 'PlanenDeresSteg.Tittel' }),
    [PlanleggerRoutes.OPPSUMMERING]: intl.formatMessage({ id: 'OppsummeringHeader.Tittel' }),
});

const erBarnIkkeOppgittEllerYngreEnnTreÅr = (omBarnet?: OmBarnet) =>
    !omBarnet || !(erBarnetFødt(omBarnet) && dayjs(omBarnet.fødselsdato).isBefore(DATE_3_YEARS_AGO));

const erBarnetIkkeAdoptert = (omBarnet?: OmBarnet) => !omBarnet || !erBarnetAdoptert(omBarnet);

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

const showBarnehageplassStep = (
    path: PlanleggerRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === PlanleggerRoutes.BARNEHAGEPLASS) {
        const omBarnet = getData(ContextDataType.OM_BARNET);
        return erBarnetIkkeAdoptert(omBarnet);
    }
    return false;
};

const showHvorMyeStep = (
    path: PlanleggerRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === PlanleggerRoutes.HVOR_MYE) {
        const arbeidssituasjon = getData(ContextDataType.ARBEIDSSITUASJON);
        const omBarnet = getData(ContextDataType.OM_BARNET);
        return (
            erBarnIkkeOppgittEllerYngreEnnTreÅr(omBarnet) && (!arbeidssituasjon || harMinstEnPartJobb(arbeidssituasjon))
        );
    }
    return false;
};

const useStepData = (): Array<ProgressStep<PlanleggerRoutes>> => {
    const location = useLocation();
    const intl = useIntl();
    const getStateData = useContextGetAnyData();
    const labelMap = getLabelConfig(intl);

    const currentPath = useMemo(() => {
        const route = Object.values(PlanleggerRoutes).find((v) => v === decodeURIComponent(location.pathname));
        return route || PlanleggerRoutes.OM_PLANLEGGEREN;
    }, [location.pathname]);

    const appPathList = useMemo(
        () =>
            PATH_ORDER.flatMap((path) =>
                REQUIRED_APP_STEPS.includes(path) ||
                showArbeidssituasjonStep(path, getStateData) ||
                showBarnehageplassStep(path, getStateData) ||
                showHvorMyeStep(path, getStateData) ||
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
        label: labelMap[p],
    }));
};

export default useStepData;
