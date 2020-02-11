import { createSelector } from 'reselect';
import Søknad, { SøkerRolle, SøknadEkstrainfo } from '../types/søknad/Søknad';
import { RecursivePartial } from '../types/Partial';
import { Dekningsgrad } from 'common/types';
import { AppState } from '../redux/reducers';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import { EksisterendeSak, Saksgrunnlag } from 'app/types/EksisterendeSak';
import { getEndretUttaksplanForInnsending, erPeriodeSomSkalSendesInn } from 'app/util/uttaksplan/uttaksplanEndringUtil';

export const søknadSelector = (state: AppState): RecursivePartial<Søknad> => state.søknad;

// Søknad
export const selectBarn = createSelector(
    [søknadSelector],
    (søknad = {}) => søknad.barn
);
export const selectSituasjon = createSelector(
    [søknadSelector],
    (søknad = {}) => søknad.situasjon
);
export const selectEkstrainfo = createSelector(
    [søknadSelector],
    (søknad = {}) => søknad.ekstrainfo
);
export const selectErEndringssøknad = createSelector(
    [søknadSelector],
    (søknad = {}): boolean => søknad.erEndringssøknad === true
);
export const selectErEnkelEndringssøknad = createSelector(
    [søknadSelector],
    (søknad = {}): boolean =>
        søknad.erEndringssøknad === true &&
        søknad.ekstrainfo !== undefined &&
        søknad.ekstrainfo.erEnkelEndringssøknad === true
);

export const selectOpprinneligUttaksplan = createSelector(
    [søknadSelector],
    (søknad = {}): Periode[] | undefined =>
        søknad.erEndringssøknad === true &&
        søknad.ekstrainfo !== undefined &&
        søknad.ekstrainfo.eksisterendeSak === true &&
        søknad.ekstrainfo.eksisterendeSak.uttaksplan !== undefined
            ? (søknad.ekstrainfo.eksisterendeSak.uttaksplan as Periode[])
            : undefined
);

export const selectSaksgrunnlag = createSelector(
    [selectEkstrainfo],
    (ekstrainfo: SøknadEkstrainfo): Saksgrunnlag | undefined =>
        ekstrainfo.eksisterendeSak !== undefined ? ekstrainfo.eksisterendeSak.grunnlag : undefined
);

export const selectDekningsgrad = createSelector(
    [søknadSelector],
    (søknad = {}): Dekningsgrad | undefined => søknad.dekningsgrad
);
export const selectSøker = createSelector(
    [søknadSelector],
    (søknad = {}) => søknad.søker
);
export const selectAnnenForelder = createSelector(
    [søknadSelector],
    (søknad = {}) => søknad.annenForelder
);

// Søker
export const selectSøkerErAleneOmOmsorg = createSelector(
    [selectSøker],
    (søker = {}): boolean => {
        return søker.erAleneOmOmsorg === true;
    }
);
export const selectSøkerrolle = createSelector(
    [selectSøker],
    (søker): SøkerRolle | undefined => {
        if (søker !== undefined) {
            return søker.rolle;
        }
        return undefined;
    }
);

// Barn
export const selectAntallBarn = createSelector(
    [selectBarn],
    (barn = {}) => barn.antallBarn
);
export const selectErBarnFødt = createSelector(
    [selectBarn],
    (barn = {}) => barn.erBarnetFødt
);

// Annen forelder
export const selectAnnenForelderHarRettPåForeldrepenger = createSelector(
    [selectAnnenForelder],
    (annenForelder = {}) => annenForelder.harRettPåForeldrepenger
);
export const getAnnenForelderKanIkkeOppgis = createSelector(
    [selectAnnenForelder],
    (annenForelder = {}) => annenForelder.kanIkkeOppgis
);

export const selectUttaksplan = createSelector(
    [søknadSelector],
    (søknad): Periode[] => søknad.uttaksplan as Periode[]
);

export const selectEndringstidspunkt = createSelector(
    [søknadSelector],
    (søknad): Date | undefined =>
        søknad.ekstrainfo !== undefined ? (søknad.ekstrainfo.endringstidspunkt as Date) : undefined
);

export const selectEksisterendeSak = createSelector(
    [søknadSelector],
    (søknad): EksisterendeSak | undefined =>
        søknad.ekstrainfo ? (søknad.ekstrainfo.eksisterendeSak as EksisterendeSak) : undefined
);

export const selectEksisterendeUttaksplan = createSelector(
    [selectEksisterendeSak],
    (eksisterendeSak): Periode[] | undefined =>
        eksisterendeSak ? (eksisterendeSak.uttaksplan as Periode[]) : undefined
);

export const selectPerioderSomSkalSendesInn = createSelector(
    [selectUttaksplan, selectEksisterendeUttaksplan, selectErEndringssøknad, selectEndringstidspunkt],
    (nyPlan, opprinneligPlan, erEndringssøknad, endringstidspunkt): Periode[] => {
        if (opprinneligPlan) {
            return erEndringssøknad
                ? getEndretUttaksplanForInnsending(nyPlan, endringstidspunkt)
                : nyPlan.filter(erPeriodeSomSkalSendesInn);
        }
        return nyPlan;
    }
);
