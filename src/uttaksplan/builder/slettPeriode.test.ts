import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { slettPeriode } from './slettPeriode';
import MockDate from 'mockdate';

const perioder: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-14'),
            tom: new Date('2022-05-04'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-05'),
            tom: new Date('2022-08-17'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-18'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

const perioder2: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-11'),
            tom: new Date('2022-05-31'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-06-01'),
            tom: new Date('2022-08-09'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-10'),
            tom: new Date('2022-08-23'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-24'),
            tom: new Date('2022-08-30'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '5',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-31'),
            tom: new Date('2022-10-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

describe('Test av slett periode', () => {
    it('Skal sette inn hull første seks uker og periode uten uttak etter', () => {
        const slettetPeriode = perioder[1];

        const result = slettPeriode({
            perioder,
            slettetPeriode,
            familiehendelsesdato: new Date('2022-05-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
        });

        expect(result.length).toEqual(4);
        expect(result[1].tidsperiode).toEqual({ fom: new Date('2022-05-05'), tom: new Date('2022-06-15') });
        expect(result[1].type).toEqual(Periodetype.Hull);
        expect(result[2].tidsperiode).toEqual({ fom: new Date('2022-06-16'), tom: new Date('2022-08-17') });
        expect(result[2].type).toEqual(Periodetype.PeriodeUtenUttak);
    });

    it('Skal sette inn periode uten uttak etter sletting', () => {
        const slettetPeriode = perioder2[3];

        const result = slettPeriode({
            perioder: perioder2,
            slettetPeriode,
            familiehendelsesdato: new Date('2022-05-11'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
        });

        expect(result.length).toEqual(5);
        expect(result[3].tidsperiode).toEqual(slettetPeriode.tidsperiode);
        expect(result[3].type).toEqual(Periodetype.PeriodeUtenUttak);
    });
});

const perioderFar: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-07-25'),
            tom: new Date('2022-08-01'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-02'),
            tom: new Date('2022-08-08'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote,
    },
    {
        id: '3',
        type: Periodetype.PeriodeUtenUttak,
        tidsperiode: {
            fom: new Date('2022-08-11'),
            tom: new Date('2022-09-11'),
        },
    },
    {
        id: '4',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-12'),
            tom: new Date('2022-09-19'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote,
    },
    {
        id: '5',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-09-20'),
            tom: new Date('2022-10-25'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote,
    },
];

describe('Test av slett periode for far - etter WLB', () => {
    beforeAll(() => {
        MockDate.set('2022-08-02');
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal sette inn periode uten uttak hvis slettet periode er innenfor de første seks ukene.', () => {
        const slettetPeriode = perioderFar[1];

        const result = slettPeriode({
            perioder: perioderFar,
            slettetPeriode,
            familiehendelsesdato: new Date('2022-08-02'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: true,
        });

        expect(result.length).toEqual(5);
        expect(result[1].tidsperiode).toEqual({
            fom: slettetPeriode.tidsperiode.fom,
            tom: slettetPeriode.tidsperiode.tom,
        });
        expect(result[1].type).toEqual(Periodetype.PeriodeUtenUttak);
    });

    it('Skal sette inn periode uten uttak og hull (tapte dager) hvis slettet starter innenfor de første seks ukene men slutter etter de første seks ukene.', () => {
        const slettetPeriode = perioderFar[3];

        const result = slettPeriode({
            perioder: perioderFar,
            slettetPeriode,
            familiehendelsesdato: new Date('2022-08-02'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: true,
        });

        expect(result.length).toEqual(6);
        expect(result[3].tidsperiode).toEqual({
            fom: slettetPeriode.tidsperiode.fom,
            tom: new Date('2022-09-12'),
        });
        expect(result[3].type).toEqual(Periodetype.PeriodeUtenUttak);
        expect(result[4].tidsperiode).toEqual({
            fom: new Date('2022-09-13'),
            tom: slettetPeriode.tidsperiode.tom,
        });
        expect(result[4].type).toEqual(Periodetype.Hull);
    });
});

describe('Test av slett periode for far - før WLB', () => {
    beforeAll(() => {
        MockDate.set('2022-08-01');
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal sette inn hull (ubegrunnet opphold) hvis slettet periode er innenfor de første seks ukene og før WLB regler gjelder.', () => {
        const slettetPeriode = perioderFar[1];

        const result = slettPeriode({
            perioder: perioderFar,
            slettetPeriode,
            familiehendelsesdato: new Date('2022-08-02'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: true,
        });

        expect(result.length).toEqual(5);
        expect(result[1].tidsperiode).toEqual({
            fom: slettetPeriode.tidsperiode.fom,
            tom: slettetPeriode.tidsperiode.tom,
        });
        expect(result[1].type).toEqual(Periodetype.Hull);
    });
});
