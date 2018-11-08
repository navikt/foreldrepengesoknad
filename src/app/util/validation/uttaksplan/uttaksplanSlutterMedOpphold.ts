import { Periode, Periodetype } from 'app/types/uttaksplan/periodetyper';

export const uttaksplanSlutterMedOpphold = (perioder: Periode[]): boolean => {
    return perioder.reverse().findIndex((periode) => periode.type === Periodetype.Opphold) === 0;
};
