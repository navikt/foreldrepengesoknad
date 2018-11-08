import { Periode, Periodetype } from 'app/types/uttaksplan/periodetyper';

export const uttaksplanErBareOpphold = (perioder: Periode[]): boolean => {
    return perioder.every((periode) => periode.type === Periodetype.Opphold);
};
