import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { redirectToLogin } from '../redirectToLogin';

const useOnValidSubmit = <T>(
    submitHandler: (values: T) => ForeldrepengesøknadContextAction[],
    nextRoute: SøknadRoutes,
    postSubmit: (state: ForeldrepengesøknadContextState) => Promise<any>
) => {
    const { dispatch, state } = useForeldrepengesøknadContext();
    const navigate = useNavigate();
    const [harSubmitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    useEffect(() => {
        if (harSubmitted) {
            postSubmit(state)
                .then(() => {
                    if (nextRoute === SøknadRoutes.SØKNAD_SENDT) {
                        navigate(nextRoute);
                    } else {
                        navigate(state.currentRoute);
                    }
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        redirectToLogin();
                    } else {
                        setSubmitError(error);
                    }
                });
        }
    }, [harSubmitted, navigate, nextRoute, state, postSubmit]);

    useEffect(() => {
        if (submitError) {
            throw new Error(submitError);
        }
    }, [submitError]);

    const handleSubmit = (values: T) => {
        setIsSubmitting(true);
        const actions = submitHandler(values);
        const dispatchRouteChange =
            nextRoute === SøknadRoutes.SØKNAD_SENDT ? undefined : dispatch(actionCreator.updateCurrentRoute(nextRoute));
        Promise.all([dispatchRouteChange, ...actions.map((a) => dispatch(a))]).then(() => setSubmitted(true));
    };

    return { handleSubmit, isSubmitting };
};

export default useOnValidSubmit;
