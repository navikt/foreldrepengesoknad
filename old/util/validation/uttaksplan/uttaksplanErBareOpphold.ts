import { Periode, Periodetype, isInfoPeriode } from '../../../types/uttaksplan/periodetyper';

export const uttaksplanErBareOpphold = (perioder: Periode[]): boolean => {
    if (perioder.length === 0) {
        return false;
    }

    return perioder.filter((p) => !isInfoPeriode(p)).every((periode) => periode.type === Periodetype.Opphold);
};
