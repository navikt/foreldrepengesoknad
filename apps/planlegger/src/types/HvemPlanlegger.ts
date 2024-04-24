export enum Situasjon {
    MOR_OG_FAR = 'morOgFar',
    MOR_OG_MEDMOR = 'morOgMedmor',
    FAR_OG_FAR = 'farOgFar',
    MOR = 'mor',
    FAR = 'far',
}

export type HvemPlanlegger = MorOgFar | MorOgMedmor | FarOgFar | Mor | Far;

export type MorOgFar = {
    type: Situasjon.MOR_OG_FAR;
    navnPåMor?: string;
    navnPåFar?: string;
};

export type MorOgMedmor = {
    type: Situasjon.MOR_OG_MEDMOR;
    navnPåMor?: string;
    navnPåMedmor?: string;
};

export type FarOgFar = {
    type: Situasjon.FAR_OG_FAR;
    navnPåFar?: string;
    navnPåMedfar?: string;
};

export type Mor = {
    type: Situasjon.MOR;
    navnPåMor?: string;
};

export type Far = {
    type: Situasjon.FAR;
    navnPåFar?: string;
};
