import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import UttaksplanbuilderNew from './UttaksplanbuilderNew';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

const perioder: Periode[] = [
    {
        id: '1',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-04-11'),
            tom: new Date('2022-04-29'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
    },
    {
        id: '2',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-05-02'),
            tom: new Date('2022-08-12'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
    },
    {
        id: '3',
        type: Periodetype.Uttak,
        tidsperiode: {
            fom: new Date('2022-08-15'),
            tom: new Date('2022-10-07'),
        },
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
    },
];

describe('Uttaksplanbuilder tester', () => {
    it('Å legge til en utsettelse skal ikke forskyve en annen utsettelse', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Utsettelse,
            tidsperiode: {
                fom: new Date('2022-08-15'),
                tom: new Date('2022-08-26'),
            },
            forelder: Forelder.mor,
            erArbeidstaker: true,
            årsak: UtsettelseÅrsakType.Arbeid,
        };

        const result = UttaksplanbuilderNew(perioder, new Date('2022-05-02')).leggTilPeriode(nyPeriode);

        expect(result.length).toBe(4);
        expect(result[2]).toEqual(nyPeriode);

        const nyPeriode2: Periode = {
            id: '4',
            type: Periodetype.Utsettelse,
            tidsperiode: {
                fom: new Date('2022-05-23'),
                tom: new Date('2022-05-27'),
            },
            forelder: Forelder.mor,
            erArbeidstaker: true,
            årsak: UtsettelseÅrsakType.Arbeid,
        };

        const result2 = UttaksplanbuilderNew(result, new Date('2022-05-02')).leggTilPeriode(nyPeriode2);

        expect(result2.length).toBe(7);
        expect(result2[2]).toEqual(nyPeriode2);
        expect(result2[4]).toEqual(nyPeriode);
        expect(result2[4].tidsperiode).toEqual({ fom: new Date('2022-08-15'), tom: new Date('2022-08-26') });
    });
});
