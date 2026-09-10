import { SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

import { getForhåndsvalgtNæringstype, getPrioritertRegistrertNæring } from './getForhåndsvalgtNæringstype';

const lagNæring = (
    næringstype: SelvstendigNæringDto_fpoversikt['næringstype'],
    organisasjonsnummer = '998877665',
): SelvstendigNæringDto_fpoversikt => ({
    navn: 'Kari Konsulent',
    næringstype,
    organisasjonsnummer,
});

describe('getForhåndsvalgtNæringstype', () => {
    it.each(['ANNEN', 'JORDBRUK_SKOGBRUK', 'DAGMAMMA'] as const)(
        'skal foreslå %s når én virksomhet finnes',
        (næringstype) => {
            expect(getForhåndsvalgtNæringstype([lagNæring(næringstype)])).toBe(næringstype);
        },
    );

    it('skal ikke foreslå type når ingen virksomheter finnes', () => {
        expect(getForhåndsvalgtNæringstype([])).toBeUndefined();
    });

    it('skal foreslå type når flere virksomheter har samme type', () => {
        expect(getForhåndsvalgtNæringstype([lagNæring('ANNEN'), lagNæring('ANNEN', '887766554')])).toBe('ANNEN');
    });

    it('skal prioritere fiske, jordbruk, dagmamma og annen i denne rekkefølgen', () => {
        expect(
            getForhåndsvalgtNæringstype([
                lagNæring('ANNEN'),
                lagNæring('DAGMAMMA', '887766554'),
                lagNæring('JORDBRUK_SKOGBRUK', '776655443'),
                lagNæring('FISKE', '665544332'),
            ]),
        ).toBe('FISKE');
    });

    it('skal velge laveste organisasjonsnummer deterministisk når typen er lik', () => {
        expect(
            getPrioritertRegistrertNæring([lagNæring('FISKE', '998877665'), lagNæring('FISKE', '887766554')])
                ?.organisasjonsnummer,
        ).toBe('887766554');
    });
});
