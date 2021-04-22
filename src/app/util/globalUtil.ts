import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import actionCreator, { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';
import { History } from 'history';

export const assertUnreachable = (_x: never): never => {
    throw new Error('This should never happen');
};

export const onAvbrytSøknad = (dispatch: React.Dispatch<ForeldrepengesøknadContextAction>, history: History<any>) => {
    logAmplitudeEvent('applikasjon-hendelse', {
        app: 'foreldrepengesoknad',
        team: 'foreldrepenger',
        hendelse: 'avbrutt',
    });

    dispatch(actionCreator.avbrytSøknad());
    history.push('/');
};
