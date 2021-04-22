import SøkersituasjonState from '../types/SøkersituasjonState';
import VelkommenState from '../types/VelkommenState';

export enum ForeldrepengesøknadContextActionKeys {
    'SET_VELKOMMEN' = 'setVelkommen',
    'SET_SØKERSITUASJON' = 'setSøkersituasjon',
    'AVBRYT_SØKNAD' = 'avbrytSøknad',
}

interface SetVelkommen {
    type: ForeldrepengesøknadContextActionKeys.SET_VELKOMMEN;
    payload: VelkommenState;
}

const setVelkommen = (payload: VelkommenState): SetVelkommen => ({
    type: ForeldrepengesøknadContextActionKeys.SET_VELKOMMEN,
    payload,
});

interface SetSøkersituasjon {
    type: ForeldrepengesøknadContextActionKeys.SET_SØKERSITUASJON;
    payload: SøkersituasjonState;
}

const setSøkersituasjon = (payload: SøkersituasjonState): SetSøkersituasjon => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SØKERSITUASJON,
    payload,
});

interface AvbrytSøknad {
    type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD;
}

const avbrytSøknad = (): AvbrytSøknad => ({
    type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD,
});

export type ForeldrepengesøknadContextAction = SetVelkommen | SetSøkersituasjon | AvbrytSøknad;

export default {
    setVelkommen,
    setSøkersituasjon,
    avbrytSøknad,
};
