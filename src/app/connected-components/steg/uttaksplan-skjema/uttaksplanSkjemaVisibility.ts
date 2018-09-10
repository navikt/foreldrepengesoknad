import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import { Søkerinfo } from '../../../types/søkerinfo';

export interface UttaksplanSkjemaStegVisibility {
    dekningsgradSpørsmål: boolean;
    startdatoPermisjonSpørsmål: boolean;
    morSinSisteUttaksdagSpørsmål: boolean;
    planlagtOppholdIUttakSpørsmål: boolean;
    fordelingFellesperiodeSpørsmål: boolean;
    harAnnenForelderSøktFPSpørsmål: boolean;
    skalStarteRettEtterMorSpørsmål: boolean;
    skalHaDelAvFellesperiodeSpørsmål: boolean;
}

const defaultVisibility = {
    dekningsgradSpørsmål: false,
    startdatoPermisjonSpørsmål: false,
    morSinSisteUttaksdagSpørsmål: false,
    planlagtOppholdIUttakSpørsmål: false,
    fordelingFellesperiodeSpørsmål: false,
    harAnnenForelderSøktFPSpørsmål: false,
    skalStarteRettEtterMorSpørsmål: false,
    skalHaDelAvFellesperiodeSpørsmål: false
};

const getUttaksplanSkjemaStegVisibility = (søknad: Søknad, søkerinfo: Søkerinfo): UttaksplanSkjemaStegVisibility => {
    const { uttaksplanSkjema } = søknad.ekstrainfo;
    const søkerErFarEllerMedmor = erFarEllerMedmor(søkerinfo.person.kjønn, søknad.søker.rolle);

    let vis: UttaksplanSkjemaStegVisibility = { ...defaultVisibility };

    if (søkerErFarEllerMedmor && søknad.annenForelder.harRettPåForeldrepenger) {
        vis = {
            ...vis,
            harAnnenForelderSøktFPSpørsmål: true,
            dekningsgradSpørsmål: uttaksplanSkjema.harAnnenForelderSøktFP !== undefined,
            morSinSisteUttaksdagSpørsmål: søknad.dekningsgrad !== undefined,
            skalStarteRettEtterMorSpørsmål: uttaksplanSkjema.morSinSisteUttaksdag !== undefined,
            skalHaDelAvFellesperiodeSpørsmål: uttaksplanSkjema.skalStarteRettEtterMor !== undefined
        };
    } else if (!søkerErFarEllerMedmor && søknad.situasjon === Søkersituasjon.FØDSEL && søknad.søker.erAleneOmOmsorg) {
        const harValgtStartdato =
            uttaksplanSkjema.startdatoPermisjon !== undefined || uttaksplanSkjema.skalIkkeHaUttakFørTermin === true;
        vis = {
            ...vis,
            dekningsgradSpørsmål: true,
            startdatoPermisjonSpørsmål: søknad.dekningsgrad !== undefined,
            fordelingFellesperiodeSpørsmål: harValgtStartdato,
            planlagtOppholdIUttakSpørsmål: harValgtStartdato
        };
    }
    return vis;
};

export default getUttaksplanSkjemaStegVisibility;
