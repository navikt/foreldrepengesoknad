import Søknad from '../../types/søknad/Søknad';
import { Periodetype, Periode } from '../../types/uttaksplan/periodetyper';

export const removePeriodetypeHullFromUttaksplan = (uttaksplan: Periode[]): Periode[] => {
    return uttaksplan.filter((p) => p.type !== Periodetype.Hull);
};

export const cleanupSøknadForInnsending = (søknad: Søknad): Søknad => {
    return {
        ...søknad,
        uttaksplan: removePeriodetypeHullFromUttaksplan(søknad.uttaksplan)
    };
};
