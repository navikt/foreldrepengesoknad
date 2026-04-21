import { SøknadRoutes } from 'appData/routes';
import { useRef } from 'react';
import { flushSync } from 'react-dom';

import { captureMessage, loggUmamiEvent } from '@navikt/fp-observability';
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

    // `stepConfig` er utleia frå context-data. Når kallande kode oppdaterer context (t.d. `oppdaterUttaksplan(...)`)
    // rett før den navigerer, har den nye contexten ikkje rukke å bli applisert enno – så closure-en ville sett gamal `stepConfig`.
    // Vi held derfor ein ref som oppdaterast kvar render, og `flushSync` tvingar React til å committa ventande dispatches før vi les ref-en.
    const stepConfigRef = useRef(stepConfig);
    stepConfigRef.current = stepConfig;

    const navigerTilDefaultSteg = (retning: 'next' | 'previous') => {
        // Tøm ut ventande context-dispatches frå same event-handler slik at `stepConfigRef.current` reflekterer den oppdaterte tilstanden.
        // eslint-disable-next-line @eslint-react/dom-no-flush-sync -- bevisst: må committa context-dispatches frå kallande kode før vi reknar ut neste path
        flushSync(() => {});

        const ferskStepConfig = stepConfigRef.current;
        const currentIndex = ferskStepConfig.findIndex((s) => s.isSelected);
        if (currentIndex === -1) {
            captureMessage(`useFpNavigator: kunne ikkje finne valgt steg i stepConfig ved ${retning}-navigasjon`);
            return;
        }

        const path =
            retning === 'next'
                ? ferskStepConfig[currentIndex + 1]?.id
                : (ferskStepConfig[currentIndex - 1]?.id ?? SøknadRoutes.VELKOMMEN);

        if (path === undefined) {
            captureMessage(`useFpNavigator: fann ingen ${retning}-path frå steg ${ferskStepConfig[currentIndex]?.id}`);
            return;
        }

        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const goToPreviousDefaultStep = () => {
        navigerTilDefaultSteg('previous');
    };

    const goToNextStep = (path: SøknadRoutes) => {
        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const goToNextDefaultStep = () => {
        navigerTilDefaultSteg('next');
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
