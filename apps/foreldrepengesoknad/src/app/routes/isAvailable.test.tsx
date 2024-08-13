import { Forelder, Periode, Periodetype, StønadskontoType } from '@navikt/fp-common';

import isAvailable from './isAvailable';
import SøknadRoutes from './routes';

describe('<isAvailable>', () => {
    it('skal vere tilgjengelig når rute er SØKERSITUASJON og en har godkjent vilkår', () => {
        const erTilgjengelig = isAvailable(SøknadRoutes.SØKERSITUASJON, true);
        expect(erTilgjengelig).toBe(true);
    });

    it('skal ikke vere tilgjengelig når rute er SØKERSITUASJON og en ikke har godkjent vilkår', () => {
        const erTilgjengelig = isAvailable(SøknadRoutes.SØKERSITUASJON, false);
        expect(erTilgjengelig).toBe(false);
    });

    it('skal vere tilgjengelig når rute er OPPSUMMERING og søknad har uttaksplan der alle uttaksperioder har kontoer', () => {
        const uttaksplan = [
            {
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
            },
            {
                type: Periodetype.Uttak,
                konto: StønadskontoType.Fellesperiode,
                forelder: Forelder.farMedmor,
            },
        ] as Periode[];
        const erTilgjengelig = isAvailable(SøknadRoutes.OPPSUMMERING, true, uttaksplan);
        expect(erTilgjengelig).toBe(true);
    });
    it('skal ikke vere tilgjengelig når rute er OPPSUMMERING og søknad har uttaksplan der noen  uttaksperioder ikke har kontoer', () => {
        const uttaksplan = [
            {
                type: Periodetype.Uttak,
                konto: StønadskontoType.Mødrekvote,
                forelder: Forelder.farMedmor,
            },
            {
                type: Periodetype.Uttak,
                konto: undefined,
                forelder: Forelder.farMedmor,
            },
        ] as Periode[];
        const erTilgjengelig = isAvailable(SøknadRoutes.OPPSUMMERING, true, uttaksplan);
        expect(erTilgjengelig).toBe(false);
    });

    it('skal vere tilgjengelig når rute er noe annet enn SØKERSITUASJON eller OPPSUMMERING', () => {
        const erTilgjengelig = isAvailable(SøknadRoutes.OM_BARNET, true);
        expect(erTilgjengelig).toBe(true);
    });
});
