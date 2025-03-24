import { HvemPlanleggerType } from '@navikt/fp-types';

export type HvemPlanlegger = MorOgFar | MorOgMedmor | FarOgFar | Mor | Far;

export type MorOgFar = {
    type: HvemPlanleggerType.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
};

export type MorOgMedmor = {
    type: HvemPlanleggerType.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
};

export type FarOgFar = {
    type: HvemPlanleggerType.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
};

export type Mor = {
    type: HvemPlanleggerType.MOR;
    navnPåMor?: string;
};

export type Far = {
    type: HvemPlanleggerType.FAR;
    navnPåFar?: string;
};
