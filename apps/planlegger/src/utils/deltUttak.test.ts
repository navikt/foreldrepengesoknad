import MockDate from 'mockdate';

import { KontoDto } from '@navikt/fp-types';
import { deltUttak } from '@navikt/fp-uttaksplan';

describe('deltUttak - Fødsel', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    const fedrekvote = { konto: 'FEDREKVOTE', dager: 25 } satisfies KontoDto;
    const mødrekvote = { konto: 'MØDREKVOTE', dager: 25 } satisfies KontoDto;
    const fellesperiode = { konto: 'FELLESPERIODE', dager: 80 } satisfies KontoDto;
    const foreldrepengerFørFødsel = { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 } satisfies KontoDto;

    const alleKontoer = [fedrekvote, fellesperiode, foreldrepengerFørFødsel, mødrekvote];

    it('skal gi far/medmor fellesperioden som ikke blir brukt av mor', () => {
        const forslag = deltUttak({
            famDato: '2022-08-08',
            tilgjengeligeStønadskontoer: alleKontoer,
            fellesperiodeDagerMor: 40,
        });

        expect(forslag.length).toEqual(5);
        expect(forslag[0]!.fom).toEqual('2022-07-18');
        expect(forslag[0]!.tom).toEqual('2022-08-05');
        expect(forslag[0]!.forelder).toEqual('MOR');
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER_FØR_FØDSEL');
        expect(forslag[1]!.fom).toEqual('2022-08-08');
        expect(forslag[1]!.tom).toEqual('2022-09-09');
        expect(forslag[1]!.forelder).toEqual('MOR');
        expect(forslag[1]!.kontoType).toEqual('MØDREKVOTE');
        expect(forslag[2]!.fom).toEqual('2022-09-12');
        expect(forslag[2]!.tom).toEqual('2022-11-04');
        expect(forslag[2]!.forelder).toEqual('MOR');
        expect(forslag[2]!.kontoType).toEqual('FELLESPERIODE');

        expect(forslag[3]!.fom).toEqual('2022-11-07');
        expect(forslag[3]!.tom).toEqual('2022-12-09');
        expect(forslag[3]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[3]!.kontoType).toEqual('FEDREKVOTE');
        expect(forslag[4]!.fom).toEqual('2022-12-12');
        expect(forslag[4]!.tom).toEqual('2023-02-03');
        expect(forslag[4]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[4]!.kontoType).toEqual('FELLESPERIODE');
    });

    it('skal gi mor all fellesperiode og ingen fellesperiode til far', () => {
        const forslag = deltUttak({
            famDato: '2022-08-08',
            tilgjengeligeStønadskontoer: alleKontoer,
            fellesperiodeDagerMor: 80,
        });

        expect(forslag.length).toEqual(4);
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER_FØR_FØDSEL');
        expect(forslag[0]!.forelder).toEqual('MOR');
        expect(forslag[1]!.kontoType).toEqual('MØDREKVOTE');
        expect(forslag[1]!.forelder).toEqual('MOR');
        expect(forslag[2]!.kontoType).toEqual('FELLESPERIODE');
        expect(forslag[2]!.forelder).toEqual('MOR');
        expect(forslag[2]!.fom).toEqual('2022-09-12');
        expect(forslag[2]!.tom).toEqual('2022-12-30');
        expect(forslag[3]!.kontoType).toEqual('FEDREKVOTE');
        expect(forslag[3]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[3]!.fom).toEqual('2023-01-02');
        expect(forslag[3]!.tom).toEqual('2023-02-03');
    });

    it('skal gi far all fellesperiode og ingen fellesperiode til mor', () => {
        const forslag = deltUttak({
            famDato: '2022-08-08',
            tilgjengeligeStønadskontoer: alleKontoer,
            fellesperiodeDagerMor: 0,
        });

        expect(forslag.length).toEqual(4);
        expect(forslag[0]!.kontoType).toEqual('FORELDREPENGER_FØR_FØDSEL');
        expect(forslag[0]!.forelder).toEqual('MOR');
        expect(forslag[1]!.kontoType).toEqual('MØDREKVOTE');
        expect(forslag[1]!.forelder).toEqual('MOR');
        expect(forslag[2]!.kontoType).toEqual('FEDREKVOTE');
        expect(forslag[2]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[2]!.fom).toEqual('2022-09-12');
        expect(forslag[2]!.tom).toEqual('2022-10-14');
        expect(forslag[3]!.kontoType).toEqual('FELLESPERIODE');
        expect(forslag[3]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[3]!.fom).toEqual('2022-10-17');
        expect(forslag[3]!.tom).toEqual('2023-02-03');
    });

    it('skal legge inn fellesperiode før FPFF når startdato er mer enn 3 uker før fødsel', () => {
        // startdato 20 uttaksdager (4 uker) før fødsel → 5 dager fellesperiode før FPFF
        const forslag = deltUttak({
            famDato: '2022-08-08',
            tilgjengeligeStønadskontoer: alleKontoer,
            fellesperiodeDagerMor: 35,
            startdato: '2022-07-11',
        });

        expect(forslag.length).toEqual(6);
        expect(forslag[0]!.kontoType).toEqual('FELLESPERIODE');
        expect(forslag[0]!.forelder).toEqual('MOR');
        expect(forslag[0]!.fom).toEqual('2022-07-11');
        expect(forslag[0]!.tom).toEqual('2022-07-15');
        expect(forslag[1]!.kontoType).toEqual('FORELDREPENGER_FØR_FØDSEL');
        expect(forslag[1]!.forelder).toEqual('MOR');
        expect(forslag[1]!.fom).toEqual('2022-07-18');
        expect(forslag[1]!.tom).toEqual('2022-08-05');
        expect(forslag[2]!.kontoType).toEqual('MØDREKVOTE');
        expect(forslag[2]!.forelder).toEqual('MOR');
        expect(forslag[2]!.fom).toEqual('2022-08-08');
        expect(forslag[3]!.kontoType).toEqual('FELLESPERIODE');
        expect(forslag[3]!.forelder).toEqual('MOR');
        expect(forslag[3]!.fom).toEqual('2022-09-12');
        expect(forslag[3]!.tom).toEqual('2022-10-28');
        expect(forslag[4]!.kontoType).toEqual('FEDREKVOTE');
        expect(forslag[4]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[5]!.kontoType).toEqual('FELLESPERIODE');
        expect(forslag[5]!.forelder).toEqual('FAR_MEDMOR');
        // fellesperiodeDagerFar = 80 - 5 - 35 = 40
        expect(forslag[5]!.fom).toEqual('2022-12-05');
        expect(forslag[5]!.tom).toEqual('2023-01-27');
    });
});

describe('deltUttak - Adopsjon', () => {
    beforeAll(() => {
        MockDate.set(new Date('2022-08-02T00:00:00.000Z'));
    });

    afterAll(() => {
        MockDate.reset();
    });

    const fedrekvote = { konto: 'FEDREKVOTE', dager: 25 } satisfies KontoDto;
    const mødrekvote = { konto: 'MØDREKVOTE', dager: 25 } satisfies KontoDto;
    const fellesperiode = { konto: 'FELLESPERIODE', dager: 80 } satisfies KontoDto;

    it('skal starte planen på omsorgsovertakelsesdatoen uten FPFF-periode', () => {
        const forslag = deltUttak({
            famDato: '2022-08-08',
            tilgjengeligeStønadskontoer: [fedrekvote, fellesperiode, mødrekvote],
            fellesperiodeDagerMor: 40,
        });

        expect(forslag.length).toEqual(4);
        // Ingen FPFF — plan starter direkte på famDato
        expect(forslag[0]!.kontoType).toEqual('MØDREKVOTE');
        expect(forslag[0]!.forelder).toEqual('MOR');
        expect(forslag[0]!.fom).toEqual('2022-08-08');
        expect(forslag[0]!.tom).toEqual('2022-09-09');
        expect(forslag[1]!.kontoType).toEqual('FELLESPERIODE');
        expect(forslag[1]!.forelder).toEqual('MOR');
        expect(forslag[1]!.fom).toEqual('2022-09-12');
        expect(forslag[1]!.tom).toEqual('2022-11-04');
        expect(forslag[2]!.kontoType).toEqual('FEDREKVOTE');
        expect(forslag[2]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[2]!.fom).toEqual('2022-11-07');
        expect(forslag[2]!.tom).toEqual('2022-12-09');
        expect(forslag[3]!.kontoType).toEqual('FELLESPERIODE');
        expect(forslag[3]!.forelder).toEqual('FAR_MEDMOR');
        expect(forslag[3]!.fom).toEqual('2022-12-12');
        expect(forslag[3]!.tom).toEqual('2023-02-03');
    });
});
