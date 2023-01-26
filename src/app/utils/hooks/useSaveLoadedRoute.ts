import actionCreator from '../../context/action/actionCreator';
import SøknadRoutes from '../../routes/routes';
import { useForeldrepengesøknadContext } from '../../context/hooks/useForeldrepengesøknadContext';
import { useEffect, useState } from 'react';
import { storeAppState } from '../submitUtils';
import { redirectToLogin } from '../redirectToLogin';

const useSaveLoadedRoute = (currentRoute: SøknadRoutes) => {
    const { dispatch, state } = useForeldrepengesøknadContext();
    const [currentIsSet, setCurrentIsSet] = useState(false);

    useEffect(() => {
        if (!currentIsSet) {
            dispatch(actionCreator.updateCurrentRoute(currentRoute));
            storeAppState(state)
                .then(() => {
                    setCurrentIsSet(true);
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        redirectToLogin();
                    }
                });
        }
    }, [currentRoute, dispatch, state, currentIsSet]);
};

export default useSaveLoadedRoute;
