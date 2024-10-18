import { Forelder, StønadskontoType } from '@navikt/fp-constants';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { mapPerioderToPermisjonsperiode } from './permisjonsperiodeUtils';

const perioder1: Planperiode[] = [
    {
        id: '1791107651-23530-4156-5672-8510082949258',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.ForeldrepengerFørFødsel,
        fom: '2024-04-12',
        tom: '2024-05-02',
        gjelderAnnenPart: false,
    },
    {
        id: '09238903-7649-00572-15237-195982427421289',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Mødrekvote,
        fom: '2024-05-03',
        tom: '2024-08-15',
        gjelderAnnenPart: false,
    },
    {
        id: '089661209-7068-02331-5876-8543970929124',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        fom: '2024-08-16',
        tom: '2024-09-26',
        gjelderAnnenPart: false,
    },
    {
        id: '111936683-3265-22855-8575-1519220835469',
        fom: '2024-09-27',
        tom: '2024-10-10',
        gjelderAnnenPart: false,
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
    },
    {
        id: '19249909-1513-07778-7453-3721234202253',
        forelder: Forelder.mor,
        kontoType: StønadskontoType.Fellesperiode,
        fom: '2024-10-11',
        tom: '2024-10-24',
        gjelderAnnenPart: false,
    },
];

describe('Skal gruppere perioder på søker og ikke kvote', () => {
    it('Skal gruppere mors perioder i tid hun er hjemme uavbrutt og ikke kvoter', () => {
        const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder1, '2024-05-03');

        expect(permisjonsperioder.length).toBe(4);

        expect(permisjonsperioder[0].forelder).toEqual(Forelder.mor);
        expect(permisjonsperioder[0].tidsperiode).toEqual({
            fom: perioder1[0].fom,
            tom: perioder1[0].tom,
        });

        expect(permisjonsperioder[1].forelder).toEqual(Forelder.mor);
        expect(permisjonsperioder[1].tidsperiode).toEqual({
            fom: perioder1[1].fom,
            tom: perioder1[2].tom,
        });

        expect(permisjonsperioder[2].forelder).toEqual(undefined);
        expect(permisjonsperioder[2].tidsperiode).toEqual({
            fom: perioder1[3].fom,
            tom: perioder1[3].tom,
        });

        expect(permisjonsperioder[3].forelder).toEqual(Forelder.mor);
        expect(permisjonsperioder[3].tidsperiode).toEqual({
            fom: perioder1[4].fom,
            tom: perioder1[4].tom,
        });
    });
});
