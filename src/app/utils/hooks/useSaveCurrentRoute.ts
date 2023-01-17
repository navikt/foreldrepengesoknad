import actionCreator from '../../context/action/actionCreator';
import SøknadRoutes from '../../routes/routes';
import { useForeldrepengesøknadContext } from '../../context/hooks/useForeldrepengesøknadContext';
import { useEffect, useState } from 'react';
import { storeAppState } from '../submitUtils';
import { redirectToLogin } from '../redirectToLogin';

const useSaveLoadedRoute = (currentRoute: SøknadRoutes) => {
    const { dispatch, state } = useForeldrepengesøknadContext();
    const currentRouteIsInContext = state.currentRoute === currentRoute;
    const [currentRouteIsSaved, setCurrentRouteIsSaved] = useState(currentRouteIsInContext);

    useEffect(() => {
        if (!currentRouteIsSaved) {
            dispatch(actionCreator.updateCurrentRoute(currentRoute));
            storeAppState(state)
                .then(() => {
                    setCurrentRouteIsSaved(true);
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        redirectToLogin();
                    }
                });
        }
    });
};

export default useSaveLoadedRoute;
