import { Søkerinfo } from '../../../types/søkerinfo';
import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';

export enum UttaksplanSkjemaScenario {
    's1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan' = 's2_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan',
    's2_alleFødselAdopsjon_deltPlan' = 's2_alleFødselAdopsjon_deltPlan',
    's3_morFødselFørsteganggsøknad' = 's3_morFødselFørsteganggsøknad',
    's4_morFarAdopsjonFørstegangssøknad' = 's4_morFarAdopsjonFørstegangssøknad',
    's5_farMedmorAleneomsorgFødselAdopsjon' = 's5_farMedmorAleneomsorgFødselAdopsjon',
    's6_bareFarMedmorRettTilFpFødsel' = 's6_bareFarMedmorRettTilFpFødsel',
    's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan' = 's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan',
    's8_ukjent_x' = 'ukjent'
}

export const getUttaksplanSkjemaScenario = (søknad: Søknad, søkerinfo: Søkerinfo): UttaksplanSkjemaScenario => {
    const søkerErFarEllerMedmor = erFarEllerMedmor(søkerinfo.person.kjønn, søknad.søker.rolle);
    const søkerErMor = !søkerErFarEllerMedmor;
    let scenario = UttaksplanSkjemaScenario.s8_ukjent_x;
    if (
        søkerErFarEllerMedmor &&
        søknad.situasjon === Søkersituasjon.FØDSEL &&
        søknad.annenForelder.harRettPåForeldrepenger
    ) {
        scenario = UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan;
    } else if (
        søkerErMor &&
        (søknad.situasjon === Søkersituasjon.FØDSEL || søknad.situasjon === Søkersituasjon.ADOPSJON)
    ) {
        scenario = UttaksplanSkjemaScenario.s3_morFødselFørsteganggsøknad;
    }

    return scenario;
};
