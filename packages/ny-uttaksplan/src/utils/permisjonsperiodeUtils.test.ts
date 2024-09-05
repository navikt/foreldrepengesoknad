import { Forelder, Periode, Periodetype, StønadskontoType } from '@navikt/fp-common';
import { formatDateIso } from '@navikt/fp-utils';

import { mapPerioderToPermisjonsperiode } from './permisjonsperiodeUtils';

const perioder1: Periode[] = [
    {
        id: '1791107651-23530-4156-5672-8510082949258',
        type: Periodetype.Uttak,
        forelder: Forelder.mor,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        tidsperiode: {
            fom: new Date('2024-04-12T00:00:00.000Z'),
            tom: new Date('2024-05-02T00:00:00.000Z'),
        },
    },
    {
        id: '09238903-7649-00572-15237-195982427421289',
        type: Periodetype.Uttak,
        forelder: Forelder.mor,
        konto: StønadskontoType.Mødrekvote,
        tidsperiode: {
            fom: new Date('2024-05-03T00:00:00.000Z'),
            tom: new Date('2024-08-15T00:00:00.000Z'),
        },
        ønskerSamtidigUttak: false,
        gradert: false,
    },
    {
        id: '089661209-7068-02331-5876-8543970929124',
        type: Periodetype.Uttak,
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
        tidsperiode: {
            fom: new Date('2024-08-16T00:00:00.000Z'),
            tom: new Date('2024-09-26T00:00:00.000Z'),
        },
        erArbeidstaker: false,
        gradert: false,
        orgnumre: [],
        ønskerSamtidigUttak: false,
    },
    {
        id: '111936683-3265-22855-8575-1519220835469',
        type: Periodetype.PeriodeUtenUttak,
        tidsperiode: {
            fom: new Date('2024-09-27T00:00:00.000Z'),
            tom: new Date('2024-10-10T00:00:00.000Z'),
        },
    },
    {
        id: '19249909-1513-07778-7453-3721234202253',
        type: Periodetype.Uttak,
        forelder: Forelder.mor,
        konto: StønadskontoType.Fellesperiode,
        tidsperiode: {
            fom: new Date('2024-10-11T00:00:00.000Z'),
            tom: new Date('2024-10-24T00:00:00.000Z'),
        },
        erArbeidstaker: false,
        gradert: false,
        orgnumre: [],
        ønskerSamtidigUttak: false,
    },
];

describe('Skal gruppere perioder på søker og ikke kvote', () => {
    it('Skal gruppere mors perioder i tid hun er hjemme uavbrutt og ikke kvoter', () => {
        const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder1, '2024-05-03');

        expect(permisjonsperioder.length).toBe(4);

        expect(permisjonsperioder[0].forelder).toEqual(Forelder.mor);
        expect(permisjonsperioder[0].tidsperiode).toEqual({
            fom: formatDateIso(perioder1[0].tidsperiode.fom),
            tom: formatDateIso(perioder1[0].tidsperiode.tom),
        });

        expect(permisjonsperioder[1].forelder).toEqual(Forelder.mor);
        expect(permisjonsperioder[1].tidsperiode).toEqual({
            fom: formatDateIso(perioder1[1].tidsperiode.fom),
            tom: formatDateIso(perioder1[2].tidsperiode.tom),
        });

        expect(permisjonsperioder[2].forelder).toEqual(undefined);
        expect(permisjonsperioder[2].tidsperiode).toEqual({
            fom: formatDateIso(perioder1[3].tidsperiode.fom),
            tom: formatDateIso(perioder1[3].tidsperiode.tom),
        });

        expect(permisjonsperioder[3].forelder).toEqual(Forelder.mor);
        expect(permisjonsperioder[3].tidsperiode).toEqual({
            fom: formatDateIso(perioder1[4].tidsperiode.fom),
            tom: formatDateIso(perioder1[4].tidsperiode.tom),
        });
    });
});
