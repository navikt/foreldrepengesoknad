import { HTTPError } from 'ky';

/**
 * Sant kun for 401. 403 holdes utenfor med vilje: Wonderwall svarer 401 når
 * sesjonen mangler eller er utløpt, mens 403 fra vår egen server betyr at
 * tokenet er ugyldig eller at OBO-veksling feilet. Det siste løses ikke av at
 * brukeren logger inn på nytt.
 */
const erUautorisert = (error: unknown): boolean =>
    error instanceof HTTPError && error.response.status === 401;

/**
 * Wonderwall svarer 401 — ikke 302 — på alt som ikke er en navigasjonsrequest.
 * En fane som har ligget åpen til sesjonen løp ut, oppdager derfor ingenting før
 * brukeren prøver å hente eller lagre noe. Da kommer 401-en, og appen kan ikke
 * brukes videre.
 *
 * Å laste siden på nytt er en navigasjonsrequest, og først da sender Wonderwall
 * brukeren videre til innlogging.
 *
 * Returnerer `true` når siden lastes på nytt, slik at kallende kode kan hoppe
 * over sin egen feilhåndtering.
 */
export const lastInnPåNyttVedUtløptSesjon = (error: unknown): boolean => {
    if (!erUautorisert(error)) {
        return false;
    }
    location.reload();
    return true;
};
