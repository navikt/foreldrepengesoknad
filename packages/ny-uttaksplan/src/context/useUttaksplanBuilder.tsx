import { Uttaksplanbuilder } from '../builder/Uttaksplanbuilder';
import { mapSaksperiodeTilPlanperiode } from '../utils/periodeUtils';
import { getAnnenpartsPerioder, useUttaksplanData } from './UttaksplanDataContext';

export const useUttaksplanBuilder = () => {
    const {
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        foreldreInfo,
        familiesituasjon,
        saksperioder,
        uttaksplan,
    } = useUttaksplanData();

    const annenPartsPerioder = getAnnenpartsPerioder(foreldreInfo, saksperioder);

    const annenPartsPlanperioder = annenPartsPerioder
        ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, true, familiehendelsedato, foreldreInfo)
        : undefined;

    return Uttaksplanbuilder({
        perioder: uttaksplan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon: familiesituasjon === 'adopsjon',
        foreldreInfo,
        //TODO (TOR) Trengs denne? Var alltid undefined før eg refaktorerte
        førsteUttaksdagNesteBarnsSak: undefined,
        opprinneligPlan: annenPartsPlanperioder,
    });
};
