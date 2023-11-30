import { useEffect } from 'react';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { EsDataType, useEsStateSaveFn } from './EsDataContext';
import { Path } from './paths';
import useStepConfig from './useStepConfig';

const useEsNavigator = (mellomlagreOgNaviger: () => void) => {
    const stepConfig = useStepConfig();
    const lagrePath = useEsStateSaveFn(EsDataType.CURRENT_PATH);

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
        lagrePath(previousPath);
        mellomlagreOgNaviger();
    };

    const goToNextStep = (path: Path) => {
        lagrePath(path);
        mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;

        lagrePath(nextPath);
        mellomlagreOgNaviger();
    };

    const avbrytSøknad = () => {
        lagrePath(undefined);
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
