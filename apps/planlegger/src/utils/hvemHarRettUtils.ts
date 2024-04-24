import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

import { erMorDelAvSøknaden } from './HvemPlanleggerUtils';

export type HvemHarRett =
    | 'beggeHarRett'
    | 'kunMorHarRett'
    | 'kunFarSøker1HarRett'
    | 'kunMedfarHarRett'
    | 'kunMedmorEllerFarSøker2HarRett'
    | 'ingenHarRett';

export const utledHvemSomHarRett = (
    hvemPlanlegger: HvemPlanlegger,
    arbeidssituasjon: Arbeidssituasjon,
): HvemHarRett => {
    const beggeHarRett = arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;
    const kunSøker1HarRett =
        arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart !== true;
    const kunSøker2HarRett =
        arbeidssituasjon.status !== Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;

    if (beggeHarRett) {
        return 'beggeHarRett';
    }

    if (kunSøker1HarRett) {
        if (erMorDelAvSøknaden(hvemPlanlegger)) {
            return 'kunMorHarRett';
        }
        if (hvemPlanlegger.type === Situasjon.FAR || hvemPlanlegger.type === Situasjon.FAR_OG_FAR) {
            return 'kunFarSøker1HarRett';
        }
    }

    if (kunSøker2HarRett) {
        if (hvemPlanlegger.type === Situasjon.FAR_OG_FAR) {
            return 'kunMedfarHarRett';
        }
        if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR || hvemPlanlegger.type === Situasjon.MOR_OG_FAR) {
            return 'kunMedmorEllerFarSøker2HarRett';
        }
    }

    return 'ingenHarRett';
};

export const harFarEllerMedmorRett = (hvemHarRett?: HvemHarRett): boolean =>
    hvemHarRett === 'beggeHarRett' ||
    hvemHarRett === 'kunFarSøker1HarRett' ||
    hvemHarRett === 'kunMedmorEllerFarSøker2HarRett' ||
    hvemHarRett === 'kunMedfarHarRett';

export const harMorRett = (hvemHarRett?: HvemHarRett): boolean =>
    hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunMorHarRett';
