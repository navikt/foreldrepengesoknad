import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { Path } from './paths';
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
        const previousPath = stepConfig[index]?.id || Path.OM_PLANLEGGER;
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
        navigate(Path.OM_PLANLEGGER);
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
