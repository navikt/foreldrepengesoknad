import { etterDagensDato, hasValue, sisteDatoBarnetKanVæreFødt } from '@navikt/fp-common';

export const validateFødselDate = (dato: string) => {
    if (!hasValue(dato)) {
        return 'valideringsfeil.omBarnet.fødselsdato.duMåOppgi';
    }
    if (etterDagensDato(dato)) {
        return 'valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere';
    }
    if (sisteDatoBarnetKanVæreFødt(dato)) {
        return 'valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn6MånederTilbake';
    }
    return undefined;
};
