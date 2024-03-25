import { IntlShape } from 'react-intl';
import HvemPlanlegger from 'steps/hvemPlanlegger/HvemPlanleggerSteg';

import { Situasjon } from './Søkersituasjon';

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

export const isFlere = (hvemPlanlegger: HvemPlanlegger) => {
    return (
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR ||
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR ||
        hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR
    );
};
export const isAlene = (hvemPlanlegger: HvemPlanlegger) => {
    return isFlere(hvemPlanlegger) === false;
};

export const erMorDelAvSøknaden = (type: Situasjon) => {
    return type === Situasjon.MOR_OG_FAR || type === Situasjon.MOR_OG_MEDMOR || type === Situasjon.MOR;
};

export const erFarDelAvSøknaden = (type: Situasjon) => {
    return type === Situasjon.MOR_OG_FAR || type === Situasjon.FAR_OG_FAR || type === Situasjon.FAR;
};

export const getNavnPåSøker = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    if (
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR ||
        hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR ||
        hvemPlanlegger.type === Situasjon.MOR
    ) {
        return hvemPlanlegger.navnPåMor || intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' });
    }
    if (hvemPlanlegger.type === Situasjon.FAR_OG_FAR || hvemPlanlegger.type === Situasjon.FAR) {
        return hvemPlanlegger.navnPåFar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
};

export const getNavnPåAnnenPart = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string | undefined => {
    if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR) {
        return hvemPlanlegger.navnPåMedmor || intl.formatMessage({ id: 'HvemPlanlegger.DefaultMedMorNavn' });
    }
    if (hvemPlanlegger.type === Situasjon.MOR_OG_FAR) {
        return hvemPlanlegger.navnPåFar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    if (hvemPlanlegger.type === Situasjon.FAR_OG_FAR) {
        return hvemPlanlegger.navnPåMedfar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    return undefined;
};

export const getFornavnPåSøker = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    return getNavnPåSøker(hvemPlanlegger, intl).split(' ')[0];
};

export const getFornavnPåAnnenPart = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string | undefined => {
    const navn = getNavnPåAnnenPart(hvemPlanlegger, intl);
    return navn ? navn.split(' ')[0] : undefined;
};
