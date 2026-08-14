import { NæringDto, SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

export const getForhåndsvalgtNæringstype = (
    selvstendigNæring: SelvstendigNæringDto_fpoversikt[],
): NæringDto['næringstype'] | undefined => {
    const [førsteNæring] = selvstendigNæring;
    if (førsteNæring === undefined || førsteNæring.næringstype === 'FISKE') {
        return undefined;
    }

    return selvstendigNæring.every((næring) => næring.næringstype === førsteNæring.næringstype)
        ? førsteNæring.næringstype
        : undefined;
};
