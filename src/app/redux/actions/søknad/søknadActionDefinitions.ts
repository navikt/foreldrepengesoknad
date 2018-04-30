import Søknad, { UtenlandsoppholdData } from '../../../types/søknad/Søknad';

export enum SøknadActionKeys {
  'UPDATE_SØKNAD_STATE' = 'updateSøknadState',
  'UPDATE_UTENLANDSOPPHOLD' = 'updateUtenlandsopphold'
}

export interface UpdateSøknadState {
  type: SøknadActionKeys.UPDATE_SØKNAD_STATE;
  payload: Søknad;
}

export type ListActionEvent = 'add' | 'update' | 'delete';

export interface UpdateUtenlandsopppholdPayload {
  action: ListActionEvent;
  utenlandsopphold: UtenlandsoppholdData;
}

export interface UpdateUtenlandsopphold {
  type: SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD;
  payload: UpdateUtenlandsopppholdPayload;
}
