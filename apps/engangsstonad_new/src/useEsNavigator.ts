import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import { useStateResetFn } from './EsDataContext';
import {
    useVisitedPages,
    usePageRegister,
    usePageUnregister,
    useResetPages,
    useAdditionalPageRegister,
    usePagesAddedByVisitedPages,
} from 'fpcommon/pageContext/PageContext';

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

const MINIMUM_PATH = [Path.SØKERSITUASJON, Path.OM_BARNET, Path.UTENLANDSOPPHOLD, Path.OPPSUMMERING];

// TODO Erstatt med tekst_id
const LABEL_MAPPER = {
    [Path.SØKERSITUASJON]: 'Din situasjon',
    [Path.OM_BARNET]: 'Barnet',
    [Path.UTENLANDSOPPHOLD]: 'Utenlandsopphold',
    [Path.SISTE_UTENLANDSOPPHOLD]: 'Har bodd i utlandet',
    [Path.NESTE_UTENLANDSOPPHOLD]: 'Skal bo i utlandet',
    [Path.OPPSUMMERING]: 'Oppsummering',
} as Record<string, string>;

const ARRAY = [] as Path[];

const useEsNavigator = () => {
    const resetDataState = useStateResetFn();

    const registerPage = usePageRegister();
    const registerAdditionalPages = useAdditionalPageRegister();
    const unregisterPage = usePageUnregister();
    const visitedPages = useVisitedPages();
    const pagesAddedByVisitingPages = usePagesAddedByVisitedPages();
    const resetVisitedPages = useResetPages();

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

    const goToPreviousDefaultStep = useCallback(() => {
        if (currentPath) {
            unregisterPage(currentPath);
        }
        navigate(visitedPages.length < 2 ? Path.VELKOMMEN : visitedPages[visitedPages.length - 2]);
    }, [navigate, previousStepHref]);

    const goToNextStep = useCallback(
        (path: Path, additionalPaths: Path[] = ARRAY) => {
            registerPage(path);
            if (additionalPaths.length > 0) {
                registerAdditionalPages(additionalPaths[0], additionalPaths);
            }
            navigate(path);
        },
        [navigate],
    );
    const goToNextDefaultStep = useCallback(() => {
        registerPage(nextStepHref);
        navigate(nextStepHref);
    }, [navigate, nextStepHref]);

    const avbrytSøknad = useCallback(() => {
        resetDataState();
        resetVisitedPages();
        navigate(Path.VELKOMMEN);
    }, []);

    const currentPagePath = PathOrder.flatMap((p) =>
        MINIMUM_PATH.includes(p) || visitedPages.includes(p) || pagesAddedByVisitingPages.includes(p) ? [p] : [],
    );

    const pageInfo = useMemo(
        () => ({
            currentStepNr: visitedPages.length,
            totalStepCount:
                MINIMUM_PATH.length + visitedPages.filter((p) => !MINIMUM_PATH.some((path) => path === p)).length,
            // TODO Bør endra step-komponenten og så fjerna desse to. Men avventar til merge til master og avstemming mot andre appar.
            activeStepId: currentPath || '',
            stepConfig: currentPagePath.map((p, index) => ({
                id: p,
                label: LABEL_MAPPER[p],
                index,
            })),
        }),
        [visitedPages],
    );

    return useMemo(
        () => ({
            pageInfo,
            goToPreviousDefaultStep,
            goToNextStep,
            goToNextDefaultStep,
            avbrytSøknad,
        }),
        [goToPreviousDefaultStep, goToNextDefaultStep, goToNextStep, pageInfo],
    );
};

export default useEsNavigator;
