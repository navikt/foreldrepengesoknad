import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { notEmpty } from 'fpcommon/validering/valideringUtil';
import { EsDataType, EsDataMap, useEsStateAllDataFn } from './EsDataContext';
import { Path, REQUIRED_APP_STEPS, PATH_ORDER } from './paths';

// TODO Denne bør flyttast ut
const PATH_TO_LABEL_MAP = {
    [Path.SØKERSITUASJON]: 'søknad.søkersituasjon',
    [Path.OM_BARNET]: 'søknad.omBarnet',
    [Path.TERMINBEKREFTELSE]: 'søknad.termin',
    [Path.ADOPSJONSBEKREFTELSE]: 'søknad.adopsjon',
    [Path.UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold',
    [Path.SISTE_UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold.tidligere',
    [Path.NESTE_UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold.fremtidig',
    [Path.OPPSUMMERING]: 'søknad.oppsummering',
} as Record<string, string>;

const erEtter = (afterPath: Path, currentPath: Path): boolean => {
    return PATH_ORDER.indexOf(currentPath) > PATH_ORDER.indexOf(afterPath);
};

const skalViseUtenlandsoppholdside = (
    path: Path,
    currentPath: Path,
    getData: <TYPE extends EsDataType>(key: TYPE) => EsDataMap[TYPE],
) => {
    const utenlandsopphold = getData(EsDataType.UTENLANDSOPPHOLD);

    if (path === Path.SISTE_UTENLANDSOPPHOLD) {
        const harBoddUtenforNorgeOgHarVærtPåUtenlandsforholdSide =
            utenlandsopphold?.harBoddUtenforNorgeSiste12Mnd && erEtter(Path.UTENLANDSOPPHOLD, currentPath);
        if (harBoddUtenforNorgeOgHarVærtPåUtenlandsforholdSide || !!getData(EsDataType.UTENLANDSOPPHOLD_SISTE)) {
            return true;
        }
    }
    if (path === Path.NESTE_UTENLANDSOPPHOLD) {
        const skalBoUtenforNorgeOgHarVærtPåUtenlandsforholdSide =
            utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd && erEtter(Path.UTENLANDSOPPHOLD, currentPath);
        if (skalBoUtenforNorgeOgHarVærtPåUtenlandsforholdSide || !!getData(EsDataType.UTENLANDSOPPHOLD_NESTE)) {
            return true;
        }
    }

    return false;
};

const skalViseDokumentasjonside = (
    path: Path,
    currentPath: Path,
    getData: <TYPE extends EsDataType>(key: TYPE) => EsDataMap[TYPE],
) => {
    const omBarnet = getData(EsDataType.OM_BARNET);
    if (path === Path.TERMINBEKREFTELSE && omBarnet && 'erBarnetFødt' in omBarnet) {
        return (!omBarnet.erBarnetFødt && erEtter(Path.OM_BARNET, currentPath)) || !!getData(EsDataType.DOKUMENTASJON);
    }
    if (path === Path.ADOPSJONSBEKREFTELSE && omBarnet && 'adopsjonAvEktefellesBarn' in omBarnet) {
        return erEtter(Path.OM_BARNET, currentPath) || !!getData(EsDataType.DOKUMENTASJON);
    }
    return false;
};

const useStepData = () => {
    const intl = useIntl();
    const location = useLocation();
    const getData = useEsStateAllDataFn();

    const currentPath = useMemo(
        () => notEmpty(Object.values(Path).find((v) => v === decodeURIComponent(location.pathname))),
        [],
    );

    const appPathList = useMemo(
        () =>
            PATH_ORDER.flatMap((path) =>
                REQUIRED_APP_STEPS.includes(path) ||
                skalViseUtenlandsoppholdside(path, currentPath, getData) ||
                skalViseDokumentasjonside(path, currentPath, getData)
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
