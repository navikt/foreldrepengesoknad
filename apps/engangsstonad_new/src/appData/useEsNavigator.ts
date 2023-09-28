import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import { useEsStateResetFn } from './EsDataContext';
import { useVisitedPages, usePageRegister, usePageUnregister, useResetPages } from 'fpcommon/pageContext/PageContext';
import { notEmpty } from 'fpcommon/validering/valideringUtil';
import { Path, PATH_ORDER } from './paths';

const useEsNavigator = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const resetEsData = useEsStateResetFn();

    const registerPage = usePageRegister();
    const unregisterPage = usePageUnregister();
    const visitedPages = useVisitedPages();
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

    const goToNextStep = useCallback(
        (path: Path) => {
            registerPage(path);
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

    return useMemo(
        () => ({
            goToPreviousDefaultStep,
            goToNextStep,
            goToNextDefaultStep,
            avbrytSøknad,
        }),
        [goToPreviousDefaultStep, goToNextDefaultStep, goToNextStep],
    );
};

export default useEsNavigator;
