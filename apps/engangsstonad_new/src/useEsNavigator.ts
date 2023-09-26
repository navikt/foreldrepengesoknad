import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import { useStateResetFn } from './EsDataContext';

export enum Path {
    VELKOMMEN = '/',
    SØKERSITUASJON = '/soknad/søkersituasjon',
    OM_BARNET = '/soknad/om-barnet',
    UTENLANDSOPPHOLD = '/soknad/utenlandsopphold',
    SISTE_UTENLANDSOPPHOLD = '/soknad/siste-utenlandsopphold',
    NESTE_UTENLANDSOPPHOLD = '/soknad/neste-utenlandsopphold',
    OPPSUMMERING = '/soknad/oppsummering',
    KVITTERING = '/kvittering',
}

const PathOrder = [
    Path.VELKOMMEN,
    Path.SØKERSITUASJON,
    Path.OM_BARNET,
    Path.UTENLANDSOPPHOLD,
    Path.SISTE_UTENLANDSOPPHOLD,
    Path.NESTE_UTENLANDSOPPHOLD,
    Path.OPPSUMMERING,
    Path.KVITTERING,
];

//TODO Kan denne fjernast og heller logge url i amplitude?
const PageKeys = {
    [Path.VELKOMMEN]: 'velkommen',
    [Path.SØKERSITUASJON]: 'situasjon',
    [Path.OM_BARNET]: 'om-barnet',
    [Path.UTENLANDSOPPHOLD]: 'utenlandsopphold',
    [Path.SISTE_UTENLANDSOPPHOLD]: 'siste-utenlandsopphold',
    [Path.NESTE_UTENLANDSOPPHOLD]: 'neste-utenlandsopphold',
    [Path.OPPSUMMERING]: 'oppsummering',
    [Path.KVITTERING]: 'søknad-sendt',
};

const useEsNavigator = () => {
    const resetState = useStateResetFn();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = Object.values(Path).find((v) => v === decodeURIComponent(location.pathname));

    const previousStepHref = useMemo(() => PathOrder[PathOrder.findIndex((p) => p === currentPath) - 1], [currentPath]);
    const nextStepHref = useMemo(() => PathOrder[PathOrder.findIndex((p) => p === currentPath) + 1], [currentPath]);

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'engangsstonadny',
            team: 'foreldrepenger',
            pageKey: currentPath ? PageKeys[currentPath] : 'NO_PATH_KEY',
        });
    }, []);

    const goToPreviousStep = useCallback(
        (path: Path) => {
            navigate(path);
        },
        [navigate],
    );
    const goToPreviousDefaultStep = useCallback(() => {
        navigate(previousStepHref);
    }, [navigate, previousStepHref]);

    const goToNextStep = useCallback(
        (path: Path) => {
            navigate(path);
        },
        [navigate],
    );
    const goToNextDefaultStep = useCallback(() => {
        navigate(nextStepHref);
    }, [navigate, nextStepHref]);

    const avbrytSøknad = useCallback(() => {
        resetState();
        navigate(Path.VELKOMMEN);
    }, []);

    return useMemo(
        () => ({
            goToPreviousStep,
            goToPreviousDefaultStep,
            goToNextStep,
            goToNextDefaultStep,
            avbrytSøknad,
        }),
        [goToPreviousStep, goToPreviousDefaultStep, goToNextDefaultStep, goToNextStep],
    );
};

export default useEsNavigator;
