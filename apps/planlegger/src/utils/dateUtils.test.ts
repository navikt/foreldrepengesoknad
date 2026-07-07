import { erFødtFørUke33, getAntallVirkedagerFraFødselTilTermin } from './dateUtils';

describe('dateUtils', () => {
    describe('erFødtFørUke33', () => {
        it('skal returnere true når barnet er født mer enn 7 uker (49 dager) før termin', () => {
            expect(erFødtFørUke33('2021-01-01', '2021-03-01')).toBe(true);
        });

        it('skal returnere false når barnet er født nøyaktig 7 uker (49 dager) før termin', () => {
            expect(erFødtFørUke33('2021-01-11', '2021-03-01')).toBe(false);
        });

        it('skal returnere false når barnet er født mindre enn 7 uker før termin', () => {
            expect(erFødtFørUke33('2021-02-15', '2021-03-01')).toBe(false);
        });

        it('skal returnere false når fødselsdato eller termindato mangler', () => {
            expect(erFødtFørUke33(undefined, '2021-03-01')).toBe(false);
            expect(erFødtFørUke33('2021-01-01', undefined)).toBe(false);
        });
    });

    describe('getAntallVirkedagerFraFødselTilTermin', () => {
        it('skal telle virkedager fra og med fødselsdato til og med dagen før termindato', () => {
            // Fredag 1. januar 2021 til fredag 8. januar 2021 (ikke medregnet) gir 5 virkedager (1.-7. jan)
            const antallVirkedager = getAntallVirkedagerFraFødselTilTermin('2021-01-01', '2021-01-08');
            expect(antallVirkedager).toBe(5);
        });
    });
});
