import HvemPlanlegger from 'steps/hvem-planlegger/HvemPlanleggerSteg';
import { SøkersituasjonEnum } from './Søkersituasjon';

export type HvemPlanlegger = MorOgFar | MorOgMedmor | FarOgFar | Mor | Far;

export type MorOgFar = {
    type: SøkersituasjonEnum.MOR_OG_FAR;
    navnPåMor: string;
    navnPåFar: string;
};

export type MorOgMedmor = {
    type: SøkersituasjonEnum.MOR_OG_MEDMOR;
    navnPåMor: string;
    navnPåMedmor: string;
};

export type FarOgFar = {
    type: SøkersituasjonEnum.FAR_OG_FAR;
    navnPåFar: string;
    navnPåMedfar: string;
};

export type Mor = {
    type: SøkersituasjonEnum.MOR;
    navnPåBareMor: string;
};

export type Far = {
    type: SøkersituasjonEnum.FAR;
    navnPåBareFar: string;
};

export const isMorOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgFar => {
    return hvemPlanlegger.type === 'morOgFar';
};
export const isMorOgMedmor = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgMedmor => {
    return hvemPlanlegger.type === 'morOgMedmor';
};
export const isFarOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is FarOgFar => {
    return hvemPlanlegger.type === 'farOgFar';
};
export const isMor = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is Mor => {
    return hvemPlanlegger.type === 'mor';
};
export const isFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is Far => {
    return hvemPlanlegger.type === 'far';
};
