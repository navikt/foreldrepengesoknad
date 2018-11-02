import { Periodetype, Periode } from '../../types/uttaksplan/periodetyper';
import Søknad from '../../types/søknad/Søknad';

export const cleanupØnskerFlerbarnsdager = (uttaksplan: Periode[]): Periode[] => {
    return uttaksplan.map((periode) => {
        if (
            periode.type === Periodetype.Overføring ||
            periode.type === Periodetype.Utsettelse ||
            periode.type === Periodetype.Opphold
        ) {
            return {
                ...periode,
                ønskerFlerbarnsdager: undefined
            };
        }
        return periode;
    });
};

export const cleanInvalidSøknadData = (søknad: Søknad): Søknad => {
    if (søknad && søknad.uttaksplan) {
        /** Fjern ønskerFlerbarnsdager fra overføringsperiode */
        søknad.uttaksplan = cleanupØnskerFlerbarnsdager(søknad.uttaksplan);
    }
    return søknad;
};
