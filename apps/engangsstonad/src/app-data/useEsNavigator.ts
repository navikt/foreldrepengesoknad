import { useEffect, useRef, useState } from 'react';

import { loggUmamiEvent } from '@navikt/fp-observability';

import { ContextDataType, useContextGetAnyData, useContextSaveData } from './EsDataContext';
import { Path } from './paths';
import { MellomlagreSøknadFn } from './useEsMellomlagring';
import { lagAppStegliste, useCurrentPath } from './useStepConfig';

export const useEsNavigator = (mellomlagreOgNaviger: MellomlagreSøknadFn) => {
    const getStateData = useContextGetAnyData();
    const currentPath = useCurrentPath();
    const oppdaterPath = useContextSaveData(ContextDataType.CURRENT_PATH);

    // Vi kan ikkje rekne ut neste/forrige steg synkront, fordi kallande steg ofte
    // dispatcher context-oppdateringar (t.d. oppdaterOmBarnet) i same handler.
    // Vi triggar derfor ein effekt med eit sekvensnummer; effekten køyrer etter
    // neste render og les då ferske data via `getStateData`. Steget treng berre
    // oppdatere context som vanleg og deretter kalle goToNextDefaultStep().
    const retningRef = useRef<'neste' | 'forrige' | null>(null);
    const [seq, setSeq] = useState(0);

    const navigerTilDefaultSteg = (retning: 'neste' | 'forrige') => {
        retningRef.current = retning;
        setSeq((s) => s + 1);
    };

    useEffect(() => {
        const retning = retningRef.current;
        if (retning === null) {
            return;
        }
        retningRef.current = null;

        const stegliste = lagAppStegliste(getStateData);
        const index = stegliste.indexOf(currentPath);
        const nestePath = retning === 'neste' ? stegliste[index + 1] : (stegliste[index - 1] ?? Path.VELKOMMEN);

        oppdaterPath(nestePath);
        void mellomlagreOgNaviger();
    }, [seq, getStateData, currentPath, oppdaterPath, mellomlagreOgNaviger]);

    const goToNextDefaultStep = () => {
        navigerTilDefaultSteg('neste');
    };

    const goToPreviousDefaultStep = () => {
        navigerTilDefaultSteg('forrige');
    };

    const goToStep = (path: Path) => {
        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const avbrytSøknad = () => {
        oppdaterPath(undefined);
        void mellomlagreOgNaviger();
    };

    const fortsettSøknadSenere = () => {
        loggUmamiEvent({ origin: 'engangsstonad', eventName: 'skjema fortsett senere' });
        // Berre lagre (ingen navigering – vi forlet appen rett etterpå), med retry
        // sidan brukaren ikkje får eit nytt forsøk på å lagre endringane sine.
        void mellomlagreOgNaviger({ naviger: false, medRetry: true }).finally(() => {
            globalThis.location.href = 'https://nav.no';
        });
    };

    return {
        goToPreviousDefaultStep,
        goToNextDefaultStep,
        goToStep,
        avbrytSøknad,
        fortsettSøknadSenere,
    };
};
