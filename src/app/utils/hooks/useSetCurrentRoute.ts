import { useEffect } from 'react';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';

const useSetCurrentRoute = (route: SøknadRoutes) => {
  const { dispatch } = useForeldrepengesøknadContext();
  useEffect(() => {
    dispatch(actionCreator.updateCurrentRoute(route));
  }, []);
}

export default useSetCurrentRoute;