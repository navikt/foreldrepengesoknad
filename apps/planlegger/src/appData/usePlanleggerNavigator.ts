import { PlanleggerRoutes } from 'appData/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { encodeToBase64 } from 'utils/urlEncodingUtils';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

import { useContextComplete } from './PlanleggerDataContext';
import useStepData from './useStepData';

const usePlanleggerNavigator = (locale: string) => {
    const navigate = useNavigate();
    const stepConfig = useStepData();
    const context = useContextComplete();

    const [path, setPath] = useState<PlanleggerRoutes | undefined>();

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
            navigate(`${path}?language=${locale}&data=${encodeToBase64(JSON.stringify(context))}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    const goToPreviousDefaultStep = useCallback(() => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id || PlanleggerRoutes.OM_PLANLEGGEREN;
        setPath(previousPath);
    }, [stepConfig]);

    const goToNextStep = useCallback((path: PlanleggerRoutes) => {
        setPath(path);
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

export default usePlanleggerNavigator;
