import { SøknadRoutes } from 'appData/routes';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './FpDataContext';
import { useStepConfig } from './useStepConfig';

export const useFpNavigator = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    mellomlagreOgNaviger: () => Promise<void>,
    erEndringssøknad = false,
) => {
    const stepConfig = useStepConfig(arbeidsforhold, erEndringssøknad);
    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id ?? SøknadRoutes.VELKOMMEN;
        oppdaterPath(previousPath);
        return mellomlagreOgNaviger();
    };

    const goToNextStep = (path: SøknadRoutes) => {
        oppdaterPath(path);
        return mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;

        oppdaterPath(nextPath);
        return mellomlagreOgNaviger();
    };

    const fortsettSøknadSenere = () => {
        loggAmplitudeEvent({ origin: 'foreldrepengesoknad', eventName: 'skjema fortsett senere' });
        globalThis.location.href = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToNextStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};
