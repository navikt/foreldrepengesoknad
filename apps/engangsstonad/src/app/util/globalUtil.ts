import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import actionCreator, { EngangsstønadContextAction } from 'app/context/action/actionCreator';
import { NavigateFunction } from 'react-router-dom';

export const assertUnreachable = (_x: never): never => {
    throw new Error('This should never happen');
};

export const onAvbrytSøknad = (dispatch: React.Dispatch<EngangsstønadContextAction>, navigate: NavigateFunction) => {
    logAmplitudeEvent('applikasjon-hendelse', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        hendelse: 'avbrutt',
    });

    dispatch(actionCreator.avbrytSøknad());
    navigate('/');
};
