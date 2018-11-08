import Søknad from '../../types/søknad/Søknad';
import { Periodetype, Periode } from '../../types/uttaksplan/periodetyper';

export const removePeriodetypeHullFromUttaksplan = (uttaksplan: Periode[]): Periode[] => {
    return uttaksplan.filter((p) => p.type !== Periodetype.Hull);
};

export const cleanupSøknadForInnsending = (søknad: Søknad): Partial<Søknad> => {
    return {
        ...søknad,
        sensitivInfoIkkeLagre: undefined,
        ekstrainfo: undefined,
        uttaksplan: removePeriodetypeHullFromUttaksplan(søknad.uttaksplan)
    };
};
