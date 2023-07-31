import actionCreator, { SvangerskapspengerContextAction } from 'app/context/action/actionCreator';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import SøknadRoutes from 'app/routes/routes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useOnValidSubmit = <T>(
    submitHandler: (values: T) => SvangerskapspengerContextAction[],
    nextRoute: SøknadRoutes
) => {
    const { dispatch, state } = useSvangerskapspengerContext();
    const navigate = useNavigate();
    const [harSubmitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (harSubmitted) {
            navigate(state.currentRoute);
        }
    }, [harSubmitted, navigate, nextRoute, state]);

    const handleSubmit = (values: T) => {
        setIsSubmitting(true);
        const actions = submitHandler(values);
        const dispatchRouteChange =
            nextRoute === SøknadRoutes.SØKNAD_SENDT ? undefined : dispatch(actionCreator.setCurrentRoute(nextRoute));
        Promise.all([dispatchRouteChange, ...actions.map((a) => dispatch(a))]).then(() => setSubmitted(true));
    };

    return { handleSubmit, isSubmitting };
};

export default useOnValidSubmit;
