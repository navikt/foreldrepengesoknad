import { MorsAktivitet } from '@navikt/fp-common';

import { getMorsAktivitet } from './morsAktivitetUtils';

describe('getMorsAktivitet', () => {
    it('should return undefined for no input on morsaktivitet or no input on mor er for syk', () => {
        expect(getMorsAktivitet(undefined, undefined)).toBeUndefined();
    });

    it('should return mors aktivitet if there is input on mors aktivitet', () => {
        expect(getMorsAktivitet(MorsAktivitet.Innlagt, undefined)).toEqual(MorsAktivitet.Innlagt);
    });

    it('should return mors aktivitet = TRENGER HJELP for no input on mors aktivitet and input that mor er syk', () => {
        expect(getMorsAktivitet(undefined, true)).toEqual(MorsAktivitet.TrengerHjelp);
    });

    it('should return undefined if no input on mors aktivitet and mor er syk is false', () => {
        expect(getMorsAktivitet(undefined, false)).toBeUndefined();
    });
});
