import { useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './EsDataContext';
import { PATH_ORDER, Path, REQUIRED_APP_STEPS } from './paths';

const getPathToLabelMap = (intl: IntlShape) => ({
    [Path.SØKERSITUASJON]: intl.formatMessage({ id: 'useStepConfig.Søkersituasjon' }),
    [Path.OM_BARNET]: intl.formatMessage({ id: 'useStepConfig.OmBarnet' }),
    [Path.TERMINBEKREFTELSE]: intl.formatMessage({ id: 'useStepConfig.Termin' }),
    [Path.ADOPSJONSBEKREFTELSE]: intl.formatMessage({ id: 'useStepConfig.Adopsjon' }),
    [Path.UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'useStepConfig.Utenlandsopphold' }),
    [Path.TIDLIGERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'useStepConfig.TidligereUtenlandsopphold' }),
    [Path.SENERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'useStepConfig.FremtidigUtenlandsopphold' }),
    [Path.OPPSUMMERING]: intl.formatMessage({ id: 'useStepConfig.Oppsummering' }),
    [Path.VELKOMMEN]: '',
    [Path.KVITTERING]: '',
});

const isAfterStep = (previousStepPath: Path, currentStepPath: Path): boolean => {
    return PATH_ORDER.indexOf(currentStepPath) > PATH_ORDER.indexOf(previousStepPath);
};

const isVisible = (
    shouldGoToStep: boolean,
    dataTypeStep: ContextDataType,
    previousStepPath: Path,
    currentPath: Path,
    getStateData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    return (shouldGoToStep && isAfterStep(previousStepPath, currentPath)) || !!getStateData(dataTypeStep);
};

const showUtenlandsoppholdStep = (
    path: Path,
    currentPath: Path,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
): boolean => {
    if (path === Path.TIDLIGERE_UTENLANDSOPPHOLD) {
        const utenlandsopphold = getData(ContextDataType.UTENLANDSOPPHOLD);
        const boddErSatt = !!utenlandsopphold?.harBoddUtenforNorgeSiste12Mnd;
        return isVisible(
            boddErSatt,
            ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            Path.UTENLANDSOPPHOLD,
            currentPath,
            getData,
        );
    }
    if (path === Path.SENERE_UTENLANDSOPPHOLD) {
        const utenlandsopphold = getData(ContextDataType.UTENLANDSOPPHOLD);
        const skalBoErSatt = !!utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd;
        return isVisible(
            skalBoErSatt,
            ContextDataType.UTENLANDSOPPHOLD_SENERE,
            Path.UTENLANDSOPPHOLD,
            currentPath,
            getData,
        );
    }
    return false;
};

const showDokumentasjonStep = (
    path: Path,
    currentPath: Path,
    getStateData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
): boolean => {
    const barn = getStateData(ContextDataType.OM_BARNET);
    if (path === Path.TERMINBEKREFTELSE && barn?.type === 'termin') {
        return isVisible(true, ContextDataType.DOKUMENTASJON, Path.OM_BARNET, currentPath, getStateData);
    }
    if (path === Path.ADOPSJONSBEKREFTELSE && barn?.type === 'adopsjon') {
        return isVisible(true, ContextDataType.DOKUMENTASJON, Path.OM_BARNET, currentPath, getStateData);
    }
    return false;
};

export const useStepConfig = () => {
    const intl = useIntl();
    const pathToLabelMap = getPathToLabelMap(intl);

    const location = useLocation();
    const getStateData = useContextGetAnyData();

    const currentPath = useMemo(
        () => notEmpty(Object.values(Path).find((v: string) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );

    const appPathList = useMemo(
        () =>
            PATH_ORDER.flatMap((path) =>
                REQUIRED_APP_STEPS.includes(path) ||
                showUtenlandsoppholdStep(path, currentPath, getStateData) ||
                showDokumentasjonStep(path, currentPath, getStateData)
                    ? [path]
                    : [],
            ),
        [currentPath, getStateData],
    );

    return useMemo(
        () =>
            appPathList.map((p) => ({
                id: p,
                label: pathToLabelMap[p],
                isSelected: p === currentPath,
            })),
        [appPathList, currentPath, pathToLabelMap],
    );
};
