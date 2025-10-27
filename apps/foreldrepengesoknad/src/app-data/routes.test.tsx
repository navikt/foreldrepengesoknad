import { Forelder, Periode, Periodetype } from '@navikt/fp-common';

import { SøknadRoutes, isRouteAvailable } from './routes';

describe('<routes>', () => {
    it('skal vere tilgjengelig når rute er SØKERSITUASJON og en har godkjent vilkår', () => {
        const erTilgjengelig = isRouteAvailable(SøknadRoutes.SØKERSITUASJON, true);
        expect(erTilgjengelig).toBe(true);
    });

    it('skal ikke vere tilgjengelig når rute er SØKERSITUASJON og en ikke har godkjent vilkår', () => {
        const erTilgjengelig = isRouteAvailable(SøknadRoutes.SØKERSITUASJON, false);
        expect(erTilgjengelig).toBe(false);
    });

    it('skal vere tilgjengelig når rute er OPPSUMMERING og søknad har uttaksplan der alle uttaksperioder har kontoer', () => {
        const uttaksplan = [
            {
                type: Periodetype.Uttak,
                konto: 'FEDREKVOTE',
                forelder: Forelder.farMedmor,
            },
            {
                type: Periodetype.Uttak,
                konto: 'FELLESPERIODE',
                forelder: Forelder.farMedmor,
            },
        ] as Periode[];
        const erTilgjengelig = isRouteAvailable(SøknadRoutes.OPPSUMMERING, true, uttaksplan);
        expect(erTilgjengelig).toBe(true);
    });
    it('skal ikke vere tilgjengelig når rute er OPPSUMMERING og søknad har uttaksplan der noen  uttaksperioder ikke har kontoer', () => {
        const uttaksplan = [
            {
                type: Periodetype.Uttak,
                konto: 'MØDREKVOTE',
                forelder: Forelder.farMedmor,
            },
            {
                type: Periodetype.Uttak,
                konto: undefined,
                forelder: Forelder.farMedmor,
            },
        ] as Periode[];
        const erTilgjengelig = isRouteAvailable(SøknadRoutes.OPPSUMMERING, true, uttaksplan);
        expect(erTilgjengelig).toBe(false);
    });

    it('skal vere tilgjengelig når rute er noe annet enn SØKERSITUASJON eller OPPSUMMERING', () => {
        const erTilgjengelig = isRouteAvailable(SøknadRoutes.OM_BARNET, true);
        expect(erTilgjengelig).toBe(true);
    });
});
