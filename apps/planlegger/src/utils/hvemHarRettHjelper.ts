import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';

export type HvemHarRett =
    | 'beggeHarRett'
    | 'kunFarHarRett'
    | 'kunFarHarRettAleneforsørger'
    | 'kunMorHarRett'
    | 'ingenHarRett';

export const utledHvemSomHarRett = (
    hvemPlanlegger: HvemPlanlegger,
    arbeidssituasjon: Arbeidssituasjon,
): HvemHarRett => {
    const kunFarHarRettHovedsøker =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR &&
        (arbeidssituasjon.status === Arbeidsstatus.JOBBER || arbeidssituasjon.jobberAnnenPart);

    const kunFarHarRettMedsøker =
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR &&
        arbeidssituasjon.status !== Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart;

    const kunFarHarRettAleneforsørger =
        hvemPlanlegger.type === Situasjon.FAR && arbeidssituasjon.status === Arbeidsstatus.JOBBER;

    const kunMorHarRett =
        hvemPlanlegger.type !== Situasjon.FAR &&
        hvemPlanlegger.type !== Situasjon.FAR_OG_FAR &&
        arbeidssituasjon.status === Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart !== true;

    const beggeHarRett = arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;

    if (kunMorHarRett) {
        return 'kunMorHarRett';
    }

    if (beggeHarRett) {
        return 'beggeHarRett';
    }

    if (kunFarHarRettAleneforsørger) {
        return 'kunFarHarRettAleneforsørger';
    }

    if (kunFarHarRettHovedsøker || kunFarHarRettMedsøker) {
        return 'kunFarHarRett';
    }

    return 'ingenHarRett';
};
