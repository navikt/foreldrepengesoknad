import { Søknad } from 'app/context/types/Søknad';
import SøknadRoutes from './routes';

const isAvailable = (route: SøknadRoutes, søknad: Søknad): boolean => {
    switch (route) {
        case SøknadRoutes.SØKERSITUASJON:
            return søknad.harGodkjentVilkår === true;
        default:
            return false;
    }
};

export default isAvailable;
