import { Søkerinfo } from '../../../types/søkerinfo';
import Søknad from '../../../types/søknad/Søknad';
import {
    getUttaksplanSkjemaScenario,
    UttaksplanSkjemaScenario
} from '../../../connected-components/steg/uttaksplan-skjema/uttaksplanSkjemaScenario';

export const uttaksplanSkjemaErGyldig = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    const scenario = getUttaksplanSkjemaScenario(søknad, søkerinfo);
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    switch (scenario) {
        case UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan:
            return (
                (skjema.skalStarteRettEtterMor === false ? skjema.utsettelseEtterMorSkjemaValid === true : true) &&
                skjema.skalHaDelAvFellesperiode !== undefined
            );
        case UttaksplanSkjemaScenario.s3_morFødselFørsteganggsøknad:
            return (
                (skjema.harPlanlagtOppholdIUttak
                    ? skjema.planlagtOppholdSkjemaValid === true
                    : skjema.harPlanlagtOppholdIUttak === false) && skjema.fellesperiodeukerForelder1 !== undefined
            );
        case UttaksplanSkjemaScenario.s4_morFarAdopsjonFørstegangssøknad:
            return (
                skjema.startdatoPermisjon !== undefined &&
                (skjema.harPlanlagtOppholdIUttak === true
                    ? skjema.planlagtOppholdSkjemaValid === true
                    : skjema.harPlanlagtOppholdIUttak === false)
            );

        case UttaksplanSkjemaScenario.s6_bareFarMedmorRettTilFpFødsel:
            return (
                skjema.startdatoPermisjon !== undefined &&
                (skjema.harPlanlagtOppholdIUttak === true
                    ? skjema.planlagtOppholdSkjemaValid === true
                    : skjema.harPlanlagtOppholdIUttak === false)
            );

        default:
            return true;
    }
};
