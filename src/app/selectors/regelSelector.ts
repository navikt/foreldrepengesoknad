import { getAntallBarn, getTilgjengeligeStønadskontoer } from './søknadSelector';
import { createSelector } from 'reselect';
import { getErDeltUttak } from 'app/util/uttaksplan/forslag/util';

const getErFlerbarnsSøknad = (antallBarn: number | undefined): boolean => antallBarn !== undefined && antallBarn > 1;

export const getRegler = createSelector(
    [getAntallBarn, getTilgjengeligeStønadskontoer],
    (antallBarn, tilgjengeligeStønadskontoer) => {
        return {
            erFlerbarnsSøknad: getErFlerbarnsSøknad(antallBarn),
            deltUttak: getErDeltUttak(tilgjengeligeStønadskontoer)
        };
    }
);
