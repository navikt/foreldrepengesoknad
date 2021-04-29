import Barn from '../types/Barn';
import Søkersituasjon from '../types/Søkersituasjon';

export enum ForeldrepengesøknadContextActionKeys {
    'SET_HARGODKJENTVILKÅR' = 'setVelkommen',
    'SET_SØKERSITUASJON' = 'setSøkersituasjon',
    'SET_OMBARNET' = 'setOmBarnet',
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
    payload: Søkersituasjon;
}

const setSøkersituasjon = (payload: Søkersituasjon): SetSøkersituasjon => ({
    type: ForeldrepengesøknadContextActionKeys.SET_SØKERSITUASJON,
    payload,
});

interface SetOmBarnet {
    type: ForeldrepengesøknadContextActionKeys.SET_OMBARNET;
    payload: Barn;
}

const setOmBarnet = (payload: Barn): SetOmBarnet => ({
    type: ForeldrepengesøknadContextActionKeys.SET_OMBARNET,
    payload,
});

interface AvbrytSøknad {
    type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD;
}

const avbrytSøknad = (): AvbrytSøknad => ({
    type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD,
});

export type ForeldrepengesøknadContextAction = SetVelkommen | SetSøkersituasjon | SetOmBarnet | AvbrytSøknad;

export default {
    setVelkommen,
    setSøkersituasjon,
    setOmBarnet,
    avbrytSøknad,
};
