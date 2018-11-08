import { Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';

export const uttaksplanStarterMedOpphold = (perioder: Periode[]): boolean => {
    return perioder.findIndex((periode) => periode.type === Periodetype.Opphold) === 0;
};
