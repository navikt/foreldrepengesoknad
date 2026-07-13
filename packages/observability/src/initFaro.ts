import { init } from '@nais/apm';

import {
    DISTRIBUTOR_PATTERN,
    DOM_OVERSETTELSE_FEIL,
    type StackFrame,
    harDistributorStacktrace,
    harUtenforstaendeKodeOpprinnelse,
} from './filterUtils';

type InitFaroOptions = {
    app: {
        /** Må matche `metadata.name` i naiserator.yaml. */
        name: string;
        /** Må matche `metadata.namespace` i naiserator.yaml. */
        namespace: string;
    };
};

type ExceptionPayload = {
    type?: string;
    value?: string;
    stacktrace?: {
        frames?: StackFrame[];
    };
};

type FaroItem = {
    type?: string;
    payload?: ExceptionPayload;
};

type ExceptionItem = FaroItem & {
    type: 'exception';
    payload: ExceptionPayload;
};

const customPageMeta = () => {
    const regex = /(planleggerData=)[^&\s]+/;

    const result: string = regex.test(location.href) ? location.href.replace(regex, '$1*******') : location.href;

    return {
        page: {
            url: result,
        },
    };
};

/**
 * Initialiserer @nais/apm (NAIS-wrapper rundt Faro) for frontend-observability.
 * Se https://docs.nais.io/observability/apm/tutorials/track-frontend-errors/
 */
export const initFaro = ({ app }: InitFaroOptions) => {
    if (import.meta.env.MODE === 'development') {
        return;
    }

    init({
        app: app.name,
        namespace: app.namespace,
        version: import.meta.env.VITE_SENTRY_RELEASE,
        faro: {
            metas: [customPageMeta],
        },
        beforeSend: (item) => {
            if (!erExceptionItem(item)) {
                return item;
            }

            if (feilVarSomFølgeAvEn401Handling(item)) {
                return null;
            }

            if (feilUtenOpprinnelseIVårKode(item)) {
                return null;
            }

            if (feilFraBrowserExtensions(item)) {
                return null;
            }

            if (feilFraDomOversettelse(item)) {
                return null;
            }

            if (feilFraHasFocus(item)) {
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
 * @nais/apm eksponerer ikke breadcrumbs i beforeSend, så vi sjekker feilmeldingstype og -verdi direkte.
 */
const feilVarSomFølgeAvEn401Handling = (item: ExceptionItem): boolean => {
    const { type, value } = item.payload;

    const unauthorizedPattern = /\b401\b|unauthorized/i;

    return (type ? unauthorizedPattern.test(type) : false) || (value ? unauthorizedPattern.test(value) : false);
};

/**
 * Sjekker om exception har stacktrace uten opprinnelse i vår kode.
 * Delegerer til felles harUtenforstaendeKodeOpprinnelse.
 */
const feilUtenOpprinnelseIVårKode = (item: ExceptionItem): boolean => {
    const frames = item.payload.stacktrace?.frames;
    return frames ? harUtenforstaendeKodeOpprinnelse(frames) : false;
};

/**
 * Nettleserutvidelser som f.eks. taleassistenter (Speech Assist) genererer mange "Request timeout ...Distributor.getValue"-feil.
 * Disse er ikke våre feil, og vi vil ikke ha dem i @nais/apm/Faro.
 */
const feilFraBrowserExtensions = (item: ExceptionItem): boolean => {
    const { type, value, stacktrace } = item.payload;

    if ((type && DISTRIBUTOR_PATTERN.test(type)) || (value && DISTRIBUTOR_PATTERN.test(value))) {
        return true;
    }

    return stacktrace?.frames ? harDistributorStacktrace(stacktrace.frames) : false;
};

const feilFraDomOversettelse = (item: ExceptionItem): boolean => {
    return item.payload.value ? DOM_OVERSETTELSE_FEIL.test(item.payload.value) : false;
};

const HAS_FOCUS_FEIL = /\b(window|globalThis|self)\.hasFocus is not a function/i;

const feilFraHasFocus = (item: ExceptionItem): boolean => {
    return item.payload.value ? HAS_FOCUS_FEIL.test(item.payload.value) : false;
};

const erExceptionItem = (item: unknown): item is ExceptionItem => {
    if (!item || typeof item !== 'object') {
        return false;
    }

    const faroItem = item as FaroItem;
    return faroItem.type === 'exception';
};
