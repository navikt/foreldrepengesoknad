import { IntlShape } from 'react-intl';
import { Far, FarOgFar, HvemPlanlegger, Mor, MorOgFar, MorOgMedmor } from 'types/HvemPlanlegger';

import { HvemPlanleggerType } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { HvemHarRett } from './hvemHarRettUtils';

export const erFlereSøkere = (hvemPlanlegger: HvemPlanlegger) =>
    hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR ||
    hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR ||
    hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR;

export const erAlenesøker = (hvemPlanlegger: HvemPlanlegger) => erFlereSøkere(hvemPlanlegger) === false;

export const erMorDelAvSøknaden = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgFar | MorOgMedmor | Mor =>
    hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR ||
    hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR ||
    hvemPlanlegger.type === HvemPlanleggerType.MOR;

export const erFarDelAvSøknaden = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgFar | FarOgFar | Far =>
    hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR ||
    hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR ||
    hvemPlanlegger.type === HvemPlanleggerType.FAR;

export const erMedmorDelAvSøknaden = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is MorOgMedmor =>
    hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR;

export const erFarOgFar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is FarOgFar =>
    hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;

export const erFarSøker2 = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is FarOgFar | MorOgFar =>
    hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR;

export const getNavnPåSøker1 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    if (erMorDelAvSøknaden(hvemPlanlegger)) {
        return hvemPlanlegger.navnPåMor || intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger)) {
        return hvemPlanlegger.navnPåFar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
};

export const getNavnPåSøker2 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return hvemPlanlegger.navnPåMedmor || intl.formatMessage({ id: 'HvemPlanlegger.DefaultMedMorNavn' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR) {
        return hvemPlanlegger.navnPåFar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) {
        return hvemPlanlegger.navnPåMedfar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    return intl.formatMessage({ id: 'HvemPlanlegger.DefaultAnnenForelderNavn' });
};

export const getDefaultNavnSøker1 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    if (erMorDelAvSøknaden(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    throw new Error('Feil i kode: Ugyldig hvemPlanlegger');
};

export const getDefaultNavnSøker2 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string | undefined => {
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'HvemPlanlegger.DefaultMedMorNavn' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR) {
        return intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) {
        return intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    return undefined;
};

export const getFornavnPåSøker1 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    return getNavnPåSøker1(hvemPlanlegger, intl).split(' ')[0];
};

export const getFornavnPåSøker2 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string | undefined => {
    const navn = getNavnPåSøker2(hvemPlanlegger, intl);
    // For at ikke "Annen forelder" skal bli "Annen"
    if (navn === intl.formatMessage({ id: 'HvemPlanlegger.DefaultAnnenForelderNavn' })) {
        return navn;
    }
    return navn ? navn.split(' ')[0] : undefined;
};

export const finnSøker1Tekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string =>
    erMorDelAvSøknaden(hvemPlanlegger)
        ? intl.formatMessage({ id: 'OversiktSteg.Mor' })
        : intl.formatMessage({ id: 'OversiktSteg.Far' });

export const finnSøker2Tekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'OversiktSteg.Medmor' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'OversiktSteg.Far' });
    }
    return undefined;
};

export const getTekstForDeSomHarRett = (
    hvemPlanlegger: HvemPlanlegger,
    hvemHarRett: HvemHarRett,
    intl: IntlShape,
): string | undefined => {
    if (erAlenesøker(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'Du' });
    }

    if (hvemHarRett === 'kunSøker1HarRett') {
        return capitalizeFirstLetter(getNavnPåSøker1(hvemPlanlegger, intl));
    }
    if (hvemHarRett === 'kunSøker2HarRett') {
        return capitalizeFirstLetter(getNavnPåSøker2(hvemPlanlegger, intl));
    }
    if (hvemHarRett === 'beggeHarRett') {
        return intl.formatMessage({ id: 'Dere' });
    }

    throw new Error('Ugyldig tilstand');
};

const navnSlutterPåSLyd = (navn: string): boolean => {
    const sisteBokstav = navn.charAt(navn.length - 1).toLowerCase();
    return sisteBokstav === 's' || sisteBokstav === 'x' || sisteBokstav === 'z';
};

export const getNavnGenitivEierform = (navn: string, locale: string): string => {
    if (locale !== 'nb' && locale !== 'nn' && locale !== 'en') {
        return navn;
    }
    const slutterPåSLyd = navnSlutterPåSLyd(navn);
    if (slutterPåSLyd && locale === 'en') {
        return `${navn}'s`;
    }
    if (slutterPåSLyd) {
        return `${navn}'`;
    }
    return `${navn}s`;
};

export const getErFarEllerMedmor = (hvemPlanlegger: HvemPlanlegger, hvemHarRett: HvemHarRett) => {
    if (
        hvemPlanlegger.type === HvemPlanleggerType.FAR ||
        (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR && hvemHarRett === 'kunSøker2HarRett') ||
        hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR ||
        (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR && hvemHarRett === 'kunSøker2HarRett')
    ) {
        return true;
    }

    return false;
};
