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
                ønskerFlerbarnsdager: undefined,
            };
        }
        return periode;
    });
};

type PeriodeWithOrgnr = Periode & { orgnr: string };

const cleanupOrgnr = (uttaksplan: Periode[]): Periode[] => {
    return uttaksplan.map((periode) => {
        const { orgnr, ...rest } = periode as PeriodeWithOrgnr;
        return {
            ...rest,
            ...(orgnr ? { orgnumre: [orgnr] } : undefined),
        };
    });
};

export const cleanInvalidSøknadData = (søknad: Søknad): Søknad => {
    if (søknad && søknad.uttaksplan) {
        /** Fjern ønskerFlerbarnsdager fra overføringsperiode */
        søknad.uttaksplan = cleanupØnskerFlerbarnsdager(søknad.uttaksplan);
        søknad.uttaksplan = cleanupOrgnr(søknad.uttaksplan);
    }
    return søknad;
};
