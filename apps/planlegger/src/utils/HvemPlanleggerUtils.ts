import { IntlShape } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { Far, FarOgFar, HvemPlanlegger, Mor, MorOgFar, MorOgMedmor, Situasjon } from 'types/HvemPlanlegger';

import { utledHvemSomHarRett } from './hvemHarRettUtils';

export const erFlereSøkere = (hvemPlanlegger: HvemPlanlegger) =>
    hvemPlanlegger.type === Situasjon.MOR_OG_FAR ||
    hvemPlanlegger.type === Situasjon.FAR_OG_FAR ||
    hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR;

export const erAlenesøker = (hvemPlanlegger: HvemPlanlegger) => erFlereSøkere(hvemPlanlegger) === false;

export const erMorDelAvSøknaden = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgFar | MorOgMedmor | Mor =>
    hvemPlanlegger.type === Situasjon.MOR_OG_FAR ||
    hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR ||
    hvemPlanlegger.type === Situasjon.MOR;

export const erFarDelAvSøknaden = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgFar | FarOgFar | Far =>
    hvemPlanlegger.type === Situasjon.MOR_OG_FAR ||
    hvemPlanlegger.type === Situasjon.FAR_OG_FAR ||
    hvemPlanlegger.type === Situasjon.FAR;

export const erMedmorDelAvSøknaden = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgMedmor =>
    hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR;

export const erFarOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is FarOgFar =>
    hvemPlanlegger.type === Situasjon.FAR_OG_FAR;

export const getTekstForDeSomHarRett = (
    hvemPlanlegger: HvemPlanlegger,
    arbeidssituasjon: Arbeidssituasjon,
    intl: IntlShape,
): string | undefined => {
    if (erAlenesøker(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'Du' });
    }

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    switch (hvemHarRett) {
        case 'kunFarEllerFar2EllerMedmorHarRett':
        case 'kunFarHarRettErHovedsøker':
            if (erFarDelAvSøknaden(hvemPlanlegger)) {
                return hvemPlanlegger.navnPåFar ?? intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
            }
            if (erMedmorDelAvSøknaden(hvemPlanlegger)) {
                return hvemPlanlegger.navnPåMedmor ?? intl.formatMessage({ id: 'HvemPlanlegger.DefaultMedMorNavn' });
            }
            throw new Error('Far eller medmor er ikke en del av planleggingen.');
        case 'kunMorHarRett':
            if (erMorDelAvSøknaden(hvemPlanlegger)) {
                return hvemPlanlegger.navnPåMor ?? intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' });
            }
            throw new Error('Mor er ikke en del av planleggingen.');
        case 'beggeHarRett':
            return intl.formatMessage({ id: 'Dere' });
        case 'ingenHarRett':
            return undefined;
    }
};

export const getNavnPåSøker = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    if (erMorDelAvSøknaden(hvemPlanlegger)) {
        return hvemPlanlegger.navnPåMor || intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger)) {
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

export const finnSøkerTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string =>
    erMorDelAvSøknaden(hvemPlanlegger)
        ? intl.formatMessage({ id: 'OversiktSteg.Mor' })
        : intl.formatMessage({ id: 'OversiktSteg.Far' });

export const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'OversiktSteg.Medmor' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'OversiktSteg.Far' });
    }
    return undefined;
};
