import actionCreator from '../../context/action/actionCreator';
import SøknadRoutes from '../../routes/routes';
import { useForeldrepengesøknadContext } from '../../context/hooks/useForeldrepengesøknadContext';
import { useEffect, useRef } from 'react';
import { storeAppState } from '../submitUtils';
import { redirectToLogin } from '../redirectToLogin';
import { Kvittering } from 'app/types/Kvittering';

const useSaveLoadedRoute = (currentRoute: SøknadRoutes, kvittering?: Kvittering) => {
    const { dispatch, state } = useForeldrepengesøknadContext();
    const routeHasBeenSaved = useRef(false);

    useEffect(() => {
        if (!routeHasBeenSaved.current && !kvittering) {
            routeHasBeenSaved.current = true;
            dispatch(actionCreator.updateCurrentRoute(currentRoute));
            storeAppState({ ...state, currentRoute }).catch((error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    redirectToLogin();
                }
            });
        }
    }, [currentRoute, dispatch, state, kvittering]);
};

export default useSaveLoadedRoute;
