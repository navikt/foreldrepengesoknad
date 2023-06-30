import SøknadRoutes from './routes';

const isAvailable = (route: SøknadRoutes, harGodkjentVilkår: boolean): boolean => {
    switch (route) {
        case SøknadRoutes.BARNET:
            return harGodkjentVilkår === true;
        default:
            return true;
    }
};

export default isAvailable;
