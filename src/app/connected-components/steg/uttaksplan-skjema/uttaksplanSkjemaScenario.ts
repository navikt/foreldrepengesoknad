import { Søkerinfo } from '../../../types/s\u00F8kerinfo';
import Søknad, { Søkersituasjon } from '../../../types/s\u00F8knad/S\u00F8knad';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';

export enum UttaksplanSkjemaScenario {
    '1-farMedmor-fødsel-førsteganggsøknad-beggeHarRett',
    '2-',
    '3-mor-fødsel-førsteganggsøknad',
    'x-ukjent'
}

export const getUttaksplanSkjemaScenario = (søknad: Søknad, søkerinfo: Søkerinfo): UttaksplanSkjemaScenario => {
    const søkerErFarEllerMedmor = erFarEllerMedmor(søkerinfo.person.kjønn, søknad.søker.rolle);
    const søkerErMor = !søkerErFarEllerMedmor;

    if (
        søkerErFarEllerMedmor &&
        søknad.situasjon === Søkersituasjon.FØDSEL &&
        søknad.annenForelder.harRettPåForeldrepenger
    ) {
        return UttaksplanSkjemaScenario['1-farMedmor-fødsel-førsteganggsøknad-beggeHarRett'];
    } else if (
        søkerErMor &&
        (søknad.situasjon === Søkersituasjon.FØDSEL || søknad.situasjon === Søkersituasjon.ADOPSJON)
    ) {
        return UttaksplanSkjemaScenario['3-mor-fødsel-førsteganggsøknad-aleneomsorg'];
    }
    return UttaksplanSkjemaScenario['x-ukjent'];
};
