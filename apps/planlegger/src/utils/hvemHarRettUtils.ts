import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, HvemPlanleggerType } from 'types/HvemPlanlegger';

import { erMorDelAvSøknaden } from './HvemPlanleggerUtils';

export type HvemHarRett = 'beggeHarRett' | 'kunSøker1HarRett' | 'kunSøker2HarRett' | 'ingenHarRett';

export const utledHvemSomHarRett = (arbeidssituasjon: Arbeidssituasjon): HvemHarRett => {
    const beggeHarRett = arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;
    if (beggeHarRett) {
        return 'beggeHarRett';
    }
    const kunSøker1HarRett =
        arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart !== true;
    if (kunSøker1HarRett) {
        return 'kunSøker1HarRett';
    }
    const kunSøker2HarRett =
        arbeidssituasjon.status !== Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;
    return kunSøker2HarRett ? 'kunSøker2HarRett' : 'ingenHarRett';
};

export const harKunMedmorEllerFarSøker2Rett = (hvemHarRett: HvemHarRett, hvemPlanlegger: HvemPlanlegger): boolean =>
    hvemHarRett === 'kunSøker2HarRett' &&
    [HvemPlanleggerType.MOR_OG_MEDMOR, HvemPlanleggerType.FAR_OG_FAR, HvemPlanleggerType.MOR_OG_FAR].includes(
        hvemPlanlegger.type,
    );
export const harKunFarSøker1Rett = (hvemHarRett: HvemHarRett, hvemPlanlegger: HvemPlanlegger): boolean =>
    [HvemPlanleggerType.FAR, HvemPlanleggerType.FAR_OG_FAR].includes(hvemPlanlegger.type) &&
    hvemHarRett === 'kunSøker1HarRett';

export const harMorRett = (hvemHarRett: HvemHarRett, hvemPlanlegger: HvemPlanlegger): boolean =>
    erMorDelAvSøknaden(hvemPlanlegger) && (hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunSøker1HarRett');

export const utledRettighet = (erAleneOmOmsorg: boolean, erDeltUttak: boolean) => {
    if (erAleneOmOmsorg) {
        return 'ALENEOMSORG';
    }
    if (erDeltUttak) {
        return 'BEGGE_RETT';
    }

    return 'BARE_SØKER_RETT';
};
