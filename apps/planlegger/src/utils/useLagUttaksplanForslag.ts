import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import dayjs from 'dayjs';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanleggerType } from 'types/HvemPlanlegger';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { KontoBeregningDto } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { getErFarEllerMedmor } from './HvemPlanleggerUtils';
import { erBarnetAdoptert } from './barnetUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from './hvemHarRettUtils';
import { getFamiliehendelsedato, lagForslagTilPlan } from './uttakUtils';

export const useLagUttaksplanForslag = (valgtStønadskvote: KontoBeregningDto) => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const erFarOgFarFødsel = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR && !erBarnetAdoptert(omBarnet);

    const startdato = erFarOgFarFødsel
        ? dayjs(familiehendelsedato).add(6, 'weeks').format(ISO_DATE_FORMAT)
        : (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR ||
                hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR) &&
            hvemHarRett === 'kunSøker2HarRett'
          ? Uttaksdagen.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30)
          : undefined;

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);

    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);

    return lagForslagTilPlan({
        erDeltUttak: fordeling !== undefined,
        famDato: familiehendelsedato,
        startdato,
        tilgjengeligeStønadskvoter: valgtStønadskvote.kontoer,
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
