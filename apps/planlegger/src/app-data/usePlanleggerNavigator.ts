import { PlanleggerRoutes } from 'appData/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { encodeToBase64 } from '@navikt/fp-utils';

import { useContextComplete } from './PlanleggerDataContext';
import { useStepData } from './useStepData';

export const usePlanleggerNavigator = (locale: string) => {
    const navigate = useNavigate();
    const stepConfig = useStepData();
    const context = useContextComplete();

    const [path, setPath] = useState<PlanleggerRoutes | undefined>();

    useEffect(() => {
        if (path) {
            navigate(`${path}?language=${locale}&data=${encodeToBase64(JSON.stringify(context))}`);
        }
    }, [path]);

    const goToPreviousDefaultStep = useCallback(() => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id ?? PlanleggerRoutes.OM_PLANLEGGEREN;
        setPath(previousPath);
    }, [stepConfig]);

    const goToNextStep = useCallback((nextPath: PlanleggerRoutes) => {
        setPath(nextPath);
    }, []);

    const goToNextDefaultStep = useCallback(() => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;
        setPath(nextPath);
    }, [stepConfig]);

    const avbrytSøknad = useCallback(() => {
        setPath(PlanleggerRoutes.OM_PLANLEGGEREN);
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
