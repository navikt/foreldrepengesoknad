import { useEffect, useRef, useState } from 'react';

import { loggUmamiEvent } from '@navikt/fp-observability';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataType, useContextSaveData } from './SvpDataContext';
import { SøknadRoute } from './routes';
import { useStepConfig } from './useStepConfig';

type DefaultNavRetning = 'next' | 'previous';

export const useSvpNavigator = (
    mellomlagreOgNaviger: () => Promise<void>,
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const oppdaterPath = useContextSaveData(ContextDataType.APP_ROUTE);

    // Default-navigering må bruke FRISK stepConfig som reflekterer state-oppdateringer
    // gjort i samme event-handler (f.eks. når svar på et radio-spørsmål både fjerner et
    // betinget steg og deretter ber om "neste steg"). stepConfig fra render-tid er stale
    // i event-handleren – derfor utsetter vi navigeringen til neste render via useEffect.
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
        const targetPath = config[targetIndex]?.id ?? (retning === 'previous' ? SøknadRoute.FORSIDE : undefined);

        oppdaterPathRef.current(targetPath);
        void mellomlagreOgNavigerRef.current();
    }, [navTick]);

    const triggerDefaultNav = (retning: DefaultNavRetning) => {
        pendingDefaultNavRef.current = retning;
        setNavTick((n) => n + 1);
    };

    const goToPreviousDefaultStep = () => triggerDefaultNav('previous');
    const goToNextDefaultStep = () => triggerDefaultNav('next');

    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const goToStep = (path: SøknadRoute | string) => {
        oppdaterPath(path);
        void mellomlagreOgNaviger();
    };

    const fortsettSøknadSenere = () => {
        loggUmamiEvent({ origin: 'svangerskapspengesoknad', eventName: 'skjema fortsett senere' });
        globalThis.location.href = 'https://nav.no';
    };

    return {
        goToPreviousDefaultStep,
        goToStep,
        goToNextDefaultStep,
        fortsettSøknadSenere,
    };
};
