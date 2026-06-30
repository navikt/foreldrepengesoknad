import { loggUmamiEvent } from '@navikt/fp-observability';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './SvpDataContext';
import { MellomlagreSøknadFn } from './useMellomlagreSøknad';
import { SøknadRoute } from './routes';
import { useStepConfig } from './useStepConfig';

export const useSvpNavigator = (
    mellomlagreOgNaviger: MellomlagreSøknadFn,
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);

    const goToPreviousDefaultStep = () => {
        const index = stepConfig.findIndex((s) => s.isSelected) - 1;
        const previousPath = stepConfig[index]?.id ?? SøknadRoute.FORSIDE;
        oppdaterPath(previousPath);
        void mellomlagreOgNaviger();
    };

    const goToStep = (path: SøknadRoute | string) => {
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
        loggUmamiEvent({ origin: 'svangerskapspengesoknad', eventName: 'skjema fortsett senere' });
        // Berre lagre (ingen navigering – vi forlet appen rett etterpå), med retry
        // sidan brukaren ikkje får eit nytt forsøk på å lagre endringane sine.
        void (async () => {
            await mellomlagreOgNaviger({ naviger: false, medRetry: true });
            globalThis.location.href = 'https://nav.no';
        })();
    };

    return {
        goToPreviousDefaultStep,
        goToStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};
