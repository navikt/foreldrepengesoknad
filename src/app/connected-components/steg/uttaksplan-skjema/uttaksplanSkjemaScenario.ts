import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import { getErSøkerFarEllerMedmor } from '../../../util/domain/personUtil';

export enum UttaksplanSkjemaScenario {
    's1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan' = 's1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan',
    's2_alleFødselAdopsjon_deltPlan' = 's2_alleFødselAdopsjon_deltPlan',
    's3_morFødsel' = 's3_morFødsel',
    's4_morFarAdopsjon' = 's4_morFarAdopsjon',
    's5_farMedmorAleneomsorgFødselAdopsjon' = 's5_farMedmorAleneomsorgFødselAdopsjon',
    's6_bareFarMedmorRettTilFpFødsel' = 's6_bareFarMedmorRettTilFpFødsel',
    's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan' = 's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan',
    's8_ukjent_x' = 'ukjent'
}

export const getUttaksplanSkjemaScenario = (søknad: Søknad): UttaksplanSkjemaScenario => {
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søknad.søker.rolle);
    const søkerErMor = !søkerErFarEllerMedmor;

    let scenario = UttaksplanSkjemaScenario.s8_ukjent_x;
    if (
        søkerErFarEllerMedmor &&
        søknad.situasjon === Søkersituasjon.FØDSEL &&
        søknad.annenForelder.harRettPåForeldrepenger
    ) {
        scenario = UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan;
    } else if (søkerErMor && søknad.situasjon === Søkersituasjon.FØDSEL) {
        scenario = UttaksplanSkjemaScenario.s3_morFødsel;
    } else if (
        søknad.situasjon === Søkersituasjon.ADOPSJON &&
        ((søknad.annenForelder.kanIkkeOppgis !== true && søknad.annenForelder.harRettPåForeldrepenger !== undefined) ||
            søknad.annenForelder.kanIkkeOppgis === true)
    ) {
        scenario = UttaksplanSkjemaScenario.s4_morFarAdopsjon;
    } else if (
        ((søknad.situasjon === Søkersituasjon.FØDSEL || søknad.situasjon === Søkersituasjon.ADOPSJON) &&
            søkerErFarEllerMedmor &&
            søknad.søker.erAleneOmOmsorg === true) ||
        (søkerErFarEllerMedmor && søknad.annenForelder.kanIkkeOppgis === true)
    ) {
        scenario = UttaksplanSkjemaScenario.s5_farMedmorAleneomsorgFødselAdopsjon;
    } else if (
        søknad.situasjon === Søkersituasjon.FØDSEL &&
        søkerErFarEllerMedmor &&
        søknad.annenForelder.harRettPåForeldrepenger === false
    ) {
        scenario = UttaksplanSkjemaScenario.s6_bareFarMedmorRettTilFpFødsel;
    } else if (søknad.situasjon === Søkersituasjon.ADOPSJON) {
        scenario = UttaksplanSkjemaScenario.s7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan;
    }

    return scenario;
};
