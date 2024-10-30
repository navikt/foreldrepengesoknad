import MockDate from 'mockdate';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';

import { deltUttak } from './deltUttak';

describe('Delt uttak - Fødsel Far/Medmor', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });
    const fedrekvote = { konto: StønadskontoType.Fedrekvote, dager: 25 };
    const fellesperiode = { konto: StønadskontoType.Fellesperiode, dager: 80 };
    const foreldrepengerFørFødsel = { konto: StønadskontoType.ForeldrepengerFørFødsel, dager: 15 };

    it('skal gi far/medmor fellesperioden som ikke blir brukt av mor', () => {
        const forslag = deltUttak({
            famDato: '2022-08-08',
            tilgjengeligeStønadskontoer: [fedrekvote, fellesperiode, foreldrepengerFørFødsel],
            fellesperiodeDagerMor: 40,
        });

        expect(forslag.søker1.length).toEqual(2);
        expect(forslag.søker1[0].fom).toEqual('2022-07-18');
        expect(forslag.søker1[0].tom).toEqual('2022-08-05');
        expect(forslag.søker1[0].forelder).toEqual(Forelder.mor);
        expect(forslag.søker1[0].kontoType).toEqual(StønadskontoType.ForeldrepengerFørFødsel);
        expect(forslag.søker1[1].fom).toEqual('2022-08-08');
        expect(forslag.søker1[1].tom).toEqual('2022-09-30');
        expect(forslag.søker1[1].forelder).toEqual(Forelder.mor);
        expect(forslag.søker1[1].kontoType).toEqual(StønadskontoType.Fellesperiode);

        expect(forslag.søker2.length).toEqual(2);
        expect(forslag.søker2[0].fom).toEqual('2022-10-03');
        expect(forslag.søker2[0].tom).toEqual('2022-11-25');
        expect(forslag.søker2[0].forelder).toEqual(Forelder.farMedmor);
        expect(forslag.søker2[0].kontoType).toEqual(StønadskontoType.Fellesperiode);
        expect(forslag.søker2[1].fom).toEqual('2022-11-28');
        expect(forslag.søker2[1].tom).toEqual('2022-12-30');
        expect(forslag.søker2[1].forelder).toEqual(Forelder.farMedmor);
        expect(forslag.søker2[1].kontoType).toEqual(StønadskontoType.Fedrekvote);
    });
});
