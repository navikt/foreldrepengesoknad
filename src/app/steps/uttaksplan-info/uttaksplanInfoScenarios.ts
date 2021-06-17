// import AnnenForelder from "app/context/types/AnnenForelder";
// import Søker from "app/context/types/Søker";
// import Søkersituasjon from "app/context/types/Søkersituasjon";
// import { Søknad } from "app/context/types/Søknad";

// export enum UttaksplanSkjemaScenario {
//     's1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan' = 's1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan',
//     's2_alleFødselAdopsjon_deltPlan' = 's2_alleFødselAdopsjon_deltPlan',
//     's3_morFødsel' = 's3_morFødsel',
//     's4_morFarAdopsjon' = 's4_morFarAdopsjon',
//     's5_farMedmorAleneomsorgFødselAdopsjon' = 's5_farMedmorAleneomsorgFødselAdopsjon',
//     's6_bareFarMedmorRettTilFpFødsel' = 's6_bareFarMedmorRettTilFpFødsel',
//     's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan' = 's7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan',
//     's8_endringssøknad' = 's8_endringssøknad',
//     's9_førstegangssøknadMedAnnenPart' = 's9_førstegangssøknadMedAnnenPart',
//     'sX_ukjent_x' = 'ukjent',
// }

// export const getUttaksplanInfoScenarios = (
//     søker: Søker,
//     søknad: Søknad,
//     annenForelder: AnnenForelder,
//     situasjon: Søkersituasjon,
//     eksisterendeSak?: EksisterendeSak
// ): UttaksplanSkjemaScenario => {
//     let scenario = UttaksplanSkjemaScenario.sX_ukjent_x;

//     if (søknad.erEndringssøknad) {
//         scenario = UttaksplanSkjemaScenario.s8_endringssøknad;
//     } else if (
//         !søknad.erEndringssøknad &&
//         eksisterendeSak !== undefined &&
//         eksisterendeSak.erAnnenPartsSak &&
//         eksisterendeSak.uttaksplan &&
//         eksisterendeSak.grunnlag &&
//         eksisterendeSak.uttaksplan.length > 0 &&
//         skalKunneViseMorsUttaksplanForFarEllerMedmor(eksisterendeSak.grunnlag, søknadsinfo)
//     ) {
//         scenario = UttaksplanSkjemaScenario.s9_førstegangssøknadMedAnnenPart;
//     }

//     return scenario;
// };
