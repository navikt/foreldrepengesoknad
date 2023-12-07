import { useEffect } from 'react';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { ContextDataType, useContextSaveData } from './EsDataContext';
import { Path } from './paths';
import useStepConfig from './useStepConfig';

const useEsNavigator = (mellomlagreOgNaviger: () => void) => {
    const stepConfig = useStepConfig();
    const oppdaterPath = useContextSaveData(ContextDataType.CURRENT_PATH);

    const activeStepId = stepConfig.find((sc) => sc.isSelected);

    useEffect(() => {
        logAmplitudeEvent('sidevisning', {
            app: 'engangsstonadny',
            team: 'foreldrepenger',
            pageKey: activeStepId,
        });
    }, [activeStepId]);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id || Path.VELKOMMEN;
        oppdaterPath(previousPath);
        mellomlagreOgNaviger();
    };

    const goToNextStep = (path: Path) => {
        oppdaterPath(path);
        mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;

        oppdaterPath(nextPath);
        mellomlagreOgNaviger();
    };

    const avbrytSøknad = () => {
        oppdaterPath(undefined);
        mellomlagreOgNaviger();
    };

    return {
        goToPreviousDefaultStep,
        goToNextStep,
        goToNextDefaultStep,
        avbrytSøknad,
    };
};

export default useEsNavigator;
