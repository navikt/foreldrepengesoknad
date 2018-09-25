import Søknad, { SøkerRolle, Søkersituasjon } from '../../types/søknad/Søknad';
import { GetTilgjengeligeStønadskontoerParams } from '../../api/api';
import { erFarEllerMedmor as erFarEllerMedmorSjekk } from '../domain/personUtil';
import Person from '../../types/Person';
import { getFamiliehendelsedato } from './index';

export const getStønadskontoParams = (søknad: Søknad, person: Person): GetTilgjengeligeStønadskontoerParams => {
    const { barn, situasjon, dekningsgrad, søker, annenForelder } = søknad;
    const { erAleneOmOmsorg, rolle } = søker;
    const { antallBarn } = barn;
    const { harRettPåForeldrepenger } = annenForelder;
    const erFarEllerMedmor = erFarEllerMedmorSjekk(person.kjønn, rolle);

    const familiehendelsesdato = getFamiliehendelsedato(barn, situasjon);
    const dekningsgradValue = dekningsgrad === '80' ? '80' : '100';
    const morHarAleneomsorg = !erFarEllerMedmor && (erAleneOmOmsorg || søknad.annenForelder.kanIkkeOppgis);
    const morHarRett = rolle === SøkerRolle.MOR || (erFarEllerMedmor && harRettPåForeldrepenger === true);
    const farEllerMedmorHarAleneomsorg = erFarEllerMedmor && (erAleneOmOmsorg || søknad.annenForelder.kanIkkeOppgis);
    const farEllerMedmorHarRett = erFarEllerMedmor || (rolle === SøkerRolle.MOR && harRettPåForeldrepenger === true);

    return {
        antallBarn,
        familiehendelsesdato,
        dekningsgrad: dekningsgradValue,
        morHarRett,
        morHarAleneomsorg,
        farHarRett: farEllerMedmorHarRett,
        farHarAleneomsorg: farEllerMedmorHarAleneomsorg,
        erFødsel: situasjon === Søkersituasjon.FØDSEL
    };
};
