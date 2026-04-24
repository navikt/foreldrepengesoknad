import { describe, expect, it, vi } from 'vitest';

import { BrukerRolleSak_fpoversikt } from '@navikt/fp-types';

import { UttakPeriodeBuilder } from './UttakPeriodeBuilder';

const captureMessageMock = vi.hoisted(() => vi.fn());
const setExtraMock = vi.hoisted(() => vi.fn());
const setTagMock = vi.hoisted(() => vi.fn());
const setLevelMock = vi.hoisted(() => vi.fn());
vi.mock('@navikt/fp-observability', () => ({
    captureMessage: captureMessageMock,
    withScope: (
        cb: (scope: {
            setLevel: typeof setLevelMock;
            setTag: typeof setTagMock;
            setExtra: typeof setExtraMock;
        }) => void,
    ) => cb({ setLevel: setLevelMock, setTag: setTagMock, setExtra: setExtraMock }),
}));

const getExtra = (key: string) => {
    const call = setExtraMock.mock.calls.find(([k]) => k === key);
    return call?.[1];
};

// Bruker forelder for å skille på eksisterende og nye perioder.
const lagPeriode = (fom: string, tom: string) => ({
    fom,
    tom,
    forelder: 'MOR' as BrukerRolleSak_fpoversikt,
    flerbarnsdager: false,
});
const lagNyPeriode = (fom: string, tom: string) => ({
    fom,
    tom,
    forelder: 'FAR_MEDMOR' as BrukerRolleSak_fpoversikt,
    flerbarnsdager: false,
});

const SKAL_FORSKYVE = true;

describe('UttakPeriodeBuilder.leggTilUttakPerioder (Ikke forskyv)', () => {
    it('skal legge til ny periode som ikke overlapper eksisterende', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-05')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-10', '2024-01-12')], false);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagNyPeriode('2024-01-10', '2024-01-12'),
        ]);
    });

    it('skal erstatte eksisterende periode når ny overlapper den fullstendig', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-01', '2024-01-31')], false);

        expect(builder.getUttakPerioder()).toEqual([lagNyPeriode('2024-01-01', '2024-01-31')]);
    });

    it('skal erstatte eksisterende periode som ny periode eksakt overlapper', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-05', '2024-01-10')], false);

        expect(builder.getUttakPerioder()).toEqual([lagNyPeriode('2024-01-05', '2024-01-10')]);
    });

    it('skal splitte eksisterende periode i to slik at en får tre perioder', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-10')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-04', '2024-01-05')], false);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-03'),
            lagNyPeriode('2024-01-04', '2024-01-05'),
            lagPeriode('2024-01-08', '2024-01-10'),
        ]);
    });

    it('skal håndtere flere overlappende perioder', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-10', '2024-01-19'),
        ]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-04', '2024-01-12')], false);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-03'),
            lagNyPeriode('2024-01-04', '2024-01-12'),
            lagPeriode('2024-01-15', '2024-01-19'),
        ]);
    });

    it('skal håndtere flere overlappende nye perioder', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-19')]);

        builder.leggTilUttakPerioder(
            [lagNyPeriode('2024-01-05', '2024-01-05'), lagNyPeriode('2024-01-10', '2024-01-11')],
            false,
        );

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagNyPeriode('2024-01-05', '2024-01-05'),
            lagPeriode('2024-01-08', '2024-01-09'),
            lagNyPeriode('2024-01-10', '2024-01-11'),
            lagPeriode('2024-01-12', '2024-01-19'),
        ]);
    });

    it('skal håndtere å legge til flere perioder som er like', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-19')]);

        builder.leggTilUttakPerioder(
            [lagNyPeriode('2024-01-05', '2024-01-08'), lagNyPeriode('2024-01-05', '2024-01-08')],
            false,
        );

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagNyPeriode('2024-01-05', '2024-01-08'),
            lagNyPeriode('2024-01-05', '2024-01-08'),
            lagPeriode('2024-01-09', '2024-01-19'),
        ]);
    });

    it('skal håndtere å fjerne to perioder som er like', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-01', '2024-01-19'),
            lagPeriode('2024-01-01', '2024-01-19'),
        ]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-05', '2024-01-08')], false);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagPeriode('2024-01-01', '2024-01-04'),
            lagNyPeriode('2024-01-05', '2024-01-08'),
            lagPeriode('2024-01-09', '2024-01-19'),
            lagPeriode('2024-01-09', '2024-01-19'),
        ]);
    });

    it('Skal ta hensyn til helgedager når en legger til lagPeriode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-31')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-08', '2024-01-12')], false);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagNyPeriode('2024-01-08', '2024-01-12'),
            lagPeriode('2024-01-15', '2024-01-31'),
        ]);
    });
});

describe('UttakPeriodeBuilder.leggTilUttakPerioder (Forskyv)', () => {
    it('skal dytte eksisterende perioder frem', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-10', '2024-01-15')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-01', '2024-01-05')], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([
            lagNyPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-17', '2024-01-22'),
        ]);
    });

    it('skal dytte overlappende perioder frem', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-03', '2024-01-10')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-01', '2024-01-05')], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([
            lagNyPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-10', '2024-01-17'),
        ]);
    });

    it('skal dytte eksisterende perioder frem når det er flere nye perioder', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-10', '2024-01-10')]);

        builder.leggTilUttakPerioder(
            [lagNyPeriode('2024-01-01', '2024-01-02'), lagNyPeriode('2024-01-03', '2024-01-05')],
            SKAL_FORSKYVE,
        );

        expect(builder.getUttakPerioder()).toEqual([
            lagNyPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-17', '2024-01-17'),
        ]);
    });

    it('Skal ta hensyn til helgedager når en legger til lagPeriode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-31')]);

        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-08', '2024-01-12')], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagNyPeriode('2024-01-08', '2024-01-12'),
            lagPeriode('2024-01-15', '2024-02-07'),
        ]);
    });

    it('Skal velge samme periode som før pluss en dag og så forskyve', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2025-05-09', '2025-05-21'),
            lagPeriode('2025-05-22', '2025-06-11'),
        ]);

        builder.leggTilUttakPerioder([lagNyPeriode('2025-05-09', '2025-05-22')], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([
            lagNyPeriode('2025-05-09', '2025-05-22'), // ny periode
            lagPeriode('2025-05-23', '2025-06-25'), // Eksisterende periode 1 og 2 slått sammen og forskyvd
        ]);
    });
    it('Skal forskyve korrekt når en legger til to like perioder', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-07-01', '2024-07-02'),
            lagPeriode('2024-07-03', '2024-07-15'),
        ]);

        builder.leggTilUttakPerioder(
            [lagNyPeriode('2024-07-03', '2024-07-04'), lagNyPeriode('2024-07-03', '2024-07-04')],
            SKAL_FORSKYVE,
        );

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-07-01', '2024-07-02'),
            lagNyPeriode('2024-07-03', '2024-07-04'),
            lagNyPeriode('2024-07-03', '2024-07-04'),
            lagPeriode('2024-07-05', '2024-07-17'),
        ]);
    });
});

describe('UttakPeriodeBuilder – sortering og mutasjon', () => {
    it('skal returnere sorterte perioder', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-10', '2024-01-12'),
            lagPeriode('2024-01-01', '2024-01-05'),
        ]);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-10', '2024-01-12'),
        ]);
    });

    it('skal ikke eksponere intern mutasjon', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-05')]);

        const result = builder.getUttakPerioder();
        result.push(lagPeriode('2099-01-01', '2099-01-02'));

        expect(builder.getUttakPerioder()).toHaveLength(1);
    });
});

describe('UttakPeriodeBuilder.fjernUttakPerioder (Ikke forskyv)', () => {
    it('skal fjerne en periode som overlapper en del midt inni en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-05', tom: '2024-01-08' }], false);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagPeriode('2024-01-09', '2024-01-10'),
        ]);
    });

    it('skal fjerne en periode som overlapper starten av en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-01', tom: '2024-01-08' }], false);

        expect(builder.getUttakPerioder()).toEqual([lagPeriode('2024-01-09', '2024-01-10')]);
    });

    it('skal fjerne en periode som overlapper slutten av en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-08', tom: '2024-01-15' }], false);

        expect(builder.getUttakPerioder()).toEqual([lagPeriode('2024-01-05', '2024-01-05')]);
    });

    it('skal fjerne en periode som overlapper helt med en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-01', tom: '2024-01-15' }], false);

        expect(builder.getUttakPerioder()).toEqual([]);
    });

    it('skal beholde mellomrom etter fjerning', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagPeriode('2024-01-05', '2024-01-10'),
        ]);

        builder.fjernUttakPerioder([{ fom: '2024-01-04', tom: '2024-01-05' }], false);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-03'),
            lagPeriode('2024-01-08', '2024-01-10'),
        ]);
    });

    it('skal ikke fjerne periode som ikke overlapper med noe', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-11', tom: '2024-01-12' }], false);

        expect(builder.getUttakPerioder()).toEqual([lagPeriode('2024-01-05', '2024-01-10')]);
    });

    it('skal fjerne en periode som overlapper eksakt eksisterende', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-01', tom: '2024-01-10' }], false);

        expect(builder.getUttakPerioder()).toEqual([]);
    });

    it('skal ta hensyn til helgedager når en fjerner lagPeriode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-31')]);

        builder.fjernUttakPerioder([lagPeriode('2024-01-08', '2024-01-12')], false);

        expect(builder.getUttakPerioder()).toEqual([
            lagPeriode('2024-01-01', '2024-01-05'),
            lagPeriode('2024-01-15', '2024-01-31'),
        ]);
    });
});

describe('UttakPeriodeBuilder.fjernUttakPerioder (Forskyv)', () => {
    it('skal fjerne en periode som overlapper en del midt inni en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-05', tom: '2024-01-08' }], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([lagPeriode('2024-01-01', '2024-01-08')]);
    });

    it('skal fjerne en periode som overlapper starten av en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-01', tom: '2024-01-08' }], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([lagPeriode('2024-01-01', '2024-01-02')]);
    });

    it('skal fjerne en periode som overlapper slutten av en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-08', tom: '2024-01-15' }], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([lagPeriode('2024-01-05', '2024-01-05')]);
    });

    it('skal fjerne en periode som overlapper helt med en eksisterende periode', () => {
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-05', '2024-01-10')]);

        builder.fjernUttakPerioder([{ fom: '2024-01-01', tom: '2024-01-15' }], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([]);
    });

    it('skal forskyve siste periode bakover og slå sammen', () => {
        const builder = new UttakPeriodeBuilder([
            lagPeriode('2024-01-01', '2024-01-04'),
            lagPeriode('2024-01-05', '2024-01-10'),
        ]);

        builder.fjernUttakPerioder([lagNyPeriode('2024-01-04', '2024-01-05')], SKAL_FORSKYVE);

        expect(builder.getUttakPerioder()).toEqual([lagPeriode('2024-01-01', '2024-01-08')]);
    });
});

describe('UttakPeriodeBuilder.getUttakPerioder - validering av ugyldig overlapp', () => {
    it('loggar ikkje når planen er gyldig', () => {
        captureMessageMock.mockClear();
        setExtraMock.mockClear();
        const builder = new UttakPeriodeBuilder([lagPeriode('2024-01-01', '2024-01-05')]);
        builder.leggTilUttakPerioder([lagNyPeriode('2024-01-10', '2024-01-12')], false);

        builder.getUttakPerioder();

        expect(captureMessageMock).not.toHaveBeenCalled();
    });

    it('loggar ikkje for gyldig samtidig uttak (ulik forelder, samtidigUttak satt)', () => {
        captureMessageMock.mockClear();
        setExtraMock.mockClear();
        const builder = new UttakPeriodeBuilder([
            { ...lagPeriode('2024-01-01', '2024-01-05'), kontoType: 'MØDREKVOTE', samtidigUttak: 100 },
            { ...lagNyPeriode('2024-01-01', '2024-01-05'), kontoType: 'FEDREKVOTE', samtidigUttak: 100 },
        ]);

        builder.getUttakPerioder();

        expect(captureMessageMock).not.toHaveBeenCalled();
    });

    it('loggar når planen inneheld ein FERIE og ein FELLES på same dag, med full diagnostikk', () => {
        captureMessageMock.mockClear();
        setExtraMock.mockClear();
        setTagMock.mockClear();
        setLevelMock.mockClear();

        const opprinnelig = [
            { ...lagPeriode('2026-12-30', '2026-12-30'), kontoType: 'FELLESPERIODE' as const },
            { ...lagPeriode('2026-12-30', '2026-12-30'), utsettelseÅrsak: 'LOVBESTEMT_FERIE' as const },
        ];
        const builder = new UttakPeriodeBuilder(opprinnelig, 'liste');
        const nyPeriode = { ...lagNyPeriode('2026-12-31', '2026-12-31'), kontoType: 'FELLESPERIODE' as const };
        builder.leggTilUttakPerioder([nyPeriode], false);

        builder.getUttakPerioder();

        expect(captureMessageMock).toHaveBeenCalledTimes(1);
        expect(captureMessageMock).toHaveBeenCalledWith(
            'UttakPeriodeBuilder produserte ugyldig overlappende perioder',
            'warning',
        );

        expect(setLevelMock).toHaveBeenCalledWith('warning');
        expect(setTagMock).toHaveBeenCalledWith('feiltype', 'uttaksplan-builder-overlapp');
        expect(setTagMock).toHaveBeenCalledWith('builderKilde', 'liste');

        expect(getExtra('builderKilde')).toBe('liste');
        expect(getExtra('antallUgyldigeOverlapp')).toBe(1);

        const par = getExtra('ugyldigeOverlappPar');
        expect(par).toHaveLength(1);
        expect(par[0]).toMatchObject({
            a: { fom: '2026-12-30', tom: '2026-12-30' },
            b: { fom: '2026-12-30', tom: '2026-12-30' },
        });

        const opp = getExtra('opprinneligPerioder');
        expect(opp).toHaveLength(2);
        expect(opp[0]).toMatchObject({ fom: '2026-12-30', tom: '2026-12-30', kontoType: 'FELLESPERIODE' });
        expect(opp[1]).toMatchObject({ fom: '2026-12-30', tom: '2026-12-30', utsettelseÅrsak: 'LOVBESTEMT_FERIE' });

        const resultat = getExtra('resultatPerioder');
        expect(resultat.length).toBeGreaterThanOrEqual(2);

        const operasjonsLogg = getExtra('operasjonsLogg');
        expect(operasjonsLogg).toHaveLength(1);
        expect(operasjonsLogg[0]).toMatchObject({
            operasjon: 'leggTilUttakPerioder',
            forskyvPerioder: false,
        });
        expect(operasjonsLogg[0].nyePerioder).toHaveLength(1);
        expect(operasjonsLogg[0].nyePerioder[0]).toMatchObject({ fom: '2026-12-31', tom: '2026-12-31' });
    });
});
