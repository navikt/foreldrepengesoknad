import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { notEmpty } from '@navikt/fp-validation';
import { EsDataType, EsDataMap, useEsStateAllDataFn } from './EsDataContext';
import { Path, REQUIRED_APP_STEPS, PATH_ORDER } from './paths';

// TODO Denne bør flyttast ut
const PATH_TO_LABEL_MAP = {
    [Path.SØKERSITUASJON]: 'SøkersituasjonSteg.Søkersituasjon',
    [Path.OM_BARNET]: 'OmBarnetSteg.OmBarnet',
    [Path.TERMINBEKREFTELSE]: 'søknad.termin',
    [Path.ADOPSJONSBEKREFTELSE]: 'søknad.adopsjon',
    [Path.UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold',
    [Path.UTENLANDSOPPHOLD_PERIODER]: 'søknad.utenlandsopphold.periode',
    [Path.OPPSUMMERING]: 'søknad.oppsummering',
} as Record<string, string>;

const isAfterStep = (previousStepPath: Path, currentStepPath: Path): boolean => {
    return PATH_ORDER.indexOf(currentStepPath) > PATH_ORDER.indexOf(previousStepPath);
};

const isVisible = (
    shouldGoToStep: boolean,
    dataTypeStep: EsDataType,
    previousStepPath: Path,
    currentPath: Path,
    getStateData: <TYPE extends EsDataType>(key: TYPE) => EsDataMap[TYPE],
) => {
    return (shouldGoToStep && isAfterStep(previousStepPath, currentPath)) || !!getStateData(dataTypeStep);
};

const showUtenlandsoppholdStep = (
    path: Path,
    currentPath: Path,
    getData: <TYPE extends EsDataType>(key: TYPE) => EsDataMap[TYPE],
): boolean => {
    if (path === Path.UTENLANDSOPPHOLD_PERIODER) {
        const utenlandsopphold = getData(EsDataType.UTENLANDSOPPHOLD);
        const boddErSatt = !utenlandsopphold?.harKunBoddINorge;
        return isVisible(boddErSatt, EsDataType.UTENLANDSOPPHOLD_PERIODER, Path.UTENLANDSOPPHOLD, currentPath, getData);
    }
    return false;
};

const showDokumentasjonStep = (
    path: Path,
    currentPath: Path,
    getStateData: <TYPE extends EsDataType>(key: TYPE) => EsDataMap[TYPE],
): boolean => {
    const omBarnet = getStateData(EsDataType.OM_BARNET);
    if (path === Path.TERMINBEKREFTELSE && omBarnet && 'erBarnetFødt' in omBarnet) {
        return isVisible(!omBarnet.erBarnetFødt, EsDataType.DOKUMENTASJON, Path.OM_BARNET, currentPath, getStateData);
    }
    if (path === Path.ADOPSJONSBEKREFTELSE && omBarnet && 'adopsjonAvEktefellesBarn' in omBarnet) {
        return isVisible(true, EsDataType.DOKUMENTASJON, Path.OM_BARNET, currentPath, getStateData);
    }
    return false;
};

const useStepData = () => {
    const intl = useIntl();
    const location = useLocation();
    const getStateData = useEsStateAllDataFn();

    const currentPath = useMemo(
        () => notEmpty(Object.values(Path).find((v) => v === decodeURIComponent(location.pathname))),
        [],
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
        [],
    );

    return useMemo(
        () => ({
            activeStepId: currentPath,
            stepConfig: appPathList.map((p, index) => ({
                id: p,
                label: intl.formatMessage({ id: PATH_TO_LABEL_MAP[p] }),
                index,
            })),
        }),
        [],
    );
};

export default useStepData;
