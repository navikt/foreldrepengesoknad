import MockDate from 'mockdate';

import { Forelder } from '@navikt/fp-constants';
import { KontoDto_fpoversikt } from '@navikt/fp-types';

import { deltUttak } from './deltUttak';

describe('Delt uttak - Fødsel Far/Medmor', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });
    const fedrekvote = { konto: 'FEDREKVOTE', dager: 25 } satisfies KontoDto_fpoversikt;
    const mødrekvote = { konto: 'MØDREKVOTE', dager: 25 } satisfies KontoDto_fpoversikt;
    const fellesperiode = { konto: 'FELLESPERIODE', dager: 80 } satisfies KontoDto_fpoversikt;
    const foreldrepengerFørFødsel = { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 } satisfies KontoDto_fpoversikt;

    it('skal gi far/medmor fellesperioden som ikke blir brukt av mor', () => {
        const forslag = deltUttak({
            famDato: '2022-08-08',
            tilgjengeligeStønadskontoer: [fedrekvote, fellesperiode, foreldrepengerFørFødsel, mødrekvote],
            fellesperiodeDagerMor: 40,
        });

        expect(forslag.søker1.length).toEqual(3);
        expect(forslag.søker1[0].fom).toEqual('2022-07-18');
        expect(forslag.søker1[0].tom).toEqual('2022-08-05');
        expect(forslag.søker1[0].forelder).toEqual(Forelder.mor);
        expect(forslag.søker1[0].kontoType).toEqual('FORELDREPENGER_FØR_FØDSEL');
        expect(forslag.søker1[1].fom).toEqual('2022-08-08');
        expect(forslag.søker1[1].tom).toEqual('2022-09-09');
        expect(forslag.søker1[1].forelder).toEqual(Forelder.mor);
        expect(forslag.søker1[1].kontoType).toEqual('MØDREKVOTE');
        expect(forslag.søker1[2].fom).toEqual('2022-09-12');
        expect(forslag.søker1[2].tom).toEqual('2022-11-04');
        expect(forslag.søker1[2].forelder).toEqual(Forelder.mor);
        expect(forslag.søker1[2].kontoType).toEqual('FELLESPERIODE');

        expect(forslag.søker2.length).toEqual(2);
        expect(forslag.søker2[0].fom).toEqual('2022-11-07');
        expect(forslag.søker2[0].tom).toEqual('2022-12-30');
        expect(forslag.søker2[0].forelder).toEqual(Forelder.farMedmor);
        expect(forslag.søker2[0].kontoType).toEqual('FELLESPERIODE');
        expect(forslag.søker2[1].fom).toEqual('2023-01-02');
        expect(forslag.søker2[1].tom).toEqual('2023-02-03');
        expect(forslag.søker2[1].forelder).toEqual(Forelder.farMedmor);
        expect(forslag.søker2[1].kontoType).toEqual('FEDREKVOTE');
    });
});
