import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { notEmpty } from 'fpcommon/validering/valideringUtil';
import { EsDataType, useEsStateData } from './EsDataContext';
import { Path } from './paths';
import { MINIMUM_APP_PATH, PATH_ORDER } from './paths';

// TODO Denne bør flyttast ut
const PATH_TO_LABEL_MAP = {
    [Path.SØKERSITUASJON]: 'søknad.søkersituasjon',
    [Path.OM_BARNET]: 'søknad.omBarnet',
    [Path.UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold',
    [Path.SISTE_UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold.tidligere',
    [Path.NESTE_UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold.fremtidig',
    [Path.OPPSUMMERING]: 'søknad.oppsummering',
} as Record<string, string>;

const erEtterUtenlandsopphold = (path) => {
    return PATH_ORDER.indexOf(path) > PATH_ORDER.indexOf(Path.UTENLANDSOPPHOLD);
};

const useStepData = () => {
    const intl = useIntl();
    const location = useLocation();

    const utenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD);
    const nesteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_NESTE);
    const sisteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_SISTE);

    const currentPath = notEmpty(Object.values(Path).find((v) => v === decodeURIComponent(location.pathname)));

    const utledUttak = (pathh) => {
        if (
            pathh === Path.SISTE_UTENLANDSOPPHOLD &&
            ((utenlandsopphold?.harBoddUtenforNorgeSiste12Mnd && erEtterUtenlandsopphold(currentPath)) ||
                !!sisteUtenlandsopphold)
        ) {
            return true;
        }
        if (
            pathh === Path.NESTE_UTENLANDSOPPHOLD &&
            ((utenlandsopphold?.skalBoUtenforNorgeNeste12Mnd && erEtterUtenlandsopphold(currentPath)) ||
                !!nesteUtenlandsopphold)
        ) {
            return true;
        }
        return false;
    };

    const currentPagePath = PATH_ORDER.flatMap((p) => (MINIMUM_APP_PATH.includes(p) || utledUttak(p) ? [p] : []));

    return {
        activeStepId: currentPath,
        stepConfig: currentPagePath.map((p, index) => ({
            id: p,
            label: intl.formatMessage({ id: PATH_TO_LABEL_MAP[p] }),
            index,
        })),
    };
};

export default useStepData;
