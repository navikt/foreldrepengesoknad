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
                skjema.harAnnenForelderSøktFP !== undefined &&
                søknad.dekningsgrad !== undefined &&
                skjema.morSinSisteUttaksdag !== undefined &&
                skjema.skalStarteRettEtterMor !== undefined &&
                (skjema.skalStarteRettEtterMor === false ? skjema.utsettelseEtterMorSkjemaValid === true : true) &&
                skjema.skalHaDelAvFellesperiode !== undefined
            );
        case UttaksplanSkjemaScenario.s3_morFødselFørsteganggsøknad:
            return false;
        default:
            return true;
    }
};
