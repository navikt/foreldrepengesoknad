import { Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';

export const uttaksplanErBareOpphold = (perioder: Periode[]): boolean => {
    if (perioder.length === 0) {
        return false;
    }

    return perioder.every((periode) => periode.type === Periodetype.Opphold);
};
