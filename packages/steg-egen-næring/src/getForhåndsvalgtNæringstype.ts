import { NæringDto, SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

const NÆRINGSTYPE_PRIORITET: Record<SelvstendigNæringDto_fpoversikt['næringstype'], number> = {
    FISKE: 0,
    JORDBRUK_SKOGBRUK: 1,
    DAGMAMMA: 2,
    ANNEN: 3,
};

export const getPrioritertRegistrertNæring = (
    selvstendigNæring: SelvstendigNæringDto_fpoversikt[],
): SelvstendigNæringDto_fpoversikt | undefined =>
    selvstendigNæring.toSorted(
        (a, b) =>
            NÆRINGSTYPE_PRIORITET[a.næringstype] - NÆRINGSTYPE_PRIORITET[b.næringstype] ||
            a.organisasjonsnummer.localeCompare(b.organisasjonsnummer),
    )[0];

export const getForhåndsvalgtNæringstype = (
    selvstendigNæring: SelvstendigNæringDto_fpoversikt[],
): NæringDto['næringstype'] | undefined => getPrioritertRegistrertNæring(selvstendigNæring)?.næringstype;
