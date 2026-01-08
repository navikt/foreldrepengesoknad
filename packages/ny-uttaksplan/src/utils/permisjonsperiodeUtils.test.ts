import { Uttaksplanperiode, erVanligUttakPeriode } from '../types/UttaksplanPeriode';
import { mapUttaksplanperioderTilPeriodemap } from './permisjonsperiodeUtils';

const perioder1: Uttaksplanperiode[] = [
    {
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        fom: '2024-04-12',
        tom: '2024-05-02',
    },
    {
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        fom: '2024-05-03',
        tom: '2024-08-15',
    },
    {
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-08-16',
        tom: '2024-09-26',
    },
    {
        fom: '2024-09-27',
        tom: '2024-10-10',
        hullType: 'PERIODE_UTEN_UTTAK',
    },
    {
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-10-11',
        tom: '2024-10-24',
    },
];

describe('Skal gruppere perioder på søker og ikke kvote', () => {
    it('Skal gruppere mors perioder i tid hun er hjemme uavbrutt og ikke kvoter', () => {
        const permisjonsperioder = mapUttaksplanperioderTilPeriodemap(perioder1, '2024-05-03');

        const perioder = Array.from(permisjonsperioder.values());
        expect(perioder.length).toBe(4);

        const periode1 = erVanligUttakPeriode(perioder[0]![0]!) ? perioder[0]![0] : undefined;
        expect(periode1?.forelder).toEqual('MOR');

        const periode2 = erVanligUttakPeriode(perioder[1]![0]!) ? perioder[1]![0] : undefined;
        expect(periode2?.forelder).toEqual('MOR');

        const periode3 = erVanligUttakPeriode(perioder[2]![0]!) ? perioder[2]![0] : undefined;
        expect(periode3?.forelder).toEqual(undefined);

        const periode4 = erVanligUttakPeriode(perioder[3]![0]!) ? perioder[3]![0] : undefined;
        expect(periode4?.forelder).toEqual('MOR');
    });
});
