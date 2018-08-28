import { StegID } from '../../util/routing/stegConfig';
import Søknad from '../../types/søknad/Søknad';
import {
    søknadGjelderAdopsjon,
    søknadGjelderForeldreansvar,
    søknadGjelderFødsel
} from '../../util/validation/fields/situasjon';
import { barnErGyldig } from '../../util/validation/steg/barn';
import { annenForelderErGyldig } from '../../util/validation/steg/annenForelder';
import Person from '../../types/Person';
import { utenlandsoppholdErGyldig } from '../../util/validation/steg/utenlandsopphold';
import { Søkerinfo } from '../../types/søkerinfo';

const harGodkjentVilkår = (søknad: Søknad) => søknad.harGodkjentVilkår === true;

const isAvailable = (
    stegId: StegID,
    søknad: Søknad,
    søkerinfo: Søkerinfo
): boolean => {
    const { person } = søkerinfo;

    switch (stegId) {
        case StegID.INNGANG:
            return harGodkjentVilkår(søknad);

        case StegID.RELASJON_TIL_BARN_FØDSEL:
            return harGodkjentVilkår(søknad) && søknadGjelderFødsel(søknad);
        case StegID.RELASJON_TIL_BARN_ADOPSJON:
            return harGodkjentVilkår(søknad) && søknadGjelderAdopsjon(søknad);
        case StegID.RELASJON_TIL_BARN_FORELDREANSVAR:
            return (
                harGodkjentVilkår(søknad) && søknadGjelderForeldreansvar(søknad)
            );

        case StegID.ANNEN_FORELDER:
            return harGodkjentVilkår(søknad) && barnErGyldig(søknad, søkerinfo);

        case StegID.UTENLANDSOPPHOLD:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(søknad, søkerinfo) &&
                annenForelderErGyldig(
                    søknad,
                    person as Person,
                    søknad.temp.registrertAnnenForelder
                )
            );

        case StegID.ANDRE_INNTEKTER:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(søknad, søkerinfo) &&
                annenForelderErGyldig(
                    søknad,
                    person as Person,
                    søknad.temp.registrertAnnenForelder
                ) &&
                utenlandsoppholdErGyldig(søknad)
            );

        default:
            return false;
    }
};

export default isAvailable;
