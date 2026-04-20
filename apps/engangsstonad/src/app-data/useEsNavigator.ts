import { useEffect, useRef, useState } from 'react';

import { loggUmamiEvent } from '@navikt/fp-observability';

import { ContextDataType, useContextSaveData } from './EsDataContext';
import { Path } from './paths';
import { useStepConfig } from './useStepConfig';

type DefaultNavRetning = 'next' | 'previous';

export const useEsNavigator = (mellomlagreOgNaviger: () => Promise<void>) => {
    const stepConfig = useStepConfig();
    const oppdaterPath = useContextSaveData(ContextDataType.CURRENT_PATH);

    // Default-navigering må bruke FRISK stepConfig som reflekterer state-oppdateringer
    // gjort i samme event-handler. stepConfig fra render-tid er stale i event-handleren –
    // derfor utsetter vi navigeringen til neste render via useEffect.
    const stepConfigRef = useRef(stepConfig);
    stepConfigRef.current = stepConfig;

    const oppdaterPathRef = useRef(oppdaterPath);
    oppdaterPathRef.current = oppdaterPath;

    const mellomlagreOgNavigerRef = useRef(mellomlagreOgNaviger);
    mellomlagreOgNavigerRef.current = mellomlagreOgNaviger;

    const pendingDefaultNavRef = useRef<DefaultNavRetning | null>(null);
    const [navTick, setNavTick] = useState(0);

    useEffect(() => {
        const retning = pendingDefaultNavRef.current;
        if (retning === null) {
            return;
        }
        pendingDefaultNavRef.current = null;

        const config = stepConfigRef.current;
        const currentIndex = config.findIndex((s) => s.isSelected);
        const targetIndex = retning === 'next' ? currentIndex + 1 : currentIndex - 1;
        const targetPath = config[targetIndex]?.id ?? (retning === 'previous' ? Path.VELKOMMEN : undefined);

        oppdaterPathRef.current(targetPath);
        void mellomlagreOgNavigerRef.current();
    }, [navTick]);

    const triggerDefaultNav = (retning: DefaultNavRetning) => {
        pendingDefaultNavRef.current = retning;
        setNavTick((n) => n + 1);
    };

    const goToPreviousDefaultStep = () => triggerDefaultNav('previous');
    const goToNextDefaultStep = () => triggerDefaultNav('next');

    const goToNextStep = (path: Path) => {
        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const avbrytSøknad = () => {
        oppdaterPath(undefined);
        void mellomlagreOgNaviger();
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
