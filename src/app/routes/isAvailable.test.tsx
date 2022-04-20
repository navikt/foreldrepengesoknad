import SøknadRoutes from './routes';
import isAvailable from './isAvailable';
import { Søknad } from 'app/context/types/Søknad';

describe('<isAvailable>', () => {
    it('skal vere tilgjengelig når rute er SØKERSITUASJON og en har godkjent vilkår', () => {
        const søknad = {
            harGodkjentVilkår: true,
        } as Søknad;
        const erTilgjengelig = isAvailable(SøknadRoutes.SØKERSITUASJON, søknad);
        expect(erTilgjengelig).toBe(true);
    });

    it('skal ikke vere tilgjengelig når rute er SØKERSITUASJON og en ikke har godkjent vilkår', () => {
        const søknad = {
            harGodkjentVilkår: false,
        } as Søknad;
        const erTilgjengelig = isAvailable(SøknadRoutes.SØKERSITUASJON, søknad);
        expect(erTilgjengelig).toBe(false);
    });

    it('skal ikke vere tilgjengelig når rute er noe annet enn SØKERSITUASJON', () => {
        const søknad = {
            harGodkjentVilkår: true,
        } as Søknad;
        const erTilgjengelig = isAvailable(SøknadRoutes.OM_BARNET, søknad);
        expect(erTilgjengelig).toBe(false);
    });
});
