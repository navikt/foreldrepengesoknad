import { useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextGetAnyData } from './EsDataContext';
import { PATH_ORDER, Path, REQUIRED_APP_STEPS } from './paths';

// TODO Denne bør flyttast ut
const getPathToLabelMap = (intl: IntlShape) =>
    ({
        [Path.SØKERSITUASJON]: intl.formatMessage({ id: 'UseStepConfig.Søkersituasjon' }),
        [Path.OM_BARNET]: intl.formatMessage({ id: 'UseStepConfig.OmBarnet' }),
        [Path.TERMINBEKREFTELSE]: intl.formatMessage({ id: 'UseStepConfig.Termin' }),
        [Path.ADOPSJONSBEKREFTELSE]: intl.formatMessage({ id: 'UseStepConfig.Adopsjon' }),
        [Path.UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'UseStepConfig.Utenlandsopphold' }),
        [Path.TIDLIGERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'UseStepConfig.TidligereUtenlandsopphold' }),
        [Path.SENERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'UseStepConfig.FremtidigUtenlandsopphold' }),
        [Path.OPPSUMMERING]: intl.formatMessage({ id: 'UseStepConfig.Oppsummering' }),
    }) as Record<string, string>;

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
    const omBarnet = getStateData(ContextDataType.OM_BARNET);
    if (path === Path.TERMINBEKREFTELSE && omBarnet && 'erBarnetFødt' in omBarnet) {
        return isVisible(
            !omBarnet.erBarnetFødt,
            ContextDataType.DOKUMENTASJON,
            Path.OM_BARNET,
            currentPath,
            getStateData,
        );
    }
    if (path === Path.ADOPSJONSBEKREFTELSE && omBarnet && 'adopsjonAvEktefellesBarn' in omBarnet) {
        return isVisible(true, ContextDataType.DOKUMENTASJON, Path.OM_BARNET, currentPath, getStateData);
    }
    return false;
};

const useStepConfig = () => {
    const intl = useIntl();
    const pathToLabelMap = getPathToLabelMap(intl);

    const location = useLocation();
    const getStateData = useContextGetAnyData();

    const currentPath = useMemo(
        () => notEmpty(Object.values(Path).find((v) => v === decodeURIComponent(location.pathname))),
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
