import { useHistory } from 'react-router';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import { useCallback } from 'react';

const useAvbrytSøknad = () => {
    const history = useHistory();
    const { dispatch } = useForeldrepengesøknadContext();

    const avbrytSøknadHandler = useCallback(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        dispatch(actionCreator.avbrytSøknad());
        Api.deleteStoredAppState();
        history.push('/');
    }, [history, dispatch]);

    return avbrytSøknadHandler;
};

export default useAvbrytSøknad;
