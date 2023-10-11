import SøknadRoutes from './routes';

const isAvailable = (route: SøknadRoutes, harGodkjentVilkår: boolean): boolean => {
    if (route === SøknadRoutes.BARNET) {
        return harGodkjentVilkår === true;
    }

    return true;
};

export default isAvailable;
