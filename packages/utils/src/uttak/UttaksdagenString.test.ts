import { describe, expect, it } from 'vitest';

import { UttaksdagenString, erUttaksdag } from './UttaksdagenString';

const FREDAG = '2026-01-16';
const LØRDAG = '2026-01-17';
const SØNDAG = '2026-01-18';
const MANDAG = '2026-01-19';

describe('UttaksdagenString', () => {
    describe('erUttaksdag', () => {
        it('skal returnere true for ukedag', () => {
            expect(erUttaksdag(FREDAG)).toBe(true);
            expect(erUttaksdag(MANDAG)).toBe(true);
        });

        it('skal returnere false for lørdag', () => {
            expect(erUttaksdag(LØRDAG)).toBe(false);
        });

        it('skal returnere false for søndag', () => {
            expect(erUttaksdag(SØNDAG)).toBe(false);
        });
    });

    describe('UttaksdagenString.forArbeidsdagen', () => {
        it('skal lage uttaksdag for en ukedag', () => {
            const u = UttaksdagenString.forArbeidsdagen(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal kaste feil for helgedag', () => {
            expect(() => UttaksdagenString.forArbeidsdagen(LØRDAG)).toThrow();
            expect(() => UttaksdagenString.forArbeidsdagen(SØNDAG)).toThrow();
        });
    });

    describe('UttaksdagenString.forDenneEllerForrige', () => {
        it('skal beholde ukedag uendret', () => {
            const u = UttaksdagenString.forDenneEllerForrige(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte lørdag til fredag', () => {
            const u = UttaksdagenString.forDenneEllerForrige(LØRDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte søndag til fredag', () => {
            const u = UttaksdagenString.forDenneEllerForrige(SØNDAG);
            expect(u.getDato()).toBe(FREDAG);
        });
    });

    describe('UttaksdagenString.forDenneEllerNeste', () => {
        it('skal beholde ukedag uendret', () => {
            const u = UttaksdagenString.forDenneEllerNeste(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte lørdag til mandag', () => {
            const u = UttaksdagenString.forDenneEllerNeste(LØRDAG);
            expect(u.getDato()).toBe(MANDAG);
        });

        it('skal flytte søndag til mandag', () => {
            const u = UttaksdagenString.forDenneEllerNeste(SØNDAG);
            expect(u.getDato()).toBe(MANDAG);
        });
    });

    describe('UttaksdagenString.forForrige / forNeste', () => {
        it('skal gå til forrige uttaktsdag', () => {
            const u = UttaksdagenString.forForrige(MANDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal gå til neste uttaktsdag', () => {
            const u = UttaksdagenString.forNeste(FREDAG);
            expect(u.getDato()).toBe(MANDAG);
        });
    });

    describe('Legg til og trekk fra uttaksdager', () => {
        it('skal legge 0 uttaksdager -> samme dato', () => {
            const u = UttaksdagenString.forArbeidsdagen(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(0)).toBe(FREDAG);
        });

        it('skal legge 1 uttaksdag fra fredag -> mandag', () => {
            const u = UttaksdagenString.forArbeidsdagen(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(1)).toBe(MANDAG);
        });

        it('skal legge til 5 uttaksdager fra fredag -> neste fredag', () => {
            const u = UttaksdagenString.forArbeidsdagen(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(5)).toBe('2026-01-23');
        });

        it('skal trekke 1 uttaksdag fra mandag -> fredag', () => {
            const u = UttaksdagenString.forArbeidsdagen(MANDAG);
            expect(u.getDatoAntallUttaksdagerTidligere(1)).toBe(FREDAG);
        });

        it('skal trekke 5 uttaksdager fra fredag -> forrige fredag', () => {
            const u = UttaksdagenString.forArbeidsdagen(FREDAG);
            expect(u.getDatoAntallUttaksdagerTidligere(5)).toBe('2026-01-09');
        });
    });

    describe('getUttaksdagerFremTilDato', () => {
        it('skal vøre 0 dager mellom fredag og fredag', () => {
            const u = UttaksdagenString.forArbeidsdagen(FREDAG);
            expect(u.getUttaksdagerFremTilDato(FREDAG)).toBe(0);
        });

        it('skal være en uttaksdag fra fredag til mandag', () => {
            const u = UttaksdagenString.forArbeidsdagen(FREDAG);
            expect(u.getUttaksdagerFremTilDato(MANDAG)).toBe(1);
        });
    });
});
