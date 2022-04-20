import Søknad from '../../../types/søknad/Søknad';
import {
    UttaksplanSkjemaScenario,
    getUttaksplanSkjemaScenario,
} from '../../../steg/uttaksplanSkjema/uttaksplanSkjemaScenario';
import { Søknadsinfo } from '../../../selectors/types';

export const uttaksplanSkjemaErGyldig = (søknad: Søknad, søknadsinfo?: Søknadsinfo): boolean => {
    if (søknad.dekningsgrad === undefined) {
        return false;
    }
    if (søknadsinfo === undefined) {
        return false;
    }
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    const scenario = getUttaksplanSkjemaScenario(søknadsinfo, søknad.ekstrainfo.eksisterendeSak);
    switch (scenario) {
        case UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan:
            return skjema.skalStarteRettEtterMor === false ? skjema.utsettelseEtterMorSkjemaValid === true : true;
        case UttaksplanSkjemaScenario.s3_morFødsel:
            const harSvartPåStartdato =
                søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon !== undefined ||
                søknad.ekstrainfo.uttaksplanSkjema.skalIkkeHaUttakFørTermin === true;
            return harSvartPåStartdato && skjema.fellesperiodeukerMor !== undefined;
        case UttaksplanSkjemaScenario.s4_morFarAdopsjon:
            return (
                skjema.startdatoPermisjon !== undefined ||
                (skjema.harAnnenForelderSøktFP === true && søknad.dekningsgrad !== undefined)
            );

        case UttaksplanSkjemaScenario.s5_farMedmorAleneomsorgFødselAdopsjon:
            return skjema.startdatoPermisjon !== undefined;

        case UttaksplanSkjemaScenario.s6_bareFarMedmorRettTilFpFødsel:
            return (
                skjema.startdatoPermisjon !== undefined ||
                (søknad.dekningsgrad !== undefined && søknad.annenForelder.erUfør === false)
            );

        case UttaksplanSkjemaScenario.s7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan:
            return skjema.skalHaDelAvFellesperiode !== undefined;

        default:
            return true;
    }
};
