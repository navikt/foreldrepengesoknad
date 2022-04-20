import { Periode, Periodetype, isInfoPeriode } from '../../../types/uttaksplan/periodetyper';

export const uttaksplanStarterMedOpphold = (perioder: Periode[]): boolean => {
    return perioder.filter((p) => !isInfoPeriode(p)).findIndex((periode) => periode.type === Periodetype.Opphold) === 0;
};
