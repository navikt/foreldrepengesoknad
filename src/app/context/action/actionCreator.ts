import SøkersituasjonState from '../types/SøkersituasjonState';

export enum ForeldrepengesøknadContextActionKeys {
    'SET_HARGODKJENTVILKÅR' = 'setVelkommen',
    'SET_SØKERSITUASJON' = 'setSøkersituasjon',
    'AVBRYT_SØKNAD' = 'avbrytSøknad',
}

interface SetVelkommen {
    type: ForeldrepengesøknadContextActionKeys.SET_HARGODKJENTVILKÅR;
    payload: boolean;
}

const setVelkommen = (payload: boolean): SetVelkommen => ({
    type: ForeldrepengesøknadContextActionKeys.SET_HARGODKJENTVILKÅR,
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
