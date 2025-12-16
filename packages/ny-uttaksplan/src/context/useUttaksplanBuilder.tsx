import { Uttaksplanbuilder } from '../builder/Uttaksplanbuilder';
import { useUttaksplanData } from './UttaksplanDataContext';

export const useUttaksplanBuilder = () => {
    const {
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        erFarEllerMedmor,
        familiesituasjon,
        bareFarMedmorHarRett,
        uttaksplan,
        erDeltUttak,
    } = useUttaksplanData();

    return Uttaksplanbuilder({
        perioder: uttaksplan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon: familiesituasjon === 'adopsjon',
        bareFarMedmorHarRett,
        erSøkerFarEllerMedmor: erFarEllerMedmor,
        //TODO (TOR) Trengs denne? Var alltid undefined før eg refaktorerte
        førsteUttaksdagNesteBarnsSak: undefined,
        erDeltUttak,
    });
};
