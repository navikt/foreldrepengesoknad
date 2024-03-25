// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function base64ToBytes(base64: string) {
    const binString = atob(base64);
    //@ts-ignore
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
function bytesToBase64(bytes: Uint8Array) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

// Quick polyfill since Firefox and Opera do not yet support isWellFormed().
// encodeURIComponent() throws an error for lone surrogates, which is essentially the same.
function isWellFormed(str: string) {
    //@ts-ignore
    if (typeof str.isWellFormed != 'undefined') {
        //@ts-ignore
        return str.isWellFormed();
    } else {
        // Use the older encodeURIComponent().
        try {
            encodeURIComponent(str);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export const encodeToBase64 = (stringToBeEncoded: string) => {
    if (isWellFormed(stringToBeEncoded)) {
        return bytesToBase64(new TextEncoder().encode(stringToBeEncoded));
    }
    throw Error('Error in base64 encoding');
};

export const decodeBase64 = (stringToBeDecoded: string) => {
    if (isWellFormed(stringToBeDecoded)) {
        return new TextDecoder().decode(base64ToBytes(stringToBeDecoded));
    }
    throw Error('Error in base64 decoding');
};
