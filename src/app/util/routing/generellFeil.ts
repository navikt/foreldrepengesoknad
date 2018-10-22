import routeConfig from './routeConfig';

export const redirectToGenerellFeil = () => {
    window.location.href = routeConfig.GENERELL_FEIL_URL;
};
