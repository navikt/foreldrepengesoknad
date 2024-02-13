import { DekningsgradDTO, Sak } from '@navikt/fp-common';
import { getBarnFraNesteSak, getSelectableBarnOptions } from './velkommenUtils';
import { RettighetType } from '@navikt/fp-common/src/common/types/RettighetType';
import { ValgtBarn, ValgtBarnType } from 'app/types/ValgtBarn';
import { SøkerBarn } from '@navikt/fp-types';

const fødselsdato = '2022-01-01';
const fødselsdatoDate = fødselsdato;
const sak = {
    dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
    familiehendelse: {
        fødselsdato: fødselsdato,
        antallBarn: 1,
    },
    gjeldendeVedtak: { perioder: [] },
    harAnnenForelderTilsvarendeRettEØS: false,
    gjelderAdopsjon: false,
    kanSøkeOmEndring: true,
    morUføretrygd: false,
    rettighetType: RettighetType.BEGGE_RETT,
    sakAvsluttet: false,
    sakTilhørerMor: true,
    saksnummer: '123456',
    ønskerJustertUttakVedFødsel: false,
    sisteSøknadMottattDato: '2022-05-06',
    åpenBehandling: undefined,
    annenPart: { fnr: '123456789' },
    barn: [{ fnr: '987654321' }],
} as Sak;

describe('velkommenUtils - getSelectableBarnOptions', () => {
    const barnFraPDL = {
        fornavn: 'Grønn',
        etternavn: 'Dinosaur',
        fødselsdato: fødselsdatoDate,
        fnr: '123456789',
        kjønn: 'K',
    };
    const barnFraPDL2 = {
        fornavn: 'Svart',
        etternavn: 'Edderkopp',
        fødselsdato: '2022-03-01',
        fnr: '123456780',
    };
    const barnTvilling = {
        fornavn: 'Blå',
        etternavn: 'Dinosaur',
        fødselsdato: '2022-01-02',
        fnr: '123456788',
        kjønn: 'K',
    };
    const barnMerEnn3ÅrOg3Mnd = {
        fornavn: 'Blå',
        etternavn: 'Dinosaur',
        fødselsdato: '2019-09-21',
        fnr: '123456788',
        kjønn: 'K',
    };
    it('skal kun returnere ett barn hvis barn fra PDL og sak har fødselsdato', async () => {
        const result = getSelectableBarnOptions([sak], [barnFraPDL] as SøkerBarn[]);
        expect(result.length).toBe(1);
        expect(result[0].fornavn).toEqual(['Grønn ']);
        expect(result[0].fnr).toEqual(['123456789']);
    });
    it('skal returnere to barn hvis barn fra PDL og barn ikke har samme fødselsdato som saken ', async () => {
        const result = getSelectableBarnOptions([sak], [barnFraPDL2] as SøkerBarn[]);
        expect(result.length).toBe(2);
        expect(result[0].fornavn).toEqual(undefined);
        expect(result[0].fnr).toEqual(undefined);
        expect(result[1].fornavn).toEqual(['Svart']);
        expect(result[1].fnr).toEqual(['123456780']);
    });
    it('skal returnere kun ett valgt hvis to barn fra PDL er født innen en dag fra hverandre', async () => {
        const result = getSelectableBarnOptions([], [barnFraPDL, barnTvilling] as SøkerBarn[]);
        expect(result.length).toBe(1);
        expect(result[0].fornavn).toEqual(['Grønn ', 'Blå ']);
        expect(result[0].fnr).toEqual(['123456789', '123456788']);
    });
    it('skal ikke vise barna fra pdl som er over 3 år gamle og 3 måneder', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise barna fra pdl som er døde for mer enn 3 måneder siden', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise barna fra pdl som er dødfødte for mer enn 3 måneder siden', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal  vise barna fra pdl som er døde for mer enn 3 måneder siden og har en sak', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal  vise barna fra pdl som er dødfødte for mer enn 3 måneder siden og har en sak', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise tvillinger fra pdl hvis en er død for mer enn 3 måneder siden', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise tvillinger fra pdl hvis en dødfødte for mer enn 3 måneder siden', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal vise tvillinger fra pdl hvis de har en sak og en er død for mer enn 3 måneder siden', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal vise tvillinger fra pdl hvis de har en sak og en er dødfødt for mer enn 3 måneder siden', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal ikke vise PDL barn som har avsluttet sak', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as SøkerBarn[]);
        expect(result.length).toBe(0);
    });
});

describe('velkommenUtils - getBarnFraNesteSak', () => {
    const selectedBarn = {
        id: '1',
        type: ValgtBarnType.FØDT,
        antallBarn: 1,
        sortableDato: new Date('2022-06-01'),
        sak: { saksnummer: '1' } as Sak,
        familiehendelsesdato: new Date('2022-06-01'),
        fnr: ['1234'],
        alleBarnaLever: true,
    };
    it('skal returnere det første barnet etter barnet som er valgt', async () => {
        const alleBarna = [
            selectedBarn,
            {
                id: '2',
                type: ValgtBarnType.FØDT,
                antallBarn: 2,
                sortableDato: new Date('2021-05-01'),
                sak: { saksnummer: '2' } as Sak,
                familiehendelsesdato: new Date('2021-05-01'),
                fnr: ['1235', '1236'],
                startdatoFørsteStønadsperiode: new Date('2021-05-01'),
            },
            {
                id: '3',
                type: ValgtBarnType.UFØDT,
                antallBarn: 1,
                sortableDato: new Date('2023-04-01'),
                sak: { saksnummer: '3' } as Sak,
                familiehendelsesdato: new Date('2023-04-01'),
                startdatoFørsteStønadsperiode: new Date('2023-03-15'),
            },
            {
                id: '3',
                type: ValgtBarnType.UFØDT,
                antallBarn: 1,
                sortableDato: new Date('2024-04-01'),
                sak: { saksnummer: '3' } as Sak,
                familiehendelsesdato: new Date('2024-04-01'),
                startdatoFørsteStønadsperiode: new Date('2024-03-15'),
            },
        ] as ValgtBarn[];
        const res = getBarnFraNesteSak(selectedBarn, alleBarna);
        expect(res?.fnr).toEqual(undefined);
        expect(res?.familiehendelsesdato).toEqual(new Date('2023-04-01'));
        expect(res?.startdatoFørsteStønadsperiode).toEqual(new Date('2023-03-15'));
    });
    it('skal ikke returnere noe hvis bare eldre barn finnes', async () => {
        const alleBarna = [
            selectedBarn,
            {
                id: '2',
                type: ValgtBarnType.FØDT,
                antallBarn: 2,
                sortableDato: new Date('2021-05-01'),
                sak: { saksnummer: '2' } as Sak,
                familiehendelsesdato: new Date('2021-05-01'),
                fnr: ['1235', '1236'],
                startdatoFørsteStønadsperiode: new Date('2021-05-01'),
                alleBarnaLever: true,
            },
            {
                id: '3',
                type: ValgtBarnType.UFØDT,
                antallBarn: 1,
                sortableDato: new Date('2021-04-01'),
                sak: { saksnummer: '3' } as Sak,
                familiehendelsesdato: new Date('2021-04-01'),
                startdatoFørsteStønadsperiode: new Date('2021-03-15'),
                alleBarnaLever: true,
            },
        ];
        const res = getBarnFraNesteSak(selectedBarn, alleBarna);
        expect(res).toEqual(undefined);
    });
    it('skal ikke returnere seg selv', async () => {
        const alleBarna = [selectedBarn];
        const res = getBarnFraNesteSak(selectedBarn, alleBarna);
        expect(res).toEqual(undefined);
    });
});
