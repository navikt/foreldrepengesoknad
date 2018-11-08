import { Periode, Periodetype } from 'app/types/uttaksplan/periodetyper';

export const uttaksplanStarterMedOpphold = (perioder: Periode[]): boolean => {
    return perioder.findIndex((periode) => periode.type === Periodetype.Opphold) === 0;
};
