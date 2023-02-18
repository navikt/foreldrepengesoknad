import { Søknad } from 'app/context/types/Søknad';
import { uttaksplanInneholderPerioderUtenKonto } from 'app/utils/uttaksplan/uttaksplanUtils';
import SøknadRoutes from './routes';

const isAvailable = (route: SøknadRoutes, søknad: Søknad): boolean => {
    switch (route) {
        case SøknadRoutes.SØKERSITUASJON:
            return søknad.harGodkjentVilkår === true;
        case SøknadRoutes.OPPSUMMERING:
            return uttaksplanInneholderPerioderUtenKonto(søknad.uttaksplan) === false && søknad.uttaksplan.length > 0;
        default:
            return true;
    }
};

export default isAvailable;
