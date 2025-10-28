import { SaksperiodeNy } from '@navikt/fp-types';

import { Uttaksplanbuilder } from '../builder/Uttaksplanbuilder';
import { mapSaksperiodeTilPlanperiode } from '../utils/periodeUtils';
import { useUttaksplanData } from './UttaksplanDataContext';
import { getAnnenpartsPerioder, useUttaksplan } from './useUttaksplan';

export const useUttaksplanBuilder = (saksperioder: SaksperiodeNy[]): ReturnType<typeof Uttaksplanbuilder> => {
    const {
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        erFarEllerMedmor,
        familiesituasjon,
        modus,
        bareFarMedmorHarRett,
        erDeltUttak,
    } = useUttaksplanData();

    const annenPartsPerioder = getAnnenpartsPerioder(erDeltUttak, saksperioder, erFarEllerMedmor);

    const komplettPlan = useUttaksplan(saksperioder);

    const annenPartsPlanperioder = annenPartsPerioder
        ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, erFarEllerMedmor, true, familiehendelsedato, modus)
        : undefined;

    const builder = Uttaksplanbuilder({
        perioder: komplettPlan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon: familiesituasjon === 'adopsjon',
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        //todo denne er alltid undefined
        førsteUttaksdagNesteBarnsSak: undefined,
        opprinneligPlan: annenPartsPlanperioder,
        erIPlanleggerModus: modus === 'planlegger',
    });

    return builder;
};
