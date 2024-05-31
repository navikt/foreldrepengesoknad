import { HvorMyeRoutes } from 'appData/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

import useStepData from './useStepData';

const useVeilederNavigator = () => {
    const navigate = useNavigate();
    const stepConfig = useStepData();

    const [path, setPath] = useState<HvorMyeRoutes | undefined>();

    const activeStepId = stepConfig.find((sc) => sc.isSelected);

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'planlegger',
            team: 'foreldrepenger',
            pageKey: activeStepId,
        });
    }, [activeStepId]);

    useEffect(() => {
        if (path) {
            navigate(path);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    const goToPreviousDefaultStep = useCallback(() => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id || HvorMyeRoutes.OM_HVOR_MYE;
        setPath(previousPath);
    }, [stepConfig]);

    const goToNextStep = useCallback((path: HvorMyeRoutes) => {
        setPath(path);
    }, []);

    const goToNextDefaultStep = useCallback(() => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;
        setPath(HvorMyeRoutes.HVOR_MYE + nextPath);
    }, [stepConfig]);

    const avbrytSøknad = useCallback(() => {
        setPath(HvorMyeRoutes.OM_HVOR_MYE);
    }, []);

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

export default useVeilederNavigator;
