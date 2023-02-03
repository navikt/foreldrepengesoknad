import { DekningsgradDTO } from 'app/types/DekningsgradDTO';
import { RegistrertBarn } from 'app/types/Person';
import { RettighetType } from 'app/types/RettighetType';
import { SelectableBarn, SelectableBarnType } from './components/barnVelger/BarnVelger';
import { getBarnFraNesteSak, getSelectableBarnOptions } from './velkommenUtils';
import { Sak } from 'app/types/Sak';

const fødselsdato = '2022-01-01';
const fødselsdatoDate = new Date(fødselsdato);
const sak = {
    annenPart: {
        fnr: '123456',
        fornavn: 'Gyldig',
        etternavn: 'Kall',
    },
    barn: [{ type: 'person', fornavn: 'Grønn', etternavn: 'Dinosaur', fødselsdato: fødselsdato, fnr: '123456789' }],
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
};

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
        fødselsdato: new Date('2022-03-01'),
        fnr: '123456780',
    };
    const barnTvilling = {
        fornavn: 'Blå',
        etternavn: 'Dinosaur',
        fødselsdato: new Date('2022-01-02'),
        fnr: '123456788',
        kjønn: 'K',
    };
    const barnMerEnn3ÅrOg3Mnd = {
        fornavn: 'Blå',
        etternavn: 'Dinosaur',
        fødselsdato: new Date('2019-09-21'),
        fnr: '123456788',
        kjønn: 'K',
    };
    it('skal kun returnere ett barn hvis barn fra PDL og barn fra sak er samme', async () => {
        const result = getSelectableBarnOptions([sak], [barnFraPDL] as RegistrertBarn[]);
        expect(result.length).toBe(1);
        expect(result[0].fornavn).toEqual(['Grønn ']);
        expect(result[0].fnr).toEqual(['123456789']);
    });
    it('skal kun returnere to barn hvis barn fra PDL og barn fra sak ikke er samme', async () => {
        const result = getSelectableBarnOptions([sak], [barnFraPDL2] as RegistrertBarn[]);
        expect(result.length).toBe(2);
        expect(result[0].fornavn).toEqual(['Grønn ']);
        expect(result[0].fnr).toEqual(['123456789']);
        expect(result[1].fornavn).toEqual(['Svart']);
        expect(result[1].fnr).toEqual(['123456780']);
    });
    it('skal kun ett valgt hvis to barn fra PDL er født innen en dag fra hverandre', async () => {
        const result = getSelectableBarnOptions([], [barnFraPDL, barnTvilling] as RegistrertBarn[]);
        expect(result.length).toBe(1);
        expect(result[0].fornavn).toEqual(['Grønn ', 'Blå ']);
        expect(result[0].fnr).toEqual(['123456789', '123456788']);
    });
    it('skal ikke vise barna som er over 3 år gamle og 3 måneder', async () => {
        const result = getSelectableBarnOptions([], [barnMerEnn3ÅrOg3Mnd] as RegistrertBarn[]);
        expect(result.length).toBe(0);
    });
    it('skal koble famhendelse fra sak for sak uten barn der barnet fra PDL matcher', async () => {
        const result = getSelectableBarnOptions([{ ...sak, barn: [] }], [barnFraPDL] as RegistrertBarn[]);
        expect(result.length).toBe(1);
        expect(result[0].fornavn).toEqual(['Grønn ']);
        expect(result[0].fnr).toEqual(['123456789']);
    });
    it('skal ikke koble famhendelse fra sak for sak uten barn der barnet fra ikke PDL matcher', async () => {
        const result = getSelectableBarnOptions([{ ...sak, barn: [] }], [barnFraPDL2] as RegistrertBarn[]);
        expect(result.length).toBe(2);
        expect(result[0].fornavn).toEqual(undefined);
        expect(result[0].fnr).toEqual(undefined);
        expect(result[1].fornavn).toEqual(['Svart']);
        expect(result[1].fnr).toEqual(['123456780']);
    });
});

describe('velkommenUtils - getBarnFraNesteSak', () => {
    const selectedBarn = {
        id: '1',
        type: SelectableBarnType.FØDT,
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
                type: SelectableBarnType.FØDT,
                antallBarn: 2,
                sortableDato: new Date('2021-05-01'),
                sak: { saksnummer: '2' } as Sak,
                familiehendelsesdato: new Date('2021-05-01'),
                fnr: ['1235', '1236'],
                startdatoFørsteStønadsperiode: new Date('2021-05-01'),
            },
            {
                id: '3',
                type: SelectableBarnType.UFØDT,
                antallBarn: 1,
                sortableDato: new Date('2023-04-01'),
                sak: { saksnummer: '3' } as Sak,
                familiehendelsesdato: new Date('2023-04-01'),
                startdatoFørsteStønadsperiode: new Date('2023-03-15'),
            },
            {
                id: '3',
                type: SelectableBarnType.UFØDT,
                antallBarn: 1,
                sortableDato: new Date('2024-04-01'),
                sak: { saksnummer: '3' } as Sak,
                familiehendelsesdato: new Date('2024-04-01'),
                startdatoFørsteStønadsperiode: new Date('2024-03-15'),
            },
        ] as SelectableBarn[];
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
                type: SelectableBarnType.FØDT,
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
                type: SelectableBarnType.UFØDT,
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
