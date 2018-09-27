import Søknad from '../../../types/søknad/Søknad';
import {
    getUttaksplanSkjemaScenario,
    UttaksplanSkjemaScenario
} from '../../../connected-components/steg/uttaksplan-skjema/uttaksplanSkjemaScenario';

export const uttaksplanSkjemaErGyldig = (søknad: Søknad): boolean => {
    const scenario = getUttaksplanSkjemaScenario(søknad);
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    switch (scenario) {
        case UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan:
            return (
                (skjema.skalStarteRettEtterMor === false ? skjema.utsettelseEtterMorSkjemaValid === true : true) &&
                skjema.skalHaDelAvFellesperiode !== undefined
            );
        case UttaksplanSkjemaScenario.s3_morFødsel:
            const harSvartPåStartdato =
                søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon !== undefined ||
                søknad.ekstrainfo.uttaksplanSkjema.skalIkkeHaUttakFørTermin === true;
            return harSvartPåStartdato && skjema.fellesperiodeukerMor !== undefined;
        case UttaksplanSkjemaScenario.s4_morFarAdopsjon:
            return skjema.startdatoPermisjon !== undefined;

        case UttaksplanSkjemaScenario.s5_farMedmorAleneomsorgFødselAdopsjon:
            return skjema.startdatoPermisjon !== undefined;

        case UttaksplanSkjemaScenario.s6_bareFarMedmorRettTilFpFødsel:
            return skjema.startdatoPermisjon !== undefined;

        case UttaksplanSkjemaScenario.s7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan:
            return skjema.skalHaDelAvFellesperiode !== undefined;

        default:
            return true;
    }
};
