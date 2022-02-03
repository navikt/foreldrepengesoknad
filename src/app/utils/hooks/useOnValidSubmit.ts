import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';

const useOnValidSubmit = <T>(
    submitHandler: (values: T) => ForeldrepengesøknadContextAction[],
    nextRoute: SøknadRoutes,
    postSubmit: (state: ForeldrepengesøknadContextState) => Promise<any>
) => {
    const { dispatch, state } = useForeldrepengesøknadContext();
    const history = useHistory();
    const [harSubmitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    useEffect(() => {
        if (harSubmitted) {
            postSubmit(state)
                .then(() => {
                    history.push(state.currentRoute);
                })
                .catch((error) => {
                    setSubmitError(error);
                });
        }
    }, [harSubmitted, history, nextRoute, state, postSubmit]);

    useEffect(() => {
        if (submitError) {
            throw new Error(submitError);
        }
    }, [submitError]);

    const setSubmitAndHandleSubmit = (values: T) => {
        const actions = submitHandler(values);
        const dispatchRouteChange =
            nextRoute === SøknadRoutes.SØKNAD_SENDT ? undefined : dispatch(actionCreator.updateCurrentRoute(nextRoute));
        Promise.all([dispatchRouteChange, ...actions.map((a) => dispatch(a))]).then(() => setSubmitted(true));
    };

    return setSubmitAndHandleSubmit;
};

export default useOnValidSubmit;
