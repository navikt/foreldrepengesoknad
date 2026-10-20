import { describe, expect, it } from 'vitest';

import { harUtenforstaendeKodeOpprinnelse } from './filterUtils';

const EGEN_ASSET = { filename: 'https://www.nav.no/foreldrepenger/soknad/assets/app.js', function: 'Uttaksplan' };
const ANONYM = { filename: '<anonymous>', function: 'Array.map' };

describe('harUtenforstaendeKodeOpprinnelse', () => {
    it('filtrerer ikke feil fra vår kode selv om stacken går via Array.map (<anonymous>)', () => {
        expect(harUtenforstaendeKodeOpprinnelse([EGEN_ASSET, ANONYM])).toBe(false);
    });

    it.each([
        { beskrivelse: 'native', frame: { filename: 'native', function: 'forEach' } },
        { beskrivelse: '[native code]', frame: { filename: '[native code]', function: 'forEach' } },
        { beskrivelse: 'uten filnavn', frame: { function: 'forEach' } },
    ])('filtrerer ikke feil fra vår kode med innebygd frame ($beskrivelse)', ({ frame }) => {
        expect(harUtenforstaendeKodeOpprinnelse([frame, EGEN_ASSET])).toBe(false);
    });

    it('filtrerer feil som bare har frames fra nettleserutvidelser og andre domener', () => {
        expect(
            harUtenforstaendeKodeOpprinnelse([
                { filename: 'chrome-extension://abcdefghijklmnop/content.js', function: 'inject' },
                ANONYM,
                { filename: 'https://www.googletagmanager.com/gtm.js', function: 'track' },
            ]),
        ).toBe(true);
    });

    it('filtrerer feil med frame fra dekoratøren selv om stacken også har vår kode', () => {
        expect(
            harUtenforstaendeKodeOpprinnelse([
                EGEN_ASSET,
                { filename: 'https://www.nav.no/dekoratoren/personbruker/decorator-next-abc.js' },
            ]),
        ).toBe(true);
    });

    it('beholder feil som bare har anonyme/innebygde frames, siden opprinnelsen ikke kan avgjøres', () => {
        expect(harUtenforstaendeKodeOpprinnelse([ANONYM, { filename: 'native' }, {}])).toBe(false);
    });
});
