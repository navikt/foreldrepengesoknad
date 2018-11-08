import { Periode, Periodetype } from '../../../types/uttaksplan/periodetyper';

export const uttaksplanSlutterMedOpphold = (perioder: Periode[]): boolean => {
    return (
        perioder
            .slice()
            .reverse()
            .findIndex((periode) => periode.type === Periodetype.Opphold) === 0
    );
};
