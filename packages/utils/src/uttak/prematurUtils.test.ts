import { erFødtFørUke33, getAntallVirkedagerFraFødselTilTermin } from './prematurUtils';

describe('prematurUtils', () => {
    describe('erFødtFørUke33', () => {
        it('skal returnere true når barnet er født mer enn 52 dager før termin', () => {
            expect(erFødtFørUke33('2021-01-01', '2021-03-01')).toBe(true);
        });

        it('skal returnere false når barnet er født nøyaktig 52 dager før termin', () => {
            expect(erFødtFørUke33('2025-01-06', '2025-02-27')).toBe(false);
        });

        it('skal returnere true når barnet er født 53 dager før termin', () => {
            expect(erFødtFørUke33('2025-01-06', '2025-02-28')).toBe(true);
        });

        it('skal returnere false når barnet er født mindre enn 52 dager før termin', () => {
            expect(erFødtFørUke33('2021-02-15', '2021-03-01')).toBe(false);
        });

        it('skal returnere false når fødselsdato eller termindato mangler', () => {
            expect(erFødtFørUke33(undefined, '2021-03-01')).toBe(false);
            expect(erFødtFørUke33('2021-01-01', undefined)).toBe(false);
        });

        // TFP-7125: terskelen var 49 dager i søknaden, mens fagsystemet bruker 52. Det ga et vindu der
        // søknaden viste at stønadsperioden ble forlenget, uten at kvotene inneholdt prematurdagene.
        it('skal returnere false i hele vinduet der den gamle 49-dagersterskelen ga feil svar', () => {
            expect(erFødtFørUke33('2025-01-06', '2025-02-25')).toBe(false);
            expect(erFødtFørUke33('2025-01-06', '2025-02-26')).toBe(false);
            expect(erFødtFørUke33('2025-01-06', '2025-02-27')).toBe(false);
        });
    });

    describe('getAntallVirkedagerFraFødselTilTermin', () => {
        it('skal telle virkedager fra og med fødselsdato til og med dagen før termindato', () => {
            // Fredag 1. januar 2021 til fredag 8. januar 2021 (ikke medregnet) gir 5 virkedager (1.-7. jan)
            const antallVirkedager = getAntallVirkedagerFraFødselTilTermin('2021-01-01', '2021-01-08');
            expect(antallVirkedager).toBe(5);
        });

        it('skal gi 7 uker og 4 dager forlengelse ved 53 dager mellom fødsel og termin', () => {
            expect(getAntallVirkedagerFraFødselTilTermin('2025-01-06', '2025-02-28')).toBe(39);
        });
    });
});
