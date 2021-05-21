import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import Api from 'app/api/api';
import actionCreator, { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';
import { History } from 'history';
import Bytes from 'bytes';
import { Attachment } from 'app/types/Attachment';

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
    Api.deleteStoredAppState();
    history.push('/');
};

export const bytesString = (bytes: number): string => {
    return Bytes(bytes, {
        unitSeparator: ' ',
        thousandsSeparator: ' ',
        decimalPlaces: 1,
        fixedDecimals: false,
    });
};

export const deleteAttachment = (attachments: Attachment[], deleted: Attachment): Attachment[] => {
    return attachments.filter((att) => att !== deleted);
};
