import { Forelder, Periode, Periodetype, StønadskontoType } from '@navikt/fp-common';
import { dateToISODateString } from '@navikt/fp-formik/src/components/formik-datepicker/dateFormatUtils';

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
    it('Skal fungere', () => {
        const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder1, false);

        expect(permisjonsperioder.length).toBe(4);

        expect(permisjonsperioder[0].forelder).toEqual(Forelder.mor);
        expect(permisjonsperioder[0].tidsperiode).toEqual({
            fom: dateToISODateString(perioder1[0].tidsperiode.fom),
            tom: dateToISODateString(perioder1[0].tidsperiode.tom),
        });
    });
});
