import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { IntlShape, useIntl } from 'react-intl';
import { notEmpty } from '@navikt/fp-validation';
import SøknadRoutes, { REQUIRED_APP_STEPS, REQUIRED_APP_STEPS_ENDRINGSSØKNAD, ROUTES_ORDER } from '../routes/routes';
import { ContextDataMap, ContextDataType, useContextGetAnyData } from 'app/context/FpDataContext';

// TODO Bør denne flyttast ut?
const getPathToLabelMap = (intl: IntlShape) =>
    ({
        [SøknadRoutes.SØKERSITUASJON]: intl.formatMessage({ id: 'steps.label.søkersituasjon' }),
        [SøknadRoutes.OM_BARNET]: intl.formatMessage({ id: 'steps.label.omBarnet' }),
        [SøknadRoutes.ANNEN_FORELDER]: intl.formatMessage({ id: 'steps.label.annenForelder' }),
        [SøknadRoutes.PERIODE_MED_FORELDREPENGER]: intl.formatMessage({ id: 'steps.label.periodeMedForeldrepenger' }),
        [SøknadRoutes.UTTAKSPLAN_INFO]: intl.formatMessage({ id: 'steps.label.uttaksplanInfo' }),
        [SøknadRoutes.UTTAKSPLAN]: intl.formatMessage({ id: 'steps.label.uttaksplan' }),
        [SøknadRoutes.UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'steps.label.utenlandsopphold' }),
        [SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'steps.label.utenlandsopphold.tidligere' }),
        [SøknadRoutes.SENERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'steps.label.utenlandsopphold.senere' }),
        [SøknadRoutes.INNTEKTSINFORMASJON]: intl.formatMessage({ id: 'steps.label.inntektsinformasjon' }),
        [SøknadRoutes.OPPSUMMERING]: intl.formatMessage({ id: 'steps.label.oppsummering' }),
    }) as Record<string, string>;

const showUtenlandsoppholdStep = (
    path: SøknadRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD) {
        const utenlandsopphold = getData(ContextDataType.UTENLANDSOPPHOLD);
        return !utenlandsopphold?.iNorgeSiste12Mnd;
    }
    if (path === SøknadRoutes.SENERE_UTENLANDSOPPHOLD) {
        const utenlandsopphold = getData(ContextDataType.UTENLANDSOPPHOLD);
        return !utenlandsopphold?.iNorgeNeste12Mnd;
    }
    return false;
};

const useStepConfig = (erEndringssøknad = false) => {
    const intl = useIntl();
    const pathToLabelMap = getPathToLabelMap(intl);

    const location = useLocation();
    const getStateData = useContextGetAnyData();

    const currentPath = useMemo(
        () => notEmpty(Object.values(SøknadRoutes).find((v) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );

    const requiredSteps = erEndringssøknad ? REQUIRED_APP_STEPS_ENDRINGSSØKNAD : REQUIRED_APP_STEPS;
    const appPathList = useMemo(
        () =>
            ROUTES_ORDER.flatMap((path) =>
                requiredSteps.includes(path) || showUtenlandsoppholdStep(path, getStateData) ? [path] : [],
            ),
        [requiredSteps, getStateData],
    );

    return useMemo(
        () =>
            appPathList.map((p, index) => ({
                index,
                id: p,
                label: pathToLabelMap[p],
                isSelected: p === currentPath,
            })),
        [appPathList, currentPath, pathToLabelMap],
    );
};

export default useStepConfig;
