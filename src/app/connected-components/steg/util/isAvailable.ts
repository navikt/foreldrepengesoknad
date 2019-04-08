import { StegID } from '../../../util/routing/stegConfig';
import Søknad from '../../../types/søknad/Søknad';
import {
    søknadGjelderAdopsjon,
    søknadGjelderForeldreansvar,
    søknadGjelderFødsel
} from '../../../util/validation/situasjon';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import { annenForelderErGyldig } from '../../../util/validation/steg/annenForelder';
import { utenlandsoppholdErGyldig } from '../../../util/validation/steg/utenlandsopphold';
import { Søkerinfo } from '../../../types/søkerinfo';
import { uttaksplanSkjemaErGyldig } from '../../../util/validation/steg/uttaksplanSkjema';
import { annenInntektErGyldig } from '../../../util/validation/steg/annenInntekt';
import { Søknadsinfo } from '../../../selectors/types';

const harGodkjentVilkår = (søknad: Søknad) => søknad.harGodkjentVilkår === true;

const isAvailable = (stegId: StegID, søknad: Søknad, søkerinfo: Søkerinfo, søknadsinfo?: Søknadsinfo): boolean => {
    switch (stegId) {
        case StegID.INNGANG:
            return harGodkjentVilkår(søknad);
        case StegID.RELASJON_TIL_BARN_FØDSEL:
            return harGodkjentVilkår(søknad) && søknadGjelderFødsel(søknad);
        case StegID.RELASJON_TIL_BARN_ADOPSJON:
            return harGodkjentVilkår(søknad) && søknadGjelderAdopsjon(søknad);
        case StegID.RELASJON_TIL_BARN_FORELDREANSVAR:
            return harGodkjentVilkår(søknad) && søknadGjelderForeldreansvar(søknad);
        case StegID.ANNEN_FORELDER:
            return harGodkjentVilkår(søknad) && barnErGyldig(søknad, søkerinfo);
        case StegID.UTTAKSPLAN_SKJEMA:
            return (
                harGodkjentVilkår(søknad) && barnErGyldig(søknad, søkerinfo) && annenForelderErGyldig(søknad, søkerinfo)
            );
        case StegID.UTTAKSPLAN:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(søknad, søkerinfo) &&
                annenForelderErGyldig(søknad, søkerinfo) &&
                uttaksplanSkjemaErGyldig(søknad, søknadsinfo)
            );
        case StegID.UTENLANDSOPPHOLD:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(søknad, søkerinfo) &&
                annenForelderErGyldig(søknad, søkerinfo) &&
                uttaksplanSkjemaErGyldig(søknad, søknadsinfo)
            );
        case StegID.ANDRE_INNTEKTER:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(søknad, søkerinfo) &&
                annenForelderErGyldig(søknad, søkerinfo) &&
                uttaksplanSkjemaErGyldig(søknad, søknadsinfo) &&
                utenlandsoppholdErGyldig(søknad)
            );
        case StegID.MANGLENDE_VEDLEGG:
            return true;
        case StegID.OPPSUMMERING:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(søknad, søkerinfo) &&
                annenForelderErGyldig(søknad, søkerinfo) &&
                uttaksplanSkjemaErGyldig(søknad, søknadsinfo) &&
                (søknad.erEndringssøknad === false ? utenlandsoppholdErGyldig(søknad) : true) &&
                (søknad.erEndringssøknad === false ? annenInntektErGyldig(søknad.søker) : true)
            );
        default:
            return false;
    }
};

export default isAvailable;
