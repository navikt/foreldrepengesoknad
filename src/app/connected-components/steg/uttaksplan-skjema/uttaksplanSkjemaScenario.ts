import { Søkerinfo } from '../../../types/søkerinfo';
import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';

export enum UttaksplanSkjemaScenario {
    's1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan' = '1',
    's2_alleFødselAdopsjon_deltPlan' = '2',
    's3_morFødselFørsteganggsøknad' = '3',
    's4_morFarAdopsjonFørstegangssøknad' = '4',
    's5_farMedmorAleneomsorgFødselAdopsjon' = '5',
    's6_bareFarMedmorRettTilFpFødsel' = '6',
    's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan' = '7',
    's8_ukjent_x' = '8'
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
