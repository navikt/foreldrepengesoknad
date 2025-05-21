import { PlanleggerRoutes } from 'appData/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { encodeToBase64, getDecoratorLanguageCookie } from '@navikt/fp-utils';

import { ContextDataType, useContextComplete } from './PlanleggerDataContext';
import { useStepData } from './useStepData';

export const usePlanleggerNavigator = () => {
    const navigate = useNavigate();
    const stepConfig = useStepData();
    const context = useContextComplete();
    const plan = context[ContextDataType.UTTAKSPLAN] || [[]];
    const language = getDecoratorLanguageCookie('decorator-language');

    const contextToEncode = {
        ...context,
        [ContextDataType.UTTAKSPLAN]: [plan[plan.length - 1]],
    };

    const [path, setPath] = useState<PlanleggerRoutes | undefined>();

    useEffect(() => {
        if (path) {
            navigate(`${path}?language=${language}&data=${encodeToBase64(JSON.stringify(contextToEncode))}`);
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
