import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import { useEsStateResetFn } from './EsDataContext';
import {
    useVisitedPages,
    usePageRegister,
    usePageUnregister,
    useResetPages,
    useAdditionalPagesRegister,
    usePagesAddedByVisitedPages,
} from 'fpcommon/pageContext/PageContext';
import { notEmpty } from 'fpcommon/validering/valideringUtil';
import { useIntl } from 'react-intl';

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

const PATH_ORDER = [
    Path.VELKOMMEN,
    Path.SØKERSITUASJON,
    Path.OM_BARNET,
    Path.UTENLANDSOPPHOLD,
    Path.SISTE_UTENLANDSOPPHOLD,
    Path.NESTE_UTENLANDSOPPHOLD,
    Path.OPPSUMMERING,
    Path.KVITTERING,
];

const MINIMUM_APP_PATH = [Path.SØKERSITUASJON, Path.OM_BARNET, Path.UTENLANDSOPPHOLD, Path.OPPSUMMERING];

// TODO Denne skal flyttast vekk
const PATH_TO_LABEL_MAP = {
    [Path.SØKERSITUASJON]: 'søknad.søkersituasjon',
    [Path.OM_BARNET]: 'søknad.omBarnet',
    [Path.UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold',
    [Path.SISTE_UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold.tidligere',
    [Path.NESTE_UTENLANDSOPPHOLD]: 'søknad.utenlandsopphold.fremtidig',
    [Path.OPPSUMMERING]: 'søknad.oppsummering',
} as Record<string, string>;

const PATH_ARRAY = [] as Path[];

const useEsNavigator = () => {
    const intl = useIntl();

    const navigate = useNavigate();
    const location = useLocation();

    const resetEsData = useEsStateResetFn();

    const registerPage = usePageRegister();
    const registerAdditionalPages = useAdditionalPagesRegister();
    const unregisterPage = usePageUnregister();
    const visitedPages = useVisitedPages();
    const pagesAddedByVisitingPages = usePagesAddedByVisitedPages();
    const resetPages = useResetPages();

    const currentPath = notEmpty(Object.values(Path).find((v) => v === decodeURIComponent(location.pathname)));
    const nextPath = useMemo(() => PATH_ORDER[PATH_ORDER.findIndex((p) => p === currentPath) + 1], [currentPath]);

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'engangsstonadny',
            team: 'foreldrepenger',
            pageKey: currentPath,
        });
    }, []);

    const goToPreviousDefaultStep = useCallback(() => {
        unregisterPage(currentPath);
        navigate(visitedPages.length < 2 ? Path.VELKOMMEN : visitedPages[visitedPages.length - 2]);
    }, [navigate]);

    const goToPreviousStep = useCallback(
        (shouldRemovePaths: boolean) => {
            unregisterPage(currentPath, shouldRemovePaths);
            navigate(visitedPages.length < 2 ? Path.VELKOMMEN : visitedPages[visitedPages.length - 2]);
        },
        [navigate],
    );

    const goToNextStep = useCallback(
        (path: Path, additionalPaths: Path[] = PATH_ARRAY) => {
            registerPage(path);
            if (additionalPaths.length > 0) {
                registerAdditionalPages(additionalPaths[0], additionalPaths);
            }
            navigate(path);
        },
        [navigate],
    );

    const goToNextDefaultStep = useCallback(() => {
        registerPage(nextPath);
        navigate(nextPath);
    }, [navigate, nextPath]);

    const avbrytSøknad = useCallback(() => {
        resetEsData();
        resetPages();
        navigate(Path.VELKOMMEN);
    }, []);

    const currentPagePath = PATH_ORDER.flatMap((p) =>
        MINIMUM_APP_PATH.includes(p) || visitedPages.includes(p) || pagesAddedByVisitingPages.includes(p) ? [p] : [],
    );

    const pageInfo = useMemo(
        () => ({
            currentStepNr: visitedPages.length,
            totalStepCount: currentPagePath.length,
            // TODO Bør endra step-komponenten og så fjerna desse to. Men avventar til merge til master og avstemming mot andre appar.
            activeStepId: currentPath,
            stepConfig: currentPagePath.map((p, index) => ({
                id: p,
                label: intl.formatMessage({ id: PATH_TO_LABEL_MAP[p] }),
                index,
            })),
        }),
        [visitedPages, currentPagePath],
    );

    return useMemo(
        () => ({
            pageInfo,
            goToPreviousDefaultStep,
            goToPreviousStep,
            goToNextStep,
            goToNextDefaultStep,
            avbrytSøknad,
        }),
        [goToPreviousDefaultStep, goToNextDefaultStep, goToNextStep, pageInfo],
    );
};

export default useEsNavigator;
