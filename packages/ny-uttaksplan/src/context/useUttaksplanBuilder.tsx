import { Uttaksplanbuilder } from '../builder/Uttaksplanbuilder';
import { mapSaksperiodeTilPlanperiode } from '../utils/periodeUtils';
import { getAnnenpartsPerioder, useUttaksplanData } from './UttaksplanDataContext';

export const useUttaksplanBuilder = (): ReturnType<typeof Uttaksplanbuilder> => {
    const {
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        erFarEllerMedmor,
        familiesituasjon,
        modus,
        bareFarMedmorHarRett,
        erDeltUttak,
        saksperioder,
        uttaksplan,
    } = useUttaksplanData();

    const annenPartsPerioder = getAnnenpartsPerioder(erDeltUttak, saksperioder, erFarEllerMedmor);

    const annenPartsPlanperioder = annenPartsPerioder
        ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, erFarEllerMedmor, true, familiehendelsedato, modus)
        : undefined;

    return Uttaksplanbuilder({
        perioder: uttaksplan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon: familiesituasjon === 'adopsjon',
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        //TODO (TOR) Trengs denne? Var alltid undefined før eg refaktorerte
        førsteUttaksdagNesteBarnsSak: undefined,
        opprinneligPlan: annenPartsPlanperioder,
        erIPlanleggerModus: modus === 'planlegger',
    });
};
