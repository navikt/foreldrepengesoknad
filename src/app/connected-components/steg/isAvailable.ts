import { StegID } from '../../util/routing/stegConfig';
import Søknad from '../../types/søknad/Søknad';
import {
    søknadGjelderAdopsjon,
    søknadGjelderForeldreansvar,
    søknadGjelderFødsel,
    søknadGjelderStebarn
} from '../../util/validation/fields/situasjon';
import { barnErGyldig } from '../../util/validation/steg/barn';
import { AppState } from '../../redux/reducers/index';
import { annenForelderErGyldig } from '../../util/validation/steg/annenForelder';
import Person from '../../types/Person';
import { utenlandsoppholdErGyldig } from '../../util/validation/steg/utenlandsopphold';

const harGodkjentVilkår = (søknad: Søknad) => søknad.harGodkjentVilkår === true;

const isAvailable = (stegId: StegID, state: AppState): boolean => {
    const { søknad, api } = state;
    const { barn, situasjon } = søknad;
    const { person, registrertAnnenForelder } = api;

    switch (stegId) {
        case StegID.INNGANG:
            return harGodkjentVilkår(søknad);

        case StegID.RELASJON_TIL_BARN_FØDSEL:
            return harGodkjentVilkår(søknad) && søknadGjelderFødsel(søknad);
        case StegID.RELASJON_TIL_BARN_ADOPSJON:
            return harGodkjentVilkår(søknad) && søknadGjelderAdopsjon(søknad);
        case StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON:
            return harGodkjentVilkår(søknad) && søknadGjelderStebarn(søknad);
        case StegID.RELASJON_TIL_BARN_FORELDREANSVAR:
            return (
                harGodkjentVilkår(søknad) && søknadGjelderForeldreansvar(søknad)
            );

        case StegID.ANNEN_FORELDER:
            return harGodkjentVilkår(søknad) && barnErGyldig(barn, situasjon);

        case StegID.UTENLANDSOPPHOLD:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(barn, situasjon) &&
                annenForelderErGyldig(
                    søknad,
                    person as Person,
                    registrertAnnenForelder
                )
            );

        case StegID.ANDRE_INNTEKTER:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(barn, situasjon) &&
                annenForelderErGyldig(
                    søknad,
                    person as Person,
                    registrertAnnenForelder
                ) &&
                utenlandsoppholdErGyldig(søknad)
            );

        default:
            return false;
    }
};

export default isAvailable;
