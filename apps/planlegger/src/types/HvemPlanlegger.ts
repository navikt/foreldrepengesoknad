import HvemPlanlegger from 'steps/hvem-planlegger/HvemPlanleggerSteg';

export type HvemPlanleggerEnum = MorOgFar | MorOgMedmor | FarOgFar | Mor | Far;

export type MorOgFar = {
    navnPåMor: string;
    navnPåFar: string;
};

export type MorOgMedmor = {
    navnPåMor: string;
    navnPåMedmor: string;
};

export type FarOgFar = {
    navnPåFar: string;
    navnPåMedfar: string;
};

export type Mor = {
    navnPåMor: string;
};

export type Far = {
    navnPåFar: string;
};

export type HvemPlanlegger = MorOgFar | MorOgMedmor | FarOgFar | Mor | Far;

export const morOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgFar => {
    if ((hvemPlanlegger as MorOgFar).navnPåMor) {
        return true;
    }
    if ((hvemPlanlegger as MorOgFar).navnPåFar) {
        return true;
    }
    return false;
};

export const morOgMedmor = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgMedmor => {
    if ((hvemPlanlegger as MorOgMedmor).navnPåMor) {
        return true;
    }
    if ((hvemPlanlegger as MorOgMedmor).navnPåMedmor) {
        return true;
    }
    return false;
};
