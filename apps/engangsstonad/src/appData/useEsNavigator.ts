import { useEffect } from 'react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';

import { ContextDataType, useContextSaveData } from './EsDataContext';
import { Path } from './paths';
import useStepConfig from './useStepConfig';

const useEsNavigator = (mellomlagreOgNaviger: () => Promise<void>) => {
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
        return mellomlagreOgNaviger();
    };

    const goToNextStep = (path: Path) => {
        console.log('ny path', path);
        oppdaterPath(path);
        return mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;
        console.log(nextPath);
        oppdaterPath(nextPath);
        return mellomlagreOgNaviger();
    };

    const avbrytSøknad = () => {
        oppdaterPath(undefined);
        return mellomlagreOgNaviger();
    };

    const fortsettSøknadSenere = () => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'engangsstonadny',
            team: 'foreldrepenger',
            hendelse: 'fortsettSenere',
        });
        (window as any).location = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToNextStep,
        goToNextDefaultStep,
        avbrytSøknad,
        fortsettSøknadSenere,
    };
};

export default useEsNavigator;
