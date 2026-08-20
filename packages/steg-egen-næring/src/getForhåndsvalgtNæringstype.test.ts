import { SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

import { getForhåndsvalgtNæringstype } from './getForhåndsvalgtNæringstype';

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

    it('skal ikke foreslå type når virksomhetene har ulike typer', () => {
        expect(getForhåndsvalgtNæringstype([lagNæring('ANNEN'), lagNæring('DAGMAMMA', '887766554')])).toBeUndefined();
    });

    it('skal foreslå fiske når alle virksomhetene er fiske', () => {
        expect(getForhåndsvalgtNæringstype([lagNæring('FISKE'), lagNæring('FISKE', '887766554')])).toBe('FISKE');
    });
});
