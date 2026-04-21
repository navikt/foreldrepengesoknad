import { SøknadRoutes } from 'appData/routes';
import { useEffect, useRef, useState } from 'react';

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

    // Vi kan ikkje rekne ut next/previous path synkront frå closure-fanga `stepConfig`,
    // fordi kallande kode ofte dispatcher context-oppdateringar (t.d. oppdaterUttaksplan)
    // i same handler. Vi triggar derfor ein effekt med eit sekvensnummer; effekten køyrer
    // etter neste render og les då ferskt `stepConfig`.
    const nextSeqRef = useRef(0);
    const lastProcessedSeqRef = useRef(0);
    const directionRef = useRef<'next' | 'previous' | null>(null);
    const [seq, setSeq] = useState(0);

    const navigerTilDefaultSteg = (retning: 'next' | 'previous') => {
        nextSeqRef.current += 1;
        directionRef.current = retning;
        setSeq(nextSeqRef.current);
    };

    useEffect(() => {
        // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler -- bevisst: må vente på render etter context-dispatch
        if (seq === lastProcessedSeqRef.current) {
            return;
        }
        lastProcessedSeqRef.current = seq;

        const retning = directionRef.current;
        if (retning === null) {
            return;
        }

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
