import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { slåSammenLikePerioder } from './uttaksplanbuilderUtils';

const perioder: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-07-21'),
            tom: new Date('2022-08-31'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.AktivitetsfriKvote,
        erMorForSyk: false,
        gradert: false,
        ønskerFlerbarnsdager: false,
        ønskerSamtidigUttak: false,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-09-01'),
            tom: new Date('2022-09-14'),
        },
        forelder: Forelder.farMedmor,
        konto: StønadskontoType.AktivitetsfriKvote,
        erMorForSyk: false,
        gradert: false,
        ønskerFlerbarnsdager: false,
        ønskerSamtidigUttak: false,
    },
];

describe('UttaksplanbuilderUtils tester', () => {
    it('slåSammenLikePerioder - skal slå sammen like perioder riktig', () => {
        const result = slåSammenLikePerioder(perioder, new Date('2022-07-21'));
        expect(result.length).toEqual(1);
        expect(result[0].tidsperiode.fom).toBe(perioder[0].tidsperiode.fom);
        expect(result[0].tidsperiode.tom).toBe(perioder[1].tidsperiode.tom);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen like perioder hvis det er en dag imellom de', () => {
        const perioder2 = [
            perioder[0],
            { ...perioder[1], tidsperiode: { fom: new Date('2022-09-01'), tom: perioder[1].tidsperiode.tom } },
        ];
        const result = slåSammenLikePerioder(perioder2, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellige foreldre', () => {
        const perioder3 = [perioder[0], { ...perioder[1], forelder: Forelder.mor }];
        const result = slåSammenLikePerioder(perioder3, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig konto', () => {
        const perioder4 = [perioder[0], { ...perioder[1], konto: StønadskontoType.Fedrekvote }];
        const result = slåSammenLikePerioder(perioder4, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig samtidig uttak verdi', () => {
        const perioder5 = [perioder[0], { ...perioder[1], samtidigUttak: true }];
        const result = slåSammenLikePerioder(perioder5, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig gradering verdi', () => {
        const perioder6 = [perioder[0], { ...perioder[1], gradert: true }];
        const result = slåSammenLikePerioder(perioder6, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig ønskerFlerbarnsdager verdi', () => {
        const perioder7 = [perioder[0], { ...perioder[1], ønskerFlerbarnsdager: true }];
        const result = slåSammenLikePerioder(perioder7, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
    it('slåSammenLikePerioder - skal ikke slå sammen perioder med forskjellig erMorForSyk verdi', () => {
        const perioder8 = [perioder[0], { ...perioder[1], ønskerFlerbarnsdager: true }];
        const result = slåSammenLikePerioder(perioder8, new Date('2022-07-21'));
        expect(result.length).toEqual(2);
    });
});
