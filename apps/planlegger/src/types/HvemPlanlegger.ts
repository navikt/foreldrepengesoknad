import HvemPlanlegger from 'steps/hvemPlanlegger/HvemPlanleggerSteg';

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
    navnPåMor: string;
};

export type Far = {
    type: SøkersituasjonEnum.FAR;
    navnPåFar: string;
};

export const isMorOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgFar => {
    return hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_FAR;
};
export const isMorOgMedmor = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgMedmor => {
    return hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_MEDMOR;
};
export const isFarOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is FarOgFar => {
    return hvemPlanlegger.type === SøkersituasjonEnum.FAR_OG_FAR;
};
export const isMor = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is Mor => {
    return hvemPlanlegger.type === SøkersituasjonEnum.MOR;
};
export const isFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is Far => {
    return hvemPlanlegger.type === SøkersituasjonEnum.FAR;
};

export const isFlere = (hvemPlanlegger: HvemPlanlegger) => {
    return (
        hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_FAR ||
        hvemPlanlegger.type === SøkersituasjonEnum.FAR_OG_FAR ||
        hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_MEDMOR
    );
};
export const isAlene = (hvemPlanlegger: HvemPlanlegger) => {
    return isFlere(hvemPlanlegger) === false;
};

export const getNavnPåSøker = (hvemPlanlegger: HvemPlanlegger): string => {
    if (isMorOgFar(hvemPlanlegger) || isMorOgMedmor(hvemPlanlegger) || isMor(hvemPlanlegger)) {
        return hvemPlanlegger.navnPåMor;
    }
    if (isFarOgFar(hvemPlanlegger) || isFar(hvemPlanlegger)) {
        return hvemPlanlegger.navnPåFar;
    }
    throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
};

export const getNavnPåAnnenPart = (hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return hvemPlanlegger.navnPåMedmor;
    }
    if (isMorOgFar(hvemPlanlegger)) {
        return hvemPlanlegger.navnPåFar;
    }
    if (isFarOgFar(hvemPlanlegger)) {
        return hvemPlanlegger.navnPåMedfar;
    }
    return undefined;
};

export const getFornavnPåSøker = (hvemPlanlegger: HvemPlanlegger): string => {
    return getNavnPåSøker(hvemPlanlegger).split(' ')[0];
};

export const getFornavnPåAnnenPart = (hvemPlanlegger: HvemPlanlegger): string | undefined => {
    const navn = getNavnPåAnnenPart(hvemPlanlegger);
    return navn ? navn.split(' ')[0] : undefined;
};
