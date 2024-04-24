import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';

export type HvemHarRett =
    | 'beggeHarRett'
    | 'kunMorHarRett'
    | 'kunFarHarRettErHovedsøker'
    | 'kunMedfarHarRett'
    | 'kunMedmorEllerFarHarRett'
    | 'ingenHarRett';

export const utledHvemSomHarRett = (
    hvemPlanlegger: HvemPlanlegger,
    arbeidssituasjon: Arbeidssituasjon,
): HvemHarRett => {
    const beggeHarRett = arbeidssituasjon.status === Arbeidsstatus.JOBBER && arbeidssituasjon.jobberAnnenPart === true;

    if (beggeHarRett) {
        return 'beggeHarRett';
    }

    const kunMorHarRett =
        (hvemPlanlegger.type === Situasjon.MOR_OG_FAR ||
            hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR ||
            hvemPlanlegger.type === Situasjon.MOR) &&
        arbeidssituasjon.status === Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart !== true;

    if (kunMorHarRett) {
        return 'kunMorHarRett';
    }

    const kunFarHarRettHovedsøker =
        (hvemPlanlegger.type === Situasjon.FAR || hvemPlanlegger.type === Situasjon.FAR_OG_FAR) &&
        arbeidssituasjon.status === Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart !== true;

    if (kunFarHarRettHovedsøker) {
        return 'kunFarHarRettErHovedsøker';
    }

    const kunMedfarHarRett =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR &&
        arbeidssituasjon.status !== Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart;

    if (kunMedfarHarRett) {
        return 'kunMedfarHarRett';
    }

    const kunMedmorHarRett =
        hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR &&
        arbeidssituasjon.status !== Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart;

    const kunFarHarRettMorHovedsøker =
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR &&
        arbeidssituasjon.status !== Arbeidsstatus.JOBBER &&
        arbeidssituasjon.jobberAnnenPart;

    if (kunMedmorHarRett || kunFarHarRettMorHovedsøker) {
        return 'kunMedmorEllerFarHarRett';
    }

    return 'ingenHarRett';
};
