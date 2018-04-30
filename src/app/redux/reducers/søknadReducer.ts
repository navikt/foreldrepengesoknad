import Søknad from '../../types/søknad/Søknad';
import {
  SøknadActionKeys,
  UpdateSøknadState,
  UpdateUtenlandsopphold
} from '../actions/søknad/søknadActionDefinitions';
import { updateUtenlandsoppholdState } from './utenlandsopphold';

const getDefaultState = (): Søknad => {
  return {
    navn: '',
    utenlandsopphold: []
  };
};

const søknadReducer = (
  state = getDefaultState(),
  action: UpdateSøknadState | UpdateUtenlandsopphold
) => {
  switch (action.type) {
    case SøknadActionKeys.UPDATE_SØKNAD_STATE:
      return {
        ...state,
        ...action.payload
      };
    case SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD:
      return {
        ...state,
        utenlandsopphold: updateUtenlandsoppholdState(
          action.payload,
          state.utenlandsopphold || []
        )
      };
  }
  return state;
};

export default søknadReducer;
