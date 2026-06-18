import {
    type ExceptionEvent,
    type TransportItem,
    TransportItemType,
    getWebInstrumentations,
    initializeFaro,
} from '@grafana/faro-web-sdk';

import { DISTRIBUTOR_PATTERN, harDistributorStacktrace, harUtenforstaendeKodeOpprinnelse } from './filterUtils';

type InitFaroOptions = {
    app: {
        /** Må matche `metadata.name` i naiserator.yaml. */
        name: string;
        /** Må matche `metadata.namespace` i naiserator.yaml. */
        namespace: string;
    };
};

/**
 * Initialiserer Grafana Faro for frontend-observability i NAIS.
 * Se https://docs.nais.io/observability/frontend/how-to/setup-faro/
 */
export const initFaro = ({ app }: InitFaroOptions) => {
    if (import.meta.env.MODE === 'development') {
        return;
    }

    // Samme image promoteres til dev-gcp og prod-gcp, så collector-URL må velges i
    // runtime. dev-gcp bruker det eksterne dev-endepunktet, prod-gcp det ordinære.
    // Se https://docs.nais.io/observability/frontend/reference/auto-configuration/
    const erDevMiljo = globalThis.location.hostname.endsWith('dev.nav.no');
    const url = erDevMiljo ? 'https://telemetry.ekstern.dev.nav.no/collect' : 'https://telemetry.nav.no/collect';

    initializeFaro({
        url,
        paused: globalThis.location.hostname === 'localhost',
        app: {
            ...app,
            // Brukes til å sammenligne metrikker på tvers av deploys.
            version: import.meta.env.VITE_SENTRY_RELEASE,
        },
        instrumentations: [...getWebInstrumentations()],
        beforeSend: (item) => {
            if (item.type !== TransportItemType.EXCEPTION) {
                return item;
            }

            const exceptionItem = item as TransportItem<ExceptionEvent>;

            if (feilVarSomFølgeAvEn401Handling(exceptionItem)) {
                return null;
            }

            if (feilUtenOpprinnelseIVårKode(exceptionItem)) {
                return null;
            }

            if (feilFraBrowserExtensions(exceptionItem)) {
                return null;
            }

            return item;
        },
    });
};

/**
 * 401 skaper mye støy da det er naturlig at folk sine sesjoner utløper.
 * De blir da automatisk redirected til login, og ser ikke feilen engang.
 *
 * I Sentry filtrerer vi via breadcrumbs. Faro har ikke breadcrumbs på exception events,
 * så vi sjekker feilmeldingstype og -verdi direkte.
 */
const feilVarSomFølgeAvEn401Handling = (item: TransportItem<ExceptionEvent>): boolean => {
    const { type, value } = item.payload;

    const unauthorizedPattern = /\b401\b|unauthorized/i;

    return (type ? unauthorizedPattern.test(type) : false) || (value ? unauthorizedPattern.test(value) : false);
};

/**
 * Sjekker om exception har stacktrace uten opprinnelse i vår kode.
 * Delegerer til felles harUtenforstaendeKodeOpprinnelse.
 */
const feilUtenOpprinnelseIVårKode = (item: TransportItem<ExceptionEvent>): boolean => {
    const frames = item.payload.stacktrace?.frames;
    return frames ? harUtenforstaendeKodeOpprinnelse(frames) : false;
};

/**
 * Nettleserutvidelser som f.eks. taleassistenter (Speech Assist) genererer mange "Request timeout ...Distributor.getValue"-feil.
 * Disse er ikke våre feil, og vi vil ikke ha dem i Faro.
 */
const feilFraBrowserExtensions = (item: TransportItem<ExceptionEvent>): boolean => {
    const { type, value, stacktrace } = item.payload;

    if ((type && DISTRIBUTOR_PATTERN.test(type)) || (value && DISTRIBUTOR_PATTERN.test(value))) {
        return true;
    }

    return stacktrace?.frames ? harDistributorStacktrace(stacktrace.frames) : false;
};
