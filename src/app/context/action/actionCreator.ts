import SøknadRoutes from 'app/routes/routes';
import { ForeldrepengesøknadContextState } from '../ForeldrepengesøknadContextConfig';
import AnnenForelder from '../types/AnnenForelder';
import Barn from '../types/Barn';
import Søkersituasjon from '../types/Søkersituasjon';

export enum ForeldrepengesøknadContextActionKeys {
    'SET_HARGODKJENTVILKÅR' = 'setVelkommen',
    'SET_SØKERSITUASJON' = 'setSøkersituasjon',
    'SET_OMBARNET' = 'setOmBarnet',
    'AVBRYT_SØKNAD' = 'avbrytSøknad',
    'UPDATE_CURRENT_ROUTE' = 'updateCurrentRoute',
    'APPLY_STORED_STATE' = 'applyStoredState',
    'SET_ANNENFORELDER' = 'setAnnenForelder',
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

interface UpdateCurrentRoute {
    type: ForeldrepengesøknadContextActionKeys.UPDATE_CURRENT_ROUTE;
    payload: SøknadRoutes;
}

const updateCurrentRoute = (payload: SøknadRoutes): UpdateCurrentRoute => ({
    type: ForeldrepengesøknadContextActionKeys.UPDATE_CURRENT_ROUTE,
    payload,
});

interface ApplyStoredState {
    type: ForeldrepengesøknadContextActionKeys.APPLY_STORED_STATE;
    payload: ForeldrepengesøknadContextState;
}

const applyStoredState = (payload: ForeldrepengesøknadContextState): ApplyStoredState => ({
    type: ForeldrepengesøknadContextActionKeys.APPLY_STORED_STATE,
    payload,
});

interface SetAnnenForelder {
    type: ForeldrepengesøknadContextActionKeys.SET_ANNENFORELDER;
    payload: AnnenForelder;
}

const setAnnenForelder = (payload: AnnenForelder): SetAnnenForelder => ({
    type: ForeldrepengesøknadContextActionKeys.SET_ANNENFORELDER,
    payload,
});

export type ForeldrepengesøknadContextAction =
    | SetVelkommen
    | SetSøkersituasjon
    | SetOmBarnet
    | AvbrytSøknad
    | UpdateCurrentRoute
    | SetAnnenForelder
    | ApplyStoredState;

export default {
    setVelkommen,
    setSøkersituasjon,
    setOmBarnet,
    avbrytSøknad,
    updateCurrentRoute,
    applyStoredState,
    setAnnenForelder,
};
