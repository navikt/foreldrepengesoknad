import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import UttaksplanbuilderNew from './UttaksplanbuilderNew';

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
    it('Skal legge til perioden på slutten av perioder', () => {
        const nyPeriode: Periode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-08-15'),
                tom: new Date('2022-10-07'),
            },
            forelder: Forelder.mor,
            konto: StønadskontoType.Fellesperiode,
        };

        const result = UttaksplanbuilderNew.leggTilPeriode(perioder, nyPeriode);

        expect(result.length).toBe(4);
        expect(result[3]).toEqual(nyPeriode);
    });
});
