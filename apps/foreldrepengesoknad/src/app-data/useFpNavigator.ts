import { SøknadRoutes } from 'appData/routes';

import { loggUmamiEvent } from '@navikt/fp-observability';
import { EksternArbeidsforholdDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './FpDataContext';
import { useStepConfig } from './useStepConfig';

export const useFpNavigator = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    mellomlagreOgNaviger: () => Promise<void>,
    erEndringssøknad = false,
    eksisterendeSak: FpSak_fpoversikt | undefined = undefined,
) => {
    const stepConfig = useStepConfig(arbeidsforhold, erEndringssøknad, eksisterendeSak);
    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id ?? SøknadRoutes.VELKOMMEN;
        oppdaterPath(previousPath);
        void mellomlagreOgNaviger();
    };

    const goToNextStep = (path: SøknadRoutes) => {
        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) + 1;
        const nextPath = stepConfig[index]?.id;

        oppdaterPath(nextPath);
        void mellomlagreOgNaviger();
    };

    const fortsettSøknadSenere = () => {
        loggUmamiEvent({ origin: 'foreldrepengesoknad', eventName: 'skjema fortsett senere' });
        globalThis.location.href = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToNextStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};
