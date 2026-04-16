import { describe, expect, it } from 'vitest';

import { Uttaksdagen, erUttaksdag } from './Uttaksdagen';

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

    describe('Uttaksdagen.denne', () => {
        it('skal lage uttaksdag for en ukedag', () => {
            const u = Uttaksdagen.denne(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal kaste feil for helgedag', () => {
            expect(() => Uttaksdagen.denne(LØRDAG)).toThrow();
            expect(() => Uttaksdagen.denne(SØNDAG)).toThrow();
        });
    });

    describe('Uttaksdagen.denneEllerForrige', () => {
        it('skal beholde ukedag uendret', () => {
            const u = Uttaksdagen.denneEllerForrige(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte lørdag til fredag', () => {
            const u = Uttaksdagen.denneEllerForrige(LØRDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte søndag til fredag', () => {
            const u = Uttaksdagen.denneEllerForrige(SØNDAG);
            expect(u.getDato()).toBe(FREDAG);
        });
    });

    describe('Uttaksdagen.denneEllerNeste', () => {
        it('skal beholde ukedag uendret', () => {
            const u = Uttaksdagen.denneEllerNeste(FREDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal flytte lørdag til mandag', () => {
            const u = Uttaksdagen.denneEllerNeste(LØRDAG);
            expect(u.getDato()).toBe(MANDAG);
        });

        it('skal flytte søndag til mandag', () => {
            const u = Uttaksdagen.denneEllerNeste(SØNDAG);
            expect(u.getDato()).toBe(MANDAG);
        });
    });

    describe('Uttaksdagen.forrige / forNeste', () => {
        it('skal gå til forrige uttaktsdag', () => {
            const u = Uttaksdagen.forrige(MANDAG);
            expect(u.getDato()).toBe(FREDAG);
        });

        it('skal gå til neste uttaktsdag', () => {
            const u = Uttaksdagen.neste(FREDAG);
            expect(u.getDato()).toBe(MANDAG);
        });
    });

    describe('Legg til og trekk fra uttaksdager', () => {
        it('skal legge 0 uttaksdager -> samme dato', () => {
            const u = Uttaksdagen.denne(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(0)).toBe(FREDAG);
        });

        it('skal legge 1 uttaksdag fra fredag -> mandag', () => {
            const u = Uttaksdagen.denne(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(1)).toBe(MANDAG);
        });

        it('skal legge til 5 uttaksdager fra fredag -> neste fredag', () => {
            const u = Uttaksdagen.denne(FREDAG);
            expect(u.getDatoAntallUttaksdagerSenere(5)).toBe('2026-01-23');
        });

        it('skal trekke 1 uttaksdag fra mandag -> fredag', () => {
            const u = Uttaksdagen.denne(MANDAG);
            expect(u.getDatoAntallUttaksdagerTidligere(1)).toBe(FREDAG);
        });

        it('skal trekke 5 uttaksdager fra fredag -> forrige fredag', () => {
            const u = Uttaksdagen.denne(FREDAG);
            expect(u.getDatoAntallUttaksdagerTidligere(5)).toBe('2026-01-09');
        });
    });

    describe('getUttaksdagerFremTilDato', () => {
        it('skal vøre 0 dager mellom fredag og fredag', () => {
            const u = Uttaksdagen.denne(FREDAG);
            expect(u.getUttaksdagerFremTilDato(FREDAG)).toBe(0);
        });

        it('skal være en uttaksdag fra fredag til mandag', () => {
            const u = Uttaksdagen.denne(FREDAG);
            expect(u.getUttaksdagerFremTilDato(MANDAG)).toBe(1);
        });
    });
});
