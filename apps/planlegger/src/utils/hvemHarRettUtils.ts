import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { erMorDelAvSøknaden } from './HvemPlanleggerUtils';

export type HvemHarRett = 'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett';

export const utledHvemSomHarRett = (arbeidssituasjon: Arbeidssituasjon): HvemHarRett => {
    const beggeHarRett = arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;
    const kunSøker1HarRett =
        arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart !== true;
    const kunSøker2HarRett =
        arbeidssituasjon.status !== Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;

    if (beggeHarRett) {
        return 'beggeHarRett';
    }
    if (kunSøker1HarRett) {
        return 'kunSøker1HarRett';
    }
    return kunSøker2HarRett ? 'kunSøker2HarRett' : 'ingenHarRett';
};

export const harKunMedmorEllerFarSøker2Rett = (hvemHarRett: HvemHarRett, hvemPlanlegger: HvemPlanlegger): boolean =>
    hvemHarRett === 'kunSøker2HarRett' &&
    (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR ||
        hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR ||
        hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR);
export const harKunFarSøker1Rett = (hvemHarRett: HvemHarRett, hvemPlanlegger: HvemPlanlegger): boolean =>
    (hvemPlanlegger.type === HvemPlanleggerType.FAR || hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) &&
    hvemHarRett === 'kunSøker1HarRett';

export const harMorRett = (hvemHarRett: HvemHarRett, hvemPlanlegger: HvemPlanlegger): boolean =>
    erMorDelAvSøknaden(hvemPlanlegger) && (hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunSøker1HarRett');

export const harKunMorRett = (hvemHarRett: HvemHarRett, hvemPlanlegger: HvemPlanlegger): boolean =>
    erMorDelAvSøknaden(hvemPlanlegger) && hvemHarRett === 'kunSøker1HarRett';
