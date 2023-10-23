import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { notEmpty } from '@navikt/fp-validation';
import { EsDataType, EsDataMap, useEsStateAllDataFn } from './EsDataContext';
import { Path, REQUIRED_APP_STEPS, PATH_ORDER } from './paths';
import { I18nFn, useCustomIntl } from '@navikt/fp-ui';

// TODO Denne bør flyttast ut
const getPathToLabelMap = (i18n: I18nFn) =>
    ({
        [Path.SØKERSITUASJON]: i18n('SøkersituasjonSteg.Søkersituasjon'),
        [Path.OM_BARNET]: i18n('OmBarnetSteg.OmBarnet'),
        [Path.TERMINBEKREFTELSE]: i18n('UseStepData.Termin'),
        [Path.ADOPSJONSBEKREFTELSE]: i18n('UseStepData.Adopsjon'),
        [Path.UTENLANDSOPPHOLD]: i18n('UtenlandsoppholdSteg.Utenlandsopphold'),
        [Path.TIDLIGERE_UTENLANDSOPPHOLD]: i18n('TidligereUtenlandsoppholdSteg.Tidligere'),
        [Path.SENERE_UTENLANDSOPPHOLD]: i18n('SenereUtenlandsoppholdSteg.Fremtidig'),
        [Path.OPPSUMMERING]: i18n('OppsummeringSteg.Oppsummering'),
    }) as Record<string, string>;

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
    if (path === Path.TIDLIGERE_UTENLANDSOPPHOLD) {
        const utenlandsopphold = getData(EsDataType.UTENLANDSOPPHOLD);
        const boddErSatt = !!utenlandsopphold?.harBoddUtenforNorgeSiste12Mnd;
        return isVisible(
            boddErSatt,
            EsDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            Path.UTENLANDSOPPHOLD,
            currentPath,
            getData,
        );
    }
    if (path === Path.SENERE_UTENLANDSOPPHOLD) {
        const utenlandsopphold = getData(EsDataType.UTENLANDSOPPHOLD);
        const skalBoErSatt = !!utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd;
        return isVisible(skalBoErSatt, EsDataType.UTENLANDSOPPHOLD_SENERE, Path.UTENLANDSOPPHOLD, currentPath, getData);
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
    const { i18n } = useCustomIntl();
    const pathToLabelMap = getPathToLabelMap(i18n);

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
                label: pathToLabelMap[p],
                index,
            })),
        }),
        [],
    );
};

export default useStepData;
