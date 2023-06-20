import SøknadRoutes from './routes';

const isAvailable = (route: SøknadRoutes): boolean => {
    console.log(route);
    return true;
    // switch (route) {
    //     case SøknadRoutes.SØKERSITUASJON:
    //         return søknad.harGodkjentVilkår === true;
    //     default:
    //         return true;
    // }
};

export default isAvailable;
