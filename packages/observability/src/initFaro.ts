import { init } from '@nais/apm';

import {
    BROWSER_EXTENSION_TIMEOUT_PATTERN,
    DOM_OVERSETTELSE_FEIL,
    type StackFrame,
    harBrowserExtensionTimeoutStacktrace,
    harUtenforstaendeKodeOpprinnelse,
} from './filterUtils';

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

type TransportItem = Parameters<NonNullable<NonNullable<Parameters<typeof init>[0]>['beforeSend']>>[0];

// Søkestreng og fragment kan inneholde personopplysninger, så bare ruten sendes
const pageMetaUtenSøkOgFragment = () => ({
    page: {
        url: `${location.origin}${location.pathname}`,
    },
});

const URL_MED_SØK_ELLER_FRAGMENT = /^(https?:\/\/[^?#]*)[?#].*$/is;

const utenSøkOgFragment = (verdi: string) => verdi.replace(URL_MED_SØK_ELLER_FRAGMENT, '$1');

type Strengkart = Record<string, string>;

const vaskUrlVerdier = (verdier: Strengkart): Strengkart => {
    const vasket = Object.fromEntries(
        Object.entries(verdier).map(([nøkkel, verdi]) => [
            nøkkel,
            typeof verdi === 'string' ? utenSøkOgFragment(verdi) : verdi,
        ]),
    );
    return Object.entries(vasket).some(([nøkkel, verdi]) => verdi !== verdier[nøkkel]) ? vasket : verdier;
};

const fjernSøkOgFragmentFraUrler = (item: TransportItem): TransportItem => {
    const payload = item.payload as { attributes?: Strengkart; context?: Strengkart };
    const attributes = payload.attributes ? vaskUrlVerdier(payload.attributes) : undefined;
    const context = payload.context ? vaskUrlVerdier(payload.context) : undefined;
    const pageUrl = item.meta.page?.url;
    const vasketPageUrl = pageUrl ? utenSøkOgFragment(pageUrl) : pageUrl;

    if (attributes === payload.attributes && context === payload.context && vasketPageUrl === pageUrl) {
        return item;
    }

    return {
        ...item,
        payload: {
            ...item.payload,
            ...(attributes && { attributes }),
            ...(context && { context }),
        },
        meta: item.meta.page ? { ...item.meta, page: { ...item.meta.page, url: vasketPageUrl } } : item.meta,
    };
};

export const initFaro = () => {
    if (import.meta.env.MODE === 'development') {
        return;
    }

    init({
        faro: {
            metas: [pageMetaUtenSøkOgFragment],
        },
        beforeSend: (item) => {
            if (erExceptionItem(item) && erStøy(item)) {
                return null;
            }

            return fjernSøkOgFragmentFraUrler(item);
        },
    });
};

const erStøy = (item: ExceptionItem): boolean =>
    feilVarSomFølgeAvEn401Handling(item) ||
    feilUtenOpprinnelseIVårKode(item) ||
    feilFraBrowserExtensions(item) ||
    feilFraDomOversettelse(item) ||
    feilFraHasFocus(item);

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
 * Nettleserutvidelser (f.eks. taleassistenter og Microsoft Editor-tillegget i Edge) genererer mange
 * "Request timeout ..."-feil, som "...Distributor.getValue", "isPredictionAvailable", "isMathOcrAvailable",
 * "isDictateAvailable", "getDictionariesByLanguageId" og "DefineExpirationForLanguagePacks.getValue".
 * Disse er ikke våre feil, og vi vil ikke ha dem i @nais/apm/Faro.
 */
const feilFraBrowserExtensions = (item: ExceptionItem): boolean => {
    const { type, value, stacktrace } = item.payload;

    if (
        (type && BROWSER_EXTENSION_TIMEOUT_PATTERN.test(type)) ||
        (value && BROWSER_EXTENSION_TIMEOUT_PATTERN.test(value))
    ) {
        return true;
    }

    return stacktrace?.frames ? harBrowserExtensionTimeoutStacktrace(stacktrace.frames) : false;
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
