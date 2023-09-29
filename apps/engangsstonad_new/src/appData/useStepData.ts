import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { notEmpty } from 'fpcommon/validering/valideringUtil';
import { EsDataType, EsDataMap, useEsStateAllDataFn } from './EsDataContext';
import { Path } from './paths';
import { REQUIRED_APP_STEPS, PATH_ORDER } from './paths';
import { useMemo } from 'react';

// TODO Denne bør flyttast ut
const PATH_TO_LABEL_MAP = {
    [Path.SØKERSITUASJON]: 'søknad.søkersituasjon',
    [Path.OM_BARNET]: 'søknad.omBarnet',
    [Path.UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold',
    [Path.SISTE_UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold.tidligere',
    [Path.NESTE_UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold.fremtidig',
    [Path.OPPSUMMERING]: 'søknad.oppsummering',
} as Record<string, string>;

const erEtterUtenlandsopphold = (currentPath: Path): boolean => {
    return PATH_ORDER.indexOf(currentPath) > PATH_ORDER.indexOf(Path.UTENLANDSOPPHOLD);
};

const skalViseUtenlandsoppholdside = (
    path: Path,
    currentPath: Path,
    getData: <TYPE extends EsDataType>(key: TYPE) => EsDataMap[TYPE],
) => {
    const utenlandsopphold = getData(EsDataType.UTENLANDSOPPHOLD);

    if (path === Path.SISTE_UTENLANDSOPPHOLD) {
        const harBoddUtenforNorgeOgHarVærtPåUtenlandsforholdSide =
            utenlandsopphold?.harBoddUtenforNorgeSiste12Mnd && erEtterUtenlandsopphold(currentPath);
        if (harBoddUtenforNorgeOgHarVærtPåUtenlandsforholdSide || !!getData(EsDataType.UTENLANDSOPPHOLD_SISTE)) {
            return true;
        }
    }
    if (path === Path.NESTE_UTENLANDSOPPHOLD) {
        const skalBoUtenforNorgeOgHarVærtPåUtenlandsforholdSide =
            utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd && erEtterUtenlandsopphold(currentPath);
        if (skalBoUtenforNorgeOgHarVærtPåUtenlandsforholdSide || !!getData(EsDataType.UTENLANDSOPPHOLD_NESTE)) {
            return true;
        }
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
                REQUIRED_APP_STEPS.includes(path) || skalViseUtenlandsoppholdside(path, currentPath, getData)
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
