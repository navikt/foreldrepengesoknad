import { VelkommenFormData } from 'app/pages/velkommen/velkommenFormConfig';

export enum ForeldrepengesøknadContextActionKeys {
    'SET_VELKOMMEN' = 'setVelkommen',
    'AVBRYT_SØKNAD' = 'avbrytSøknad',
}

interface SetVelkommen {
    type: ForeldrepengesøknadContextActionKeys.SET_VELKOMMEN;
    payload: VelkommenFormData;
}

const setVelkommen = (payload: VelkommenFormData): SetVelkommen => ({
    type: ForeldrepengesøknadContextActionKeys.SET_VELKOMMEN,
    payload,
});

interface AvbrytSøknad {
    type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD;
}

const avbrytSøknad = (): AvbrytSøknad => ({
    type: ForeldrepengesøknadContextActionKeys.AVBRYT_SØKNAD,
});

export type ForeldrepengesøknadContextAction = SetVelkommen | AvbrytSøknad;

export default {
    setVelkommen,
    avbrytSøknad,
};
