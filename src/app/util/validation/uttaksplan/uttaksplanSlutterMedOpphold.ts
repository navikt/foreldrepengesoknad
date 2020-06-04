import { Periode, Periodetype, isInfoPeriode } from '../../../types/uttaksplan/periodetyper';

export const uttaksplanSlutterMedOpphold = (perioder: Periode[]): boolean => {
    return (
        perioder
            .filter((p) => !isInfoPeriode(p))
            .slice()
            .reverse()
            .findIndex((periode) => periode.type === Periodetype.Opphold) === 0
    );
};
