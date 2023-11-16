import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SøknadRoutes from 'app/routes/routes';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import actionCreator, { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { redirectToLogin } from '../redirectToLogin';
import { sendErrorMessageToSentry } from 'app/api/apiUtils';

const useOnValidSubmit = <T>(
    submitHandler: (values: T) => ForeldrepengesøknadContextAction[],
    nextRoute: SøknadRoutes,
    postSubmit: (state: ForeldrepengesøknadContextState) => Promise<any>,
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
            sendErrorMessageToSentry(submitError);
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

//TODO Midlertidig hook for å unngå omskrivning av original = mindre risiko
export const useOnValidSubmitNew = <T>(
    submitHandler: (values: T) => ForeldrepengesøknadContextAction[],
    getNewRoute: (values: T) => SøknadRoutes,
    postSubmit: (state: ForeldrepengesøknadContextState) => Promise<any>,
) => {
    const { dispatch, state } = useForeldrepengesøknadContext();
    const navigate = useNavigate();

    const handleSubmit = (values: T): Promise<any> => {
        const newRoute = getNewRoute(values);

        const actions = submitHandler(values);
        const dispatchRouteChange =
            newRoute === SøknadRoutes.SØKNAD_SENDT ? undefined : dispatch(actionCreator.updateCurrentRoute(newRoute));

        return Promise.all([dispatchRouteChange, ...actions.map((a) => dispatch(a))]).then(() => {
            return postSubmit(state)
                .then(() => {
                    navigate(newRoute);
                })
                .catch((error) => {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        redirectToLogin();
                    } else {
                        sendErrorMessageToSentry(error);
                        throw new Error(error);
                    }
                });
        });
    };

    return { handleSubmit };
};

export default useOnValidSubmit;
