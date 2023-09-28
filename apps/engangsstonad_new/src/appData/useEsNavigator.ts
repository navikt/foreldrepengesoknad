import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from 'fpcommon/amplitude/amplitude';
import { useEsStateResetFn } from './EsDataContext';
import { Path } from './paths';
import useStepData from './useStepData';

const useEsNavigator = () => {
    const navigate = useNavigate();
    const { activeStepId, stepConfig } = useStepData();
    const resetEsData = useEsStateResetFn();

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'engangsstonadny',
            team: 'foreldrepenger',
            pageKey: activeStepId,
        });
    }, []);

    const goToPreviousDefaultStep = useCallback(() => {
        const previousPath = stepConfig[stepConfig.findIndex((s) => s.id === activeStepId) - 1];
        navigate(previousPath.id);
    }, [navigate, stepConfig, activeStepId]);

    const goToNextStep = useCallback(
        (path: Path) => {
            navigate(path);
        },
        [navigate],
    );

    const goToNextDefaultStep = useCallback(() => {
        const nextPath = stepConfig[stepConfig.findIndex((s) => s.id === activeStepId) + 1];
        navigate(nextPath.id);
    }, [navigate, stepConfig, activeStepId]);

    const avbrytSøknad = useCallback(() => {
        resetEsData();
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
