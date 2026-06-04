import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function base64ToBytes(base64: string) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
}

// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function bytesToBase64(bytes: Uint8Array) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

// Quick polyfill since Firefox and Opera do not yet support isWellFormed().
// encodeURIComponent() throws an error for lone surrogates, which is essentially the same.
function isWellFormed(str: string) {
    if (typeof str.isWellFormed !== 'undefined') {
        return str.isWellFormed();
    } else {
        // Use the older encodeURIComponent().
        try {
            encodeURIComponent(str);
            return true;
        } catch {
            return false;
        }
    }
}

export const encodeToBase64 = (stringToBeEncoded: string) => {
    if (isWellFormed(stringToBeEncoded)) {
        return bytesToBase64(new TextEncoder().encode(stringToBeEncoded));
    }
    throw new Error('Error in base64 encoding');
};

export const decodeBase64 = (stringToBeDecoded: string) => {
    if (isWellFormed(stringToBeDecoded)) {
        return new TextDecoder().decode(base64ToBytes(stringToBeDecoded));
    }
    throw new Error('Error in base64 decoding');
};

/**
 * Komprimerer en streng (typisk JSON) til en URL-trygg verdi for bruk i query-parametere.
 * Gir vesentlig kortere URL-er enn ren base64-koding fordi gjentakende JSON-struktur komprimeres.
 *
 * Output er trygt å legge rett inn i en query-streng uten ekstra `encodeURIComponent`.
 */
export const compressToUrl = (stringToBeCompressed: string) => {
    return compressToEncodedURIComponent(stringToBeCompressed);
};

const isParsableJson = (value: string | null): value is string => {
    if (!value) {
        return false;
    }
    try {
        JSON.parse(value);
        return true;
    } catch {
        return false;
    }
};

/**
 * Dekoder en verdi som ble lagt på URL-en av {@link compressToUrl}.
 *
 * Faller tilbake til {@link decodeBase64} dersom verdien ikke er lz-komprimert. Det gjør at gamle
 * delte lenker (base64-format) fortsatt fungerer i en overgangsperiode. Returnerer en JSON-streng
 * som kaller-koden selv må `JSON.parse`-e.
 */
export const decompressFromUrl = (valueFromUrl: string) => {
    const decompressed = decompressFromEncodedURIComponent(valueFromUrl);
    if (isParsableJson(decompressed)) {
        return decompressed;
    }
    return decodeBase64(valueFromUrl);
};
