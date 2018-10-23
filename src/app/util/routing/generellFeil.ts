import routeConfig from './routeConfig';

export const redirectToGenerellFeil = () => {
    window.history.pushState({}, 'Feil', routeConfig.GENERELL_FEIL_URL);
};
