import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { mapPerioderToPermisjonsperiode } from './permisjonsperiodeUtils';

const perioder1: Planperiode[] = [
    {
        id: '1791107651-23530-4156-5672-8510082949258',
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        fom: '2024-04-12',
        tom: '2024-05-02',
        readOnly: false,
    },
    {
        id: '09238903-7649-00572-15237-195982427421289',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        fom: '2024-05-03',
        tom: '2024-08-15',
        readOnly: false,
    },
    {
        id: '089661209-7068-02331-5876-8543970929124',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-08-16',
        tom: '2024-09-26',
        readOnly: false,
    },
    {
        id: '111936683-3265-22855-8575-1519220835469',
        fom: '2024-09-27',
        tom: '2024-10-10',
        readOnly: false,
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
    },
    {
        id: '19249909-1513-07778-7453-3721234202253',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-10-11',
        tom: '2024-10-24',
        readOnly: false,
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
