import { useHistory } from 'react-router';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import Api from 'app/api/api';
import actionCreator from 'app/context/action/actionCreator';
import { useCallback } from 'react';

const useAvbrytSøknad = () => {
    const history = useHistory();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const { søkerinfo } = state;

    const avbrytSøknadHandler = useCallback(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'avbrutt',
        });

        dispatch(actionCreator.avbrytSøknad());
        Api.deleteStoredAppState(søkerinfo.person.fnr);
        history.push('/');
    }, [history, dispatch, søkerinfo.person.fnr]);

    return avbrytSøknadHandler;
};

export default useAvbrytSøknad;
