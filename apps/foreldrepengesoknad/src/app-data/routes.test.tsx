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

    it('skal vere tilgjengelig når rute er noe annet enn SØKERSITUASJON eller OPPSUMMERING', () => {
        const erTilgjengelig = isRouteAvailable(SøknadRoutes.OM_BARNET, true);
        expect(erTilgjengelig).toBe(true);
    });
});
