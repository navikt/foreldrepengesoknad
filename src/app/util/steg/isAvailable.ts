import { StegID } from '../routing/stegConfig';
import Søknad from '../../types/søknad/Søknad';
import { søknadGjelderAdopsjon, søknadGjelderForeldreansvar, søknadGjelderFødsel } from '../validation/situasjon';
import { barnErGyldig } from '../validation/steg/barn';
import { annenForelderErGyldig } from '../validation/steg/annenForelder';
import { utenlandsoppholdErGyldig } from '../validation/steg/utenlandsopphold';
import { Søkerinfo } from '../../types/søkerinfo';
import { uttaksplanSkjemaErGyldig } from '../validation/steg/uttaksplanSkjema';
import { annenInntektErGyldig } from '../validation/steg/annenInntekt';
import { Søknadsinfo } from '../../selectors/types';

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
            if (søknad.erEndringssøknad && søknad.ekstrainfo.eksisterendeSak) {
                return true;
            }
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
                utenlandsoppholdErGyldig(søknad.informasjonOmUtenlandsopphold)
            );
        case StegID.MANGLENDE_VEDLEGG:
            return (
                harGodkjentVilkår(søknad) &&
                barnErGyldig(søknad, søkerinfo) &&
                annenForelderErGyldig(søknad, søkerinfo) &&
                uttaksplanSkjemaErGyldig(søknad, søknadsinfo) &&
                utenlandsoppholdErGyldig(søknad.informasjonOmUtenlandsopphold) &&
                annenInntektErGyldig(søknad.søker)
            );
        case StegID.OPPSUMMERING:
            const erEnkelEndringssøknad = søknad.ekstrainfo.erEnkelEndringssøknad === true;
            const barnStegGyldig = erEnkelEndringssøknad || barnErGyldig(søknad, søkerinfo);
            const annenForelderStegGyldig = erEnkelEndringssøknad || annenForelderErGyldig(søknad, søkerinfo);
            const uttaksplanStegGyldig = erEnkelEndringssøknad || uttaksplanSkjemaErGyldig(søknad, søknadsinfo);
            return (
                harGodkjentVilkår(søknad) &&
                barnStegGyldig &&
                annenForelderStegGyldig &&
                uttaksplanStegGyldig &&
                (søknad.erEndringssøknad === false
                    ? utenlandsoppholdErGyldig(søknad.informasjonOmUtenlandsopphold)
                    : true) &&
                (søknad.erEndringssøknad === false ? annenInntektErGyldig(søknad.søker) : true) &&
                søknadsinfo !== undefined
            );
        default:
            return false;
    }
};

export default isAvailable;
