import { HvemPlanleggerType, KontoBeregningDto } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';
import {
    Arbeidsstatus,
    erBarnetAdoptert,
    getErFarEllerMedmor,
    harKunFarSøker1Rett,
    harKunMedmorEllerFarSøker2Rett,
    utledHvemSomHarRett,
} from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from '../app-data/PlanleggerDataContext';
import { getFamiliehendelsedato, lagForslagTilPlan } from './uttakUtils';

export const useLagUttaksplanForslag = (valgtStønadskonto: KontoBeregningDto) => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const startdato =
        (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR ||
            hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR) &&
        hvemHarRett === 'kunSøker2HarRett'
            ? UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30)
            : undefined;

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);

    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);

    return lagForslagTilPlan({
        erDeltUttak: fordeling !== undefined,
        famDato: familiehendelsedato,
        startdato,
        tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
        fellesperiodeDagerMor: fordeling?.antallDagerSøker1,
        bareFarMedmorHarRett,
        erAdopsjon: erBarnetAdoptert(omBarnet),
        erFarEllerMedmor: erFarEllerMedmor,
        erMorUfør: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
        erAleneOmOmsorg:
            hvemPlanlegger.type === HvemPlanleggerType.FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR,
        farOgFar: hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR,
    });
};
