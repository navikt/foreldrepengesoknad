import { PlanleggerRoutes } from 'appData/routes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { encodeToBase64 } from '@navikt/fp-utils';

import { ContextDataType, useContextComplete } from './PlanleggerDataContext';
import { useStepData } from './useStepData';

export const usePlanleggerNavigator = () => {
    const navigate = useNavigate();
    const stepConfig = useStepData();
    const context = useContextComplete();
    const plan = context[ContextDataType.UTTAKSPLAN] || [[]];

    const contextToEncode = {
        ...context,
        [ContextDataType.UTTAKSPLAN]: [plan[plan.length - 1]],
    };

    const [path, setPath] = useState<PlanleggerRoutes | undefined>();

    useEffect(() => {
        if (path) {
            navigate(`${path}?data=${encodeToBase64(JSON.stringify(contextToEncode))}`);
        }
    }, [path]);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id ?? PlanleggerRoutes.OM_PLANLEGGEREN;
        setPath(previousPath);
    };

    const goToNextStep = (nextPath: PlanleggerRoutes) => {
        setPath(nextPath);
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;
        setPath(nextPath);
    };

    const avbrytSøknad = () => {
        setPath(PlanleggerRoutes.OM_PLANLEGGEREN);
    };

    return {
        goToPreviousDefaultStep,
        goToNextStep,
        goToNextDefaultStep,
        avbrytSøknad,
    };
};
