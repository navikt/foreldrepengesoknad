import SøknadRoutes from './routes';
import isAvailable from './isAvailable';
import { Søknad } from 'app/context/types/Søknad';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { Forelder } from 'app/types/Forelder';

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

    it('skal vere tilgjengelig når rute er OPPSUMMERING og søknad har uttaksplan der alle uttaksperioder har kontoer ', () => {
        const søknad = {
            harGodkjentVilkår: true,
            uttaksplan: [
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
            ],
        } as Søknad;
        const erTilgjengelig = isAvailable(SøknadRoutes.OPPSUMMERING, søknad);
        expect(erTilgjengelig).toBe(true);
    });
    it('skal ikke vere tilgjengelig når rute er OPPSUMMERING og søknad har uttaksplan der noen  uttaksperioder ikke har kontoer ', () => {
        const søknad = {
            harGodkjentVilkår: true,
            uttaksplan: [
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
            ],
        } as Søknad;
        const erTilgjengelig = isAvailable(SøknadRoutes.OPPSUMMERING, søknad);
        expect(erTilgjengelig).toBe(false);
    });

    it('skal vere tilgjengelig når rute er noe annet enn SØKERSITUASJON eller OPPSUMMERING', () => {
        const søknad = {
            harGodkjentVilkår: true,
        } as Søknad;
        const erTilgjengelig = isAvailable(SøknadRoutes.OM_BARNET, søknad);
        expect(erTilgjengelig).toBe(true);
    });
});
