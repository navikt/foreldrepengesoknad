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

const perioder3: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-07-21'),
            tom: new Date('2022-08-04'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-05'),
            tom: new Date('2022-09-05'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-05'),
            tom: new Date('2022-08-19'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.Fedrekvote,
        ønskerSamtidigUttak: true,
        erMorForSyk: false,
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
            erFarEllerMedmor: false,
            termindato: undefined,
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
            erFarEllerMedmor: false,
            termindato: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[3].tidsperiode).toEqual(slettetPeriode.tidsperiode);
        expect(result[3].type).toEqual(Periodetype.PeriodeUtenUttak);
    });
    it('Skal ikke sette inn hull periode eller periode uten uttak hvis periode som slettes er far/medmors uttak rundt fødsel ', () => {
        MockDate.set('2022-08-02');
        const slettetPeriode = perioder3[2];

        const result = slettPeriode({
            perioder: perioder3,
            slettetPeriode,
            familiehendelsesdato: new Date('2022-08-05'),
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            erFarEllerMedmor: true,
            termindato: undefined,
        });

        expect(result.length).toEqual(2);
        MockDate.reset();
    });
});
