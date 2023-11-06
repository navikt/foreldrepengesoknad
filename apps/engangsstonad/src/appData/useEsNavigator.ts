import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
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
    }, [activeStepId]);

    const goToPreviousDefaultStep = useCallback(() => {
        const index = stepConfig.findIndex((s) => s.id === activeStepId) - 1;
        const previousPath = stepConfig[index]?.id || Path.VELKOMMEN;
        navigate(previousPath);
    }, [navigate, stepConfig, activeStepId]);

    const goToNextStep = useCallback(
        (path: Path) => {
            navigate(path);
        },
        [navigate],
    );

    const goToNextDefaultStep = useCallback(() => {
        const index = stepConfig.findIndex((s) => s.id === activeStepId) + 1;
        const nextPath = stepConfig[index]?.id;
        navigate(nextPath);
    }, [navigate, stepConfig, activeStepId]);

    const avbrytSøknad = useCallback(() => {
        resetEsData();
        navigate(Path.VELKOMMEN);
    }, [navigate, resetEsData]);

    return useMemo(
        () => ({
            goToPreviousDefaultStep,
            goToNextStep,
            goToNextDefaultStep,
            avbrytSøknad,
        }),
        [goToPreviousDefaultStep, goToNextDefaultStep, goToNextStep, avbrytSøknad],
    );
};

export default useEsNavigator;
