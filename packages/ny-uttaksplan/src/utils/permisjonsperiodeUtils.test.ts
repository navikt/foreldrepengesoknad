import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { mapPerioderToPermisjonsperiode } from './permisjonsperiodeUtils';

const perioder1: Planperiode[] = [
    {
        erAnnenPartEøs: false,
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        fom: '2024-04-12',
        tom: '2024-05-02',
    },
    {
        erAnnenPartEøs: false,
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        fom: '2024-05-03',
        tom: '2024-08-15',
    },
    {
        erAnnenPartEøs: false,
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-08-16',
        tom: '2024-09-26',
    },
    {
        erAnnenPartEøs: false,
        fom: '2024-09-27',
        tom: '2024-10-10',
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
    },
    {
        erAnnenPartEøs: false,
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-10-11',
        tom: '2024-10-24',
    },
];

describe('Skal gruppere perioder på søker og ikke kvote', () => {
    it('Skal gruppere mors perioder i tid hun er hjemme uavbrutt og ikke kvoter', () => {
        const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder1, '2024-05-03');

        expect(permisjonsperioder.length).toBe(4);

        expect(permisjonsperioder[0]!.forelder).toEqual('MOR');
        expect(permisjonsperioder[0]!.tidsperiode).toEqual({
            fom: perioder1[0]!.fom,
            tom: perioder1[0]!.tom,
        });

        expect(permisjonsperioder[1]!.forelder).toEqual('MOR');
        expect(permisjonsperioder[1]!.tidsperiode).toEqual({
            fom: perioder1[1]!.fom,
            tom: perioder1[2]!.tom,
        });

        expect(permisjonsperioder[2]!.forelder).toEqual(undefined);
        expect(permisjonsperioder[2]!.tidsperiode).toEqual({
            fom: perioder1[3]!.fom,
            tom: perioder1[3]!.tom,
        });

        expect(permisjonsperioder[3]!.forelder).toEqual('MOR');
        expect(permisjonsperioder[3]!.tidsperiode).toEqual({
            fom: perioder1[4]!.fom,
            tom: perioder1[4]!.tom,
        });
    });
});
