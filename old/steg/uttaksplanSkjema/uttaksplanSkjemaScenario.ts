import { Søkersituasjon } from '../../types/søknad/Søknad';
import { Søknadsinfo } from '../../selectors/types';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { skalKunneViseMorsUttaksplanForFarEllerMedmor } from 'app/util/uttaksplan/uttakUtils';

export enum UttaksplanSkjemaScenario {
    's1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan' = 's1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan',
    's2_alleFødselAdopsjon_deltPlan' = 's2_alleFødselAdopsjon_deltPlan',
    's3_morFødsel' = 's3_morFødsel',
    's4_morFarAdopsjon' = 's4_morFarAdopsjon',
    's5_farMedmorAleneomsorgFødselAdopsjon' = 's5_farMedmorAleneomsorgFødselAdopsjon',
    's6_bareFarMedmorRettTilFpFødsel' = 's6_bareFarMedmorRettTilFpFødsel',
    's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan' = 's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan',
    's8_endringssøknad' = 's8_endringssøknad',
    's9_førstegangssøknadMedAnnenPart' = 's9_førstegangssøknadMedAnnenPart',
    'sX_ukjent_x' = 'ukjent',
}

export const getUttaksplanSkjemaScenario = (
    søknadsinfo: Søknadsinfo,
    eksisterendeSak?: EksisterendeSak
): UttaksplanSkjemaScenario => {
    const { søker, søknaden, annenForelder } = søknadsinfo;
    let scenario = UttaksplanSkjemaScenario.sX_ukjent_x;
    if (søknaden.erEndringssøknad) {
        scenario = UttaksplanSkjemaScenario.s8_endringssøknad;
    } else if (
        !søknaden.erEndringssøknad &&
        eksisterendeSak !== undefined &&
        eksisterendeSak.erAnnenPartsSak &&
        eksisterendeSak.uttaksplan &&
        eksisterendeSak.grunnlag &&
        eksisterendeSak.uttaksplan.length > 0 &&
        skalKunneViseMorsUttaksplanForFarEllerMedmor(eksisterendeSak.grunnlag, søknadsinfo)
    ) {
        scenario = UttaksplanSkjemaScenario.s9_førstegangssøknadMedAnnenPart;
    } else if (søker.erFarEllerMedmor && søknaden.erFødsel && annenForelder.harRett) {
        scenario = UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan;
    } else if (søker.erMor && søknaden.erFødsel) {
        scenario = UttaksplanSkjemaScenario.s3_morFødsel;
    } else if (
        søknaden.situasjon === Søkersituasjon.ADOPSJON &&
        ((annenForelder.kanIkkeOppgis !== true && annenForelder.harRett !== undefined) ||
            annenForelder.kanIkkeOppgis === true ||
            søker.erAleneOmOmsorg)
    ) {
        scenario = UttaksplanSkjemaScenario.s4_morFarAdopsjon;
    } else if (
        ((søknaden.erFødsel || søknaden.erAdopsjon) && søker.erFarEllerMedmor && søker.erAleneOmOmsorg === true) ||
        (søker.erFarEllerMedmor && annenForelder.kanIkkeOppgis === true)
    ) {
        scenario = UttaksplanSkjemaScenario.s5_farMedmorAleneomsorgFødselAdopsjon;
    } else if (søknaden.erFødsel && søker.erFarEllerMedmor && annenForelder.harRett === false) {
        scenario = UttaksplanSkjemaScenario.s6_bareFarMedmorRettTilFpFødsel;
    } else if (søknaden.erAdopsjon) {
        scenario = UttaksplanSkjemaScenario.s7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan;
    }

    return scenario;
};
