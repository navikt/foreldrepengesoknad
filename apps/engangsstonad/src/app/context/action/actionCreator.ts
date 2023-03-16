import { OmBarnetFormData } from 'app/steps/om-barnet/omBarnetFormConfig';
import Kvittering from 'app/types/services/Kvittering';
import { UtenlandsoppholdFormData } from 'app/steps/utenlandsopphold/utenlandsoppholdFormTypes';
import { VelkommenFormData } from 'app/pages/velkommen/velkommenFormConfig';
import { SøkersituasjonFormData } from 'app/steps/søkersituasjon/søkersituasjonFormConfig';

export enum EngangsstønadContextActionKeys {
    'SET_SØKERSITUASJON' = 'setSøkersituasjon',
    'SET_OM_BARNET' = 'setOmBarnet',
    'SET_UTENLANDSOPPHOLD' = 'setUtenlandsopphold',
    'SET_VELKOMMEN' = 'setVelkommen',
    'SET_KVITTERING' = 'setKvittering',
    'AVBRYT_SØKNAD' = 'avbrytSøknad',
}

interface AvbrytSøknad {
    type: EngangsstønadContextActionKeys.AVBRYT_SØKNAD;
}

const avbrytSøknad = (): AvbrytSøknad => ({
    type: EngangsstønadContextActionKeys.AVBRYT_SØKNAD,
});

interface SetKvittering {
    type: EngangsstønadContextActionKeys.SET_KVITTERING;
    payload: Kvittering;
}

const setKvittering = (payload: Kvittering): SetKvittering => ({
    type: EngangsstønadContextActionKeys.SET_KVITTERING,
    payload,
});

interface SetVelkommen {
    type: EngangsstønadContextActionKeys.SET_VELKOMMEN;
    payload: VelkommenFormData;
}

const setVelkommen = (payload: VelkommenFormData): SetVelkommen => ({
    type: EngangsstønadContextActionKeys.SET_VELKOMMEN,
    payload,
});

interface SetSøkersituasjon {
    type: EngangsstønadContextActionKeys.SET_SØKERSITUASJON;
    payload: SøkersituasjonFormData;
}

const setSøkersituasjon = (payload: SøkersituasjonFormData): SetSøkersituasjon => ({
    type: EngangsstønadContextActionKeys.SET_SØKERSITUASJON,
    payload,
});

interface SetUtenlandsopphold {
    type: EngangsstønadContextActionKeys.SET_UTENLANDSOPPHOLD;
    payload: UtenlandsoppholdFormData;
}

const setUtenlandsopphold = (payload: UtenlandsoppholdFormData): SetUtenlandsopphold => ({
    type: EngangsstønadContextActionKeys.SET_UTENLANDSOPPHOLD,
    payload,
});

interface SetOmBarnet {
    type: EngangsstønadContextActionKeys.SET_OM_BARNET;
    payload: OmBarnetFormData;
}

const setOmBarnet = (payload: OmBarnetFormData): SetOmBarnet => ({
    type: EngangsstønadContextActionKeys.SET_OM_BARNET,
    payload,
});

export type EngangsstønadContextAction =
    | SetOmBarnet
    | SetSøkersituasjon
    | SetUtenlandsopphold
    | SetVelkommen
    | SetKvittering
    | AvbrytSøknad;

export default {
    setVelkommen,
    setSøkersituasjon,
    setOmBarnet,
    setUtenlandsopphold,
    setKvittering,
    avbrytSøknad,
};
