import { describe, expect, it } from 'vitest';

import { Uttaksdagen, erUttaksdag } from './UttaksdagenString';

const FREDAG = '2026-01-16';
const LØRDAG = '2026-01-17';
const SØNDAG = '2026-01-18';
const MANDAG = '2026-01-19';

describe('Uttaksdagen', () => {
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

    describe('Uttaksdagen.forArbeidsdagen', () => {
        it('skal lage uttaksdag for en ukedag', () => {
            const u = Uttaksdagen.forArbeidsdagen(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal kaste feil for helgedag', () => {
            expect(() => Uttaksdagen.forArbeidsdagen(LØRDAG)).toThrow();
            expect(() => Uttaksdagen.forArbeidsdagen(SØNDAG)).toThrow();
        });
    });

    describe('Uttaksdagen.forDenneEllerForrige', () => {
        it('skal beholde ukedag uendret', () => {
            const u = Uttaksdagen.forDenneEllerForrige(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte lørdag til fredag', () => {
            const u = Uttaksdagen.forDenneEllerForrige(LØRDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte søndag til fredag', () => {
            const u = Uttaksdagen.forDenneEllerForrige(SØNDAG);
            expect(u.getDato()).toBe(FREDAG);
        });
    });

    describe('Uttaksdagen.forDenneEllerNeste', () => {
        it('skal beholde ukedag uendret', () => {
            const u = Uttaksdagen.forDenneEllerNeste(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte lørdag til mandag', () => {
            const u = Uttaksdagen.forDenneEllerNeste(LØRDAG);
            expect(u.getDato()).toBe(MANDAG);
        });

        it('skal flytte søndag til mandag', () => {
            const u = Uttaksdagen.forDenneEllerNeste(SØNDAG);
            expect(u.getDato()).toBe(MANDAG);
        });
    });

    describe('Uttaksdagen.forForrige / forNeste', () => {
        it('skal gå til forrige uttaktsdag', () => {
            const u = Uttaksdagen.forForrige(MANDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal gå til neste uttaktsdag', () => {
            const u = Uttaksdagen.forNeste(FREDAG);
            expect(u.getDato()).toBe(MANDAG);
        });
    });

    describe('Legg til og trekk fra uttaksdager', () => {
        it('skal legge 0 uttaksdager -> samme dato', () => {
            const u = Uttaksdagen.forArbeidsdagen(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(0)).toBe(FREDAG);
        });

        it('skal legge 1 uttaksdag fra fredag -> mandag', () => {
            const u = Uttaksdagen.forArbeidsdagen(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(1)).toBe(MANDAG);
        });

        it('skal legge til 5 uttaksdager fra fredag -> neste fredag', () => {
            const u = Uttaksdagen.forArbeidsdagen(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(5)).toBe('2026-01-23');
        });

        it('skal trekke 1 uttaksdag fra mandag -> fredag', () => {
            const u = Uttaksdagen.forArbeidsdagen(MANDAG);
            expect(u.getDatoAntallUttaksdagerTidligere(1)).toBe(FREDAG);
        });

        it('skal trekke 5 uttaksdager fra fredag -> forrige fredag', () => {
            const u = Uttaksdagen.forArbeidsdagen(FREDAG);
            expect(u.getDatoAntallUttaksdagerTidligere(5)).toBe('2026-01-09');
        });
    });

    describe('getUttaksdagerFremTilDato', () => {
        it('skal vøre 0 dager mellom fredag og fredag', () => {
            const u = Uttaksdagen.forArbeidsdagen(FREDAG);
            expect(u.getUttaksdagerFremTilDato(FREDAG)).toBe(0);
        });

        it('skal være en uttaksdag fra fredag til mandag', () => {
            const u = Uttaksdagen.forArbeidsdagen(FREDAG);
            expect(u.getUttaksdagerFremTilDato(MANDAG)).toBe(1);
        });
    });
});
