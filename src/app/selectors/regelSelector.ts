import {
    getSituasjon,
    getDekningsgrad,
    getSøkerErAleneOmOmsorg,
    getSøkerRolle,
    getAntallBarn,
    getAnnenForelderHarRettPåForeldrepenger,
    getAnnenForelderKanIkkeOppgis,
    getTilgjengeligeStønadskontoer
} from './søknadSelector';
import { createSelector } from 'reselect';
import { getErDeltUttak } from 'app/util/uttaksplan/forslag/util';

const getErFlerbarnsSøknad = (antallBarn: number | undefined): boolean => antallBarn !== undefined && antallBarn > 1;

export const getRegler = createSelector(
    [
        getSituasjon,
        getDekningsgrad,
        getSøkerErAleneOmOmsorg,
        getSøkerRolle,
        getAntallBarn,
        getAnnenForelderHarRettPåForeldrepenger,
        getAnnenForelderKanIkkeOppgis,
        getTilgjengeligeStønadskontoer
    ],
    (
        situasjon,
        dekningsgrad,
        søkerErAleneOmOmsorg,
        søkerRolle,
        antallBarn,
        annenForelderHarRettPåForeldrepenger,
        annenForelderKanIkkeOppgis,
        tilgjengeligeStønadskontoer
    ) => {
        return {
            erFlerbarnsSøknad: getErFlerbarnsSøknad(antallBarn),
            deltUttak: getErDeltUttak(tilgjengeligeStønadskontoer)
        };
    }
);
