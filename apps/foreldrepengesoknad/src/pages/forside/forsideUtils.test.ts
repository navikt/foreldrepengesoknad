import dayjs from 'dayjs';

import { FpBarnDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';

import { getSelectableBarnOptions } from './forsideUtils';

const fødselsdato = dayjs().subtract(1, 'year').format('YYYY-MM-DD');
const sak = {
    dekningsgrad: 'HUNDRE',
    familiehendelse: {
        fødselsdato: fødselsdato,
        antallBarn: 1,
    },
    gjeldendeVedtak: { perioder: [] },
    harAnnenForelderTilsvarendeRettEØS: false,
    gjelderAdopsjon: false,
    kanSøkeOmEndring: true,
    morUføretrygd: false,
    rettighetType: 'BEGGE_RETT',
    sakAvsluttet: false,
    sakTilhørerMor: true,
    saksnummer: '123456',
    ønskerJustertUttakVedFødsel: false,
    oppdatertTidspunkt: '2022-05-06',
    åpenBehandling: undefined,
    annenPart: { fnr: '123456789' },
    barn: [{ fnr: '987654321' }],
    forelder: 'MOR',
} satisfies FpSak_fpoversikt;

describe('forsideUtils - getSelectableBarnOptions', () => {
    const barnFraPDL = {
        navn: { fornavn: 'Grønn', etternavn: 'Dinosaur' },
        fødselsdato: fødselsdato,
        fnr: '123456789',
        kjønn: 'K',
    } satisfies FpBarnDto_fpoversikt;
    const barnFraPDL2 = {
        navn: { fornavn: 'Svart', etternavn: 'Edderkopp' },
        fødselsdato: dayjs(fødselsdato).add(2, 'month').format('YYYY-MM-DD'),
        fnr: '123456780',
        kjønn: 'K',
    } satisfies FpBarnDto_fpoversikt;
    const barnTvilling = {
        navn: { fornavn: 'Blå', etternavn: 'Dinosaur' },
        fødselsdato: dayjs(fødselsdato).add(1, 'day').format('YYYY-MM-DD'),
        fnr: '123456788',
        kjønn: 'K',
    } satisfies FpBarnDto_fpoversikt;
    const barnMerEnn3ÅrOg3Mnd = {
        navn: { fornavn: 'Blå', etternavn: 'Dinosaur' },
        fødselsdato: '2019-09-21',
        fnr: '123456788',
        kjønn: 'K',
    } satisfies FpBarnDto_fpoversikt;
    it('skal kun returnere ett barn hvis barn fra PDL og sak har fødselsdato', () => {
        const result = getSelectableBarnOptions([sak], [barnFraPDL]);
        expect(result.length).toBe(1);
        expect(result[0]!.fornavn).toEqual(['Grønn ']);
        expect(result[0]!.fnr).toEqual(['123456789']);
    });
    it('skal returnere to barn hvis barn fra PDL og barn ikke har samme fødselsdato som saken', () => {
        const result = getSelectableBarnOptions([sak], [barnFraPDL2]);
        expect(result.length).toBe(2);
        expect(result[0]!.fornavn).toEqual(undefined);
        expect(result[0]!.fnr).toEqual(undefined);
        expect(result[1]!.fornavn).toEqual(['Svart']);
        expect(result[1]!.fnr).toEqual(['123456780']);
    });
    it('skal returnere kun ett valgt hvis to barn fra PDL er født innen en dag fra hverandre', () => {
        const result = getSelectableBarnOptions([], [barnFraPDL, barnTvilling]);
        expect(result.length).toBe(1);
        expect(result[0]!.fornavn).toEqual(['Grønn ', 'Blå ']);
        expect(result[0]!.fnr).toEqual(['123456789', '123456788']);
    });
    it('skal ikke vise barna fra pdl som er over 3 år gamle og 3 måneder', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise barna fra pdl som er døde for mer enn 3 måneder siden', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise barna fra pdl som er dødfødte for mer enn 3 måneder siden', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal  vise barna fra pdl som er døde for mer enn 3 måneder siden og har en sak', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal  vise barna fra pdl som er dødfødte for mer enn 3 måneder siden og har en sak', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise tvillinger fra pdl hvis en er død for mer enn 3 måneder siden', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise tvillinger fra pdl hvis en dødfødte for mer enn 3 måneder siden', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal vise tvillinger fra pdl hvis de har en sak og en er død for mer enn 3 måneder siden', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal vise tvillinger fra pdl hvis de har en sak og en er dødfødt for mer enn 3 måneder siden', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise PDL barn som har avsluttet sak', () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd]);
        expect(result.length).toBe(0);
    });
});
