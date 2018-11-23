import {
    correctDateIfMissmatchOnIsoString,
    tidsperiodeContainsIso23String,
    correctFomAfterTomOnUttaksplan
} from '../uttakUtils';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import moment from 'moment';

const stringWithT23: string = '2019-05-16T23:00:00.000Z';
const stringWithoutT23: string = '2019-05-17T00:00:00.000Z';

const invalidTidsperiode: Partial<Tidsperiode> = {
    fom: undefined,
    tom: undefined
};

const tidsperiodeWithoutT23: Tidsperiode = {
    fom: moment(stringWithoutT23).toDate(),
    tom: moment(stringWithoutT23).toDate()
};

const tidsperiodeWithT23: Tidsperiode = {
    fom: moment(stringWithT23).toDate(),
    tom: moment(stringWithoutT23).toDate()
};

const uttaksplanUtenT23: Array<Partial<Periode>> = [
    {
        tidsperiode: invalidTidsperiode as Tidsperiode
    },
    {
        tidsperiode: tidsperiodeWithoutT23
    }
];
const uttaksplanMedT23: Array<Partial<Periode>> = [
    {
        tidsperiode: invalidTidsperiode as Tidsperiode
    },
    {
        tidsperiode: tidsperiodeWithoutT23
    },
    {
        tidsperiode: tidsperiodeWithT23
    }
];

describe('Isodate offset fix', () => {
    it('corrects tidsperiode with T23', () => {
        expect(correctDateIfMissmatchOnIsoString(new Date(stringWithoutT23)).toISOString()).toEqual(stringWithoutT23);
    });
    it('finds tidsperiode containing T23', () => {
        expect(tidsperiodeContainsIso23String(tidsperiodeWithT23)).toBeTruthy();
        expect(tidsperiodeContainsIso23String(tidsperiodeWithoutT23)).toBeFalsy();
    });
    it('does nothing with tidsperioder which dont has T23 in isoString', () => {
        const before = JSON.stringify(uttaksplanUtenT23);
        const after = JSON.stringify(correctFomAfterTomOnUttaksplan(uttaksplanUtenT23 as Periode[]));
        expect(before).toEqual(after);
    });
    it('replaces date if uttaksplan contains T23 in isoString', () => {
        const before = JSON.stringify(uttaksplanMedT23);
        const after = JSON.stringify(correctFomAfterTomOnUttaksplan(uttaksplanMedT23 as Periode[]));
        expect(before).not.toEqual(after);
    });
});
