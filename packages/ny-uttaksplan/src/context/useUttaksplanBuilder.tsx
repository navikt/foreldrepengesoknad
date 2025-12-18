import { Uttaksplanbuilder } from '../builder/Uttaksplanbuilder';
import { useUttaksplanData } from './UttaksplanDataContext';

export const useUttaksplanBuilder = () => {
    const { harAktivitetskravIPeriodeUtenUttak, familiehendelsedato, foreldreInfo, familiesituasjon, uttaksplan } =
        useUttaksplanData();

    return Uttaksplanbuilder({
        perioder: uttaksplan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon: familiesituasjon === 'adopsjon',
        foreldreInfo,
        //TODO (TOR) Trengs denne? Var alltid undefined før eg refaktorerte
        førsteUttaksdagNesteBarnsSak: undefined,
    });
};
