import Søknad, { SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import { Søkerinfo } from '../../../types/s\u00F8kerinfo';

export interface UttaksplanSkjemaStegVisibility {
    dekningsgradSpørsmål: boolean;
    startdatoPermisjonSpørsmål: boolean;
    morSinSisteUttaksdagSpørsmål: boolean;
    planlagtOppholdIUttakSpørsmål: boolean;
    fordelingFellesperiodeSpørsmål: boolean;
}

const visDekningsgradSpørsmål = (rolle: SøkerRolle, situasjon: Søkersituasjon, søkerinfo: Søkerinfo): boolean => {
    if (!søkerinfo.søknadsinfo.deltUttaksplan) {
        return true;
    }
    if (situasjon === Søkersituasjon.FØDSEL) {
        return rolle === SøkerRolle.MOR;
    }
    return false;
};

const getUttaksplanSkjemaStegVisibility = (søknad: Søknad, søkerinfo: Søkerinfo): UttaksplanSkjemaStegVisibility => {
    const { uttaksplanSkjema } = søknad.ekstrainfo;
    const { søknadsinfo } = søkerinfo;

    const søkerErFarEllerMedmor = erFarEllerMedmor(søkerinfo.person.kjønn, søknad.søker.rolle);
    const dekningsgradSpørsmål = visDekningsgradSpørsmål(søknad.søker.rolle, søknad.situasjon, søkerinfo);
    const startdatoPermisjonSpørsmål =
        søkerErFarEllerMedmor === false &&
        !søknadsinfo.deltUttaksplan &&
        dekningsgradSpørsmål &&
        søknad.dekningsgrad !== undefined;
    const morSinSisteUttaksdagSpørsmål =
        søkerErFarEllerMedmor &&
        !søknadsinfo.deltUttaksplan &&
        dekningsgradSpørsmål &&
        søknad.dekningsgrad !== undefined;

    const fordelingFellesperiodeSpørsmål =
        uttaksplanSkjema.skalIkkeHaUttakFørTermin !== undefined ||
        søknad.ekstrainfo.uttaksplanSkjema.morSinSisteUttaksdag !== undefined;

    const planlagtOppholdIUttakSpørsmål = false; // Egen brukerhistorie som ikke er med enda

    return {
        dekningsgradSpørsmål,
        startdatoPermisjonSpørsmål,
        morSinSisteUttaksdagSpørsmål,
        planlagtOppholdIUttakSpørsmål,
        fordelingFellesperiodeSpørsmål
    };
};

export default getUttaksplanSkjemaStegVisibility;
