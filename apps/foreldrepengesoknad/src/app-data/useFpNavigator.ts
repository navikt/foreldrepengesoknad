import { SøknadRoutes } from 'appData/routes';
import { useEffect, useRef, useState } from 'react';

import { captureMessage, loggUmamiEvent } from '@navikt/fp-observability';
import { EksternArbeidsforholdDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './FpDataContext';
import { MellomlagreSøknadFn } from './useMellomlagreSøknad';
import { useStepConfig } from './useStepConfig';

export const useFpNavigator = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    mellomlagreOgNaviger: MellomlagreSøknadFn,
    erEndringssøknad = false,
    eksisterendeSak: FpSak_fpoversikt | undefined = undefined,
) => {
    const stepConfig = useStepConfig(arbeidsforhold, erEndringssøknad, eksisterendeSak);
    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);

    // Vi kan ikkje rekne ut next/previous path synkront frå closure-fanga `stepConfig`,
    // fordi kallande kode ofte dispatcher context-oppdateringar (t.d. oppdaterUttaksplan)
    // i same handler. Vi triggar derfor ein effekt med eit sekvensnummer; effekten køyrer
    // etter neste render og les då ferskt `stepConfig`.
    const directionRef = useRef<'next' | 'previous' | null>(null);
    const [seq, setSeq] = useState(0);

    const navigerTilDefaultSteg = (retning: 'next' | 'previous') => {
        directionRef.current = retning;
        setSeq((s) => s + 1);
    };

    useEffect(() => {
        const retning = directionRef.current;
        if (retning === null) {
            return;
        }
        directionRef.current = null;

        const currentIndex = stepConfig.findIndex((s) => s.isSelected);
        if (currentIndex === -1) {
            captureMessage(`useFpNavigator: kunne ikkje finne valgt steg i stepConfig ved ${retning}-navigasjon`);
            return;
        }

        const path =
            retning === 'next'
                ? stepConfig[currentIndex + 1]?.id
                : (stepConfig[currentIndex - 1]?.id ?? SøknadRoutes.VELKOMMEN);

        if (path === undefined) {
            captureMessage(`useFpNavigator: fann ingen ${retning}-path frå steg ${stepConfig[currentIndex]?.id}`);
            return;
        }

        oppdaterPath(path);
        void mellomlagreOgNaviger();
    }, [seq, stepConfig, mellomlagreOgNaviger, oppdaterPath]);

    const goToPreviousDefaultStep = () => {
        navigerTilDefaultSteg('previous');
    };

    const goToStep = (path: SøknadRoutes) => {
        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const goToNextStep = () => {
        navigerTilDefaultSteg('next');
    };

    const fortsettSøknadSenere = () => {
        loggUmamiEvent({ origin: 'foreldrepengesoknad', eventName: 'skjema fortsett senere' });
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
        goToNextStep,
        fortsettSøknadSenere,
    };
};
