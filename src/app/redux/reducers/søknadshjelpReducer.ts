// import {
//     CommonActionKeys,
//     CommonActionTypes
// } from '../actions/søknadshjelp/søknadshjelpActionDefinitions';
import { RegistrertBarn } from '../../types/Person';

const getDefaultState = (): SøknadshjelpState => ({
    søknadenGjelder: undefined
});

export interface SøknadshjelpState {
    søknadenGjelder?: {
        registrerteBarn: RegistrertBarn[];
        annetBarn: boolean;
    };
}
// type SøknadshjelpStatePartial = Partial<SøknadshjelpState>;

const søknadshjelperReducer = (
    state = getDefaultState(),
    action: any
): SøknadshjelpState => {
    switch (
        action.type
        // case CommonActionKeys.SET_SPRÅK:
        //     return updateCommonState(state, { språkkode: action.språkkode });
    ) {
    }
    return state;
};

export default søknadshjelperReducer;
