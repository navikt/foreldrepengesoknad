import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';

const useOnValidSubmit = <T>(
    submitHandler: (values: T) => ForeldrepengesøknadContextAction[],
    nextRoute: SøknadRoutes
) => {
    const { dispatch, state } = useForeldrepengesøknadContext();
    const { søkerinfo } = state;
    const history = useHistory();
    const [harSubmitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (harSubmitted) {
            Api.storeAppState(state, søkerinfo.person.fnr);
            history.push(nextRoute);
        }
    }, [harSubmitted, history, nextRoute, state]);

    const setSubmitAndHandleSubmit = (values: T) => {
        const actions = submitHandler(values);
        const dispatchRouteChange =
            nextRoute === SøknadRoutes.SØKNAD_SENDT ? undefined : dispatch(actionCreator.updateCurrentRoute(nextRoute));
        Promise.all([dispatchRouteChange, ...actions.map((a) => dispatch(a))]).then(() => setSubmitted(true));
    };

    return setSubmitAndHandleSubmit;
};

export default useOnValidSubmit;
