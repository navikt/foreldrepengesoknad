import { decodeBase64, encodeToBase64 } from './urlEncodingUtils';

export const PLANLEGGER_DATA_QUERY_PARAM = 'planleggerData';

/**
 * Serialiserer planlegger-state til en base64-encodet JSON-streng som er trygg å bruke som query-parameter.
 * Brukes til å overføre planlegger-data til foreldrepengesøknad via URL.
 */
export const encodePlanleggerData = (data: unknown): string => {
    return encodeToBase64(JSON.stringify(data));
};

/**
 * Inverterer {@link encodePlanleggerData}. Returnerer `null` dersom strengen ikke kan dekodes/parses,
 * slik at kallere kan håndtere ugyldige eller manipulerte URL-er trygt.
 */
export const decodePlanleggerData = <T = unknown>(encoded: string): T | null => {
    try {
        const json = decodeBase64(encoded);
        return JSON.parse(json) as T;
    } catch {
        return null;
    }
};

/**
 * Bygger en URL med planlegger-data lagt på som query-parameter.
 * Bevarer eventuelle eksisterende query-parametere på base-URL-en.
 */
export const appendPlanleggerDataToUrl = (baseUrl: string, data: unknown): string => {
    const encoded = encodePlanleggerData(data);
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${PLANLEGGER_DATA_QUERY_PARAM}=${encodeURIComponent(encoded)}`;
};

/**
 * Henter og dekoder planlegger-data fra en query-streng (typisk `window.location.search`).
 * Returnerer `null` dersom parameteret mangler eller ikke kan dekodes.
 */
export const readPlanleggerDataFromQuery = <T = unknown>(search: string): T | null => {
    const params = new URLSearchParams(search);
    const encoded = params.get(PLANLEGGER_DATA_QUERY_PARAM);
    if (!encoded) {
        return null;
    }
    return decodePlanleggerData<T>(encoded);
};
