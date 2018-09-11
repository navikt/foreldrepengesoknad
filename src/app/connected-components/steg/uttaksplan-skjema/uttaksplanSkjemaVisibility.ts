import Søknad from '../../../types/søknad/Søknad';
import { Søkerinfo } from '../../../types/søkerinfo';
import { getUttaksplanSkjemaScenario, UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';

export interface UttaksplanSkjemaStegVisibility {
    dekningsgradSpørsmål: boolean;
    startdatoPermisjonSpørsmål: boolean;
    morSinSisteUttaksdagSpørsmål: boolean;
    planlagtOppholdIUttakSpørsmål: boolean;
    fordelingFellesperiodeSpørsmål: boolean;
    harAnnenForelderSøktFPSpørsmål: boolean;
    skalStarteRettEtterMorSpørsmål: boolean;
    skalHaDelAvFellesperiodeSpørsmål: boolean;
    utsettelseEtterMor: boolean;
}

const defaultVisibility: UttaksplanSkjemaStegVisibility = {
    dekningsgradSpørsmål: false,
    startdatoPermisjonSpørsmål: false,
    morSinSisteUttaksdagSpørsmål: false,
    planlagtOppholdIUttakSpørsmål: false,
    fordelingFellesperiodeSpørsmål: false,
    harAnnenForelderSøktFPSpørsmål: false,
    skalStarteRettEtterMorSpørsmål: false,
    skalHaDelAvFellesperiodeSpørsmål: false,
    utsettelseEtterMor: false
};

const getUttaksplanSkjemaStegVisibility = (søknad: Søknad, søkerinfo: Søkerinfo): UttaksplanSkjemaStegVisibility => {
    const { uttaksplanSkjema } = søknad.ekstrainfo;
    let vis: UttaksplanSkjemaStegVisibility = { ...defaultVisibility };

    const scenario = getUttaksplanSkjemaScenario(søknad, søkerinfo);
    if (scenario === UttaksplanSkjemaScenario['1-farMedmor-fødsel-førsteganggsøknad-beggeHarRett']) {
        vis = {
            ...vis,
            harAnnenForelderSøktFPSpørsmål: true,
            dekningsgradSpørsmål: uttaksplanSkjema.harAnnenForelderSøktFP !== undefined,
            morSinSisteUttaksdagSpørsmål: søknad.dekningsgrad !== undefined,
            skalStarteRettEtterMorSpørsmål: uttaksplanSkjema.morSinSisteUttaksdag !== undefined,
            utsettelseEtterMor: uttaksplanSkjema.skalStarteRettEtterMor === false,
            skalHaDelAvFellesperiodeSpørsmål: uttaksplanSkjema.skalStarteRettEtterMor !== undefined
        };
    } else if (scenario === UttaksplanSkjemaScenario['3-mor-fødsel-førsteganggsøknad']) {
        const harValgtStartdato =
            uttaksplanSkjema.startdatoPermisjon !== undefined || uttaksplanSkjema.skalIkkeHaUttakFørTermin === true;
        vis = {
            ...vis,
            dekningsgradSpørsmål: true,
            startdatoPermisjonSpørsmål: søknad.dekningsgrad !== undefined,
            planlagtOppholdIUttakSpørsmål: harValgtStartdato,
            fordelingFellesperiodeSpørsmål:
                !søknad.søker.erAleneOmOmsorg && uttaksplanSkjema.harPlanlagtOppholdIUttak !== undefined
        };
    }
    return vis;
};

export default getUttaksplanSkjemaStegVisibility;
