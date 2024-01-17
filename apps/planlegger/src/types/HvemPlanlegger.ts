import HvemPlanlegger from 'steps/hvemPlanlegger/HvemPlanleggerSteg';
import { SøkersituasjonEnum } from './Søkersituasjon';

export type HvemPlanlegger = MorOgFar | MorOgMedmor | FarOgFar | Mor | Far;

export type MorOgFar = {
    type: SøkersituasjonEnum.MOR_OG_FAR;
    navnPåMor: string;
    navnPåFar: string;
    hvem: SøkersituasjonEnum.FLERE;
};

export type MorOgMedmor = {
    type: SøkersituasjonEnum.MOR_OG_MEDMOR;
    navnPåMor: string;
    navnPåMedmor: string;
    hvem: SøkersituasjonEnum.FLERE;
};

export type FarOgFar = {
    type: SøkersituasjonEnum.FAR_OG_FAR;
    navnPåFar: string;
    navnPåMedfar: string;
    hvem: SøkersituasjonEnum.FLERE;
};

export type Mor = {
    type: SøkersituasjonEnum.MOR;
    navnPåMor: string;
    hvem: SøkersituasjonEnum.ALENE;
};

export type Far = {
    type: SøkersituasjonEnum.FAR;
    navnPåFar: string;
    hvem: SøkersituasjonEnum.ALENE;
};

export const isMorOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgFar => {
    return hvemPlanlegger.type === 'morOgFar', hvemPlanlegger.hvem === 'flere';
};
export const isMorOgMedmor = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgMedmor => {
    return hvemPlanlegger.type === 'morOgMedmor', hvemPlanlegger.hvem === 'flere';
};
export const isFarOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is FarOgFar => {
    return hvemPlanlegger.type === 'farOgFar', hvemPlanlegger.hvem === 'flere';
};
export const isMor = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is Mor => {
    return hvemPlanlegger.type === 'mor', hvemPlanlegger.hvem === 'alene';
};
export const isFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is Far => {
    return hvemPlanlegger.type === 'far', hvemPlanlegger.hvem === 'alene';
};
