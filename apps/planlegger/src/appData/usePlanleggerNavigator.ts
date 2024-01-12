import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { PlanleggerRoutes } from 'appData/routes';
import useStepData from './useStepData';

const usePlanleggerNavigator = () => {
    const navigate = useNavigate();
    const { activeStepId, stepConfig } = useStepData();

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'planlegger',
            team: 'foreldrepenger',
            pageKey: activeStepId,
        });
    }, []);

    const goToPreviousDefaultStep = useCallback(() => {
        const index = stepConfig.findIndex((s) => s.id === activeStepId) - 1;
        const previousPath = stepConfig[index]?.id || PlanleggerRoutes.OM_PLANLEGGEREN;
        navigate(previousPath);
    }, [navigate, stepConfig, activeStepId]);

    const goToNextStep = useCallback(
        (path: PlanleggerRoutes) => {
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
        navigate(PlanleggerRoutes.OM_PLANLEGGEREN);
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

export default usePlanleggerNavigator;
