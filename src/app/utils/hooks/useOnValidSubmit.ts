import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Api from 'app/api/api';
import SøknadRoutes from 'app/routes/routes';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';

const useOnValidSubmit = <T, >(
  submitHandler: (values: T) => ForeldrepengesøknadContextAction[],
  nextRoute: SøknadRoutes,
) => {
  const { dispatch, state } = useForeldrepengesøknadContext();
  const history = useHistory();
  const [harSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (harSubmitted) {
        Api.storeAppState(state);
        history.push(nextRoute);
    }
  }, [harSubmitted]);

  const setSubmitAndHandleSubmit = useCallback((values: T) => {
    const actions = submitHandler(values);
    Promise.all(actions.map((a) => dispatch(a)))
      .then(() => setSubmitted(true));
  }, [])

  return setSubmitAndHandleSubmit;
}

export default useOnValidSubmit;