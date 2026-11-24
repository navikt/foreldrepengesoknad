import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';
import { useCallback, useEffect, useState } from 'react';

type SkyraEventType = 'surveyStarted' | 'surveyCompleted' | 'surveyRejected';
type SkyraEventCallback = (event: { slug: string }) => void;
type SurveyStatus = 'loading' | 'ready' | 'error' | 'unavailable';

declare global {
    var skyra:
        | {
              on: (event: SkyraEventType, callback: SkyraEventCallback) => void;
              off: (event: SkyraEventType, callback: SkyraEventCallback) => void;
              reload?: () => void;
          }
        | undefined;
    // Settes av Dekoratøren når samtykkedata er lastet.
    var webStorageController: unknown;
}

const SKYRA_ELEMENT = 'skyra-survey';
const DEKORATØR_SJEKK_INTERVALL_MS = 100;
const DEKORATØR_MAKS_VENTETID_MS = 5000;
const SKYRA_MAKS_LASTETID_MS = 30_000;

const harSamtykkeTilUndersøkelser = () => getCurrentConsent().consent.surveys;

/**
 * Dekoratøren laster Skyra bare når brukeren har samtykket. Uten samtykke kommer det aldri
 * noe signal fra Skyra, så vi må vite om samtykket finnes før vi viser noe.
 */
const useSamtykkeTilUndersøkelser = () => {
    const [harSamtykke, setHarSamtykke] = useState(harSamtykkeTilUndersøkelser);

    useEffect(() => {
        // Vi poller selv i stedet for å bruke awaitDecoratorData, som fortsetter å polle etter timeout og ikke kan avbrytes.
        // Første runde leser også samtykket på nytt i tilfelle dekoratøren lastet mellom render og effekt.
        let ventetid = 0;
        const intervall = setInterval(() => {
            ventetid += DEKORATØR_SJEKK_INTERVALL_MS;
            if (globalThis.webStorageController) {
                clearInterval(intervall);
                setHarSamtykke(harSamtykkeTilUndersøkelser());
            } else if (ventetid >= DEKORATØR_MAKS_VENTETID_MS) {
                // Dekoratøren er ikke lastet. Da lastes heller ikke Skyra.
                clearInterval(intervall);
            }
        }, DEKORATØR_SJEKK_INTERVALL_MS);

        // Dekoratøren sender disse fra samtykkebanneret. Modulpakken har ikke eget abonnement på endringer.
        const giSamtykke = () => setHarSamtykke(true);
        const trekkSamtykke = () => setHarSamtykke(false);
        globalThis.addEventListener('consentAllWebStorage', giSamtykke);
        globalThis.addEventListener('refuseOptionalWebStorage', trekkSamtykke);

        return () => {
            clearInterval(intervall);
            globalThis.removeEventListener('consentAllWebStorage', giSamtykke);
            globalThis.removeEventListener('refuseOptionalWebStorage', trekkSamtykke);
        };
    }, []);

    return harSamtykke;
};

/**
 * Skyra-scriptet registrerer custom elementet når det er lastet. Før det sender elementet ingen
 * hendelser, så vi viser ingenting som kan bli stående og laste hvis scriptet blokkeres.
 */
const useErSkyraLastet = () => {
    const [erLastet, setErLastet] = useState(() => customElements.get(SKYRA_ELEMENT) !== undefined);

    useEffect(() => {
        if (erLastet) {
            return;
        }
        let erAktiv = true;
        void customElements.whenDefined(SKYRA_ELEMENT).then(() => {
            if (erAktiv) {
                setErLastet(true);
            }
        });
        return () => {
            erAktiv = false;
        };
    }, [erLastet]);

    return erLastet;
};

type UseSkyraSurveyParams = {
    slug: string;
    locale: string;
    onCompleted: () => void;
};

export const useSkyraSurvey = ({ slug, locale, onCompleted }: UseSkyraSurveyParams) => {
    const harSamtykke = useSamtykkeTilUndersøkelser();
    const erSkyraLastet = useErSkyraLastet();
    const erAktiv = harSamtykke && erSkyraLastet;

    const surveyKey = `${slug}-${locale}`;
    const [surveyState, setSurveyState] = useState<{ key: string; status: SurveyStatus }>({
        key: surveyKey,
        status: 'loading',
    });
    const [completedSlug, setCompletedSlug] = useState<string | null>(null);

    // Start på nytt neste gang undersøkelsen aktiveres, ellers skjuler en gammel skyra-unavailable eller skyra-error kortet.
    if (!erAktiv && surveyState.status !== 'loading') {
        setSurveyState({ key: surveyKey, status: 'loading' });
    }

    const status = surveyState.key === surveyKey ? surveyState.status : 'loading';
    const hasCompletedSurvey = completedSlug === slug;

    // React 19 kobler on*-props på custom elements til DOM-hendelser med samme navn (onReady -> "Ready").
    // Skyra sender skyra-ready, skyra-unavailable og skyra-error, så vi lytter på dem direkte.
    const surveyRef = useCallback(
        (element: HTMLElement | null) => {
            if (!element) {
                return;
            }
            const setStatus = (nyStatus: SurveyStatus) => () => setSurveyState({ key: surveyKey, status: nyStatus });
            const onReady = setStatus('ready');
            const onUnavailable = setStatus('unavailable');
            const onError = setStatus('error');

            element.addEventListener('skyra-ready', onReady);
            element.addEventListener('skyra-unavailable', onUnavailable);
            element.addEventListener('skyra-error', onError);

            return () => {
                element.removeEventListener('skyra-ready', onReady);
                element.removeEventListener('skyra-unavailable', onUnavailable);
                element.removeEventListener('skyra-error', onError);
            };
        },
        [surveyKey],
    );

    // Skyra sender ikke alltid en hendelse. Skjul kortet i stedet for å vise skeleton for alltid.
    useEffect(() => {
        if (!erAktiv || status !== 'loading') {
            return;
        }
        const timeout = setTimeout(() => {
            setSurveyState((forrige) =>
                forrige.key === surveyKey && forrige.status !== 'loading'
                    ? forrige
                    : { key: surveyKey, status: 'unavailable' },
            );
        }, SKYRA_MAKS_LASTETID_MS);
        return () => clearTimeout(timeout);
    }, [erAktiv, status, surveyKey]);

    useEffect(() => {
        const skyra = globalThis.skyra;
        // Skyra husker selv fullførte undersøkelser (skyra.state), så vi lagrer ingenting på enheten.
        if (!erAktiv || !skyra) {
            return;
        }

        const onSurveyCompleted: SkyraEventCallback = (event) => {
            if (event.slug === slug) {
                setCompletedSlug(slug);
                onCompleted();
            }
        };

        skyra.on('surveyCompleted', onSurveyCompleted);
        return () => skyra.off('surveyCompleted', onSurveyCompleted);
    }, [erAktiv, onCompleted, slug]);

    return {
        erAktiv,
        status,
        hasCompletedSurvey,
        surveyKey,
        surveyRef,
    };
};
