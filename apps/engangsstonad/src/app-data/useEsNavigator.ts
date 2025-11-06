import { loggUmamiEvent } from '@navikt/fp-metrics';

import { ContextDataType, useContextSaveData } from './EsDataContext';
import { Path } from './paths';
import { useStepConfig } from './useStepConfig';

export const useEsNavigator = (mellomlagreOgNaviger: () => Promise<void>) => {
    const stepConfig = useStepConfig();
    const oppdaterPath = useContextSaveData(ContextDataType.CURRENT_PATH);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id ?? Path.VELKOMMEN;
        oppdaterPath(previousPath);
        return mellomlagreOgNaviger();
    };

    const goToNextStep = (path: Path) => {
        oppdaterPath(path);
        return mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;

        oppdaterPath(nextPath);
        return mellomlagreOgNaviger();
    };

    const avbrytSøknad = () => {
        oppdaterPath(undefined);
        return mellomlagreOgNaviger();
    };

    const fortsettSøknadSenere = () => {
        loggUmamiEvent({ origin: 'engangsstonad', eventName: 'skjema fortsett senere' });
        globalThis.location.href = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToNextStep,
        goToNextDefaultStep,
        avbrytSøknad,
        fortsettSøknadSenere,
    };
};
