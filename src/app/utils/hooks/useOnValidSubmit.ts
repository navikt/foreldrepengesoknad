import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';
import { cleanUpSøknadsdataForInnsending } from 'app/api/apiUtils';

const useOnValidSubmit = <T>(
    submitHandler: (values: T) => ForeldrepengesøknadContextAction[],
    nextRoute: SøknadRoutes,
    erInnsendingAvSøknad = false
) => {
    const { dispatch, state } = useForeldrepengesøknadContext();
    const { søkerinfo } = state;
    const history = useHistory();
    const [harSubmitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (harSubmitted && !erInnsendingAvSøknad) {
            Api.storeAppState(state, søkerinfo.person.fnr);
            history.push(nextRoute);
        }
        if (harSubmitted && erInnsendingAvSøknad) {
            const cleanSøknad = cleanUpSøknadsdataForInnsending(state.søknad);
            Api.sendSøknad(cleanSøknad, søkerinfo.person.fnr);
            history.push(nextRoute);
        }
    }, [harSubmitted, history, nextRoute, state, søkerinfo.person.fnr, erInnsendingAvSøknad]);

    const setSubmitAndHandleSubmit = (values: T) => {
        const actions = submitHandler(values);
        const dispatchRouteChange =
            nextRoute === SøknadRoutes.SØKNAD_SENDT ? undefined : dispatch(actionCreator.updateCurrentRoute(nextRoute));
        Promise.all([dispatchRouteChange, ...actions.map((a) => dispatch(a))]).then(() => setSubmitted(true));
    };

    return setSubmitAndHandleSubmit;
};

export default useOnValidSubmit;
