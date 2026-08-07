import { IntlShape } from 'react-intl';
import { Far, FarOgFar, HvemPlanlegger, HvemPlanleggerType, Mor, MorOgFar, MorOgMedmor } from 'types/HvemPlanlegger';

import { FordelingPlanlegger, OmBarnetPlanlegger } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { erBarnetAdoptert } from './barnetUtils';
import { HvemHarRett } from './hvemHarRettUtils';

const erGyldigNavn = (navn: string | undefined): navn is string => {
    return Boolean(navn && navn.trim().length > 0);
};

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

/** Likekjønnet par: to fedre eller to mødre/medmødre */
export const erLikekjønnetPar = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is FarOgFar | MorOgMedmor =>
    hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR;

/**
 * Par der brukeren (ved adopsjon, se {@link FordelingSteg}) kan velge hvem som skal starte permisjonen,
 * fremfor at det alltid er den først oppgitte forelderen (eller mor, for mor/far) som blir søker1.
 */
export type ParSomKanVelgeStarter = FarOgFar | MorOgMedmor | MorOgFar;

/** Sjekker om paret kan velge hvem som starter permisjonen, se {@link ParSomKanVelgeStarter}. */
export const kanVelgeHvemSomStarterPermisjonen = (
    hvemPlanlegger: HvemPlanlegger,
): hvemPlanlegger is ParSomKanVelgeStarter =>
    erLikekjønnetPar(hvemPlanlegger) || hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR;

export type StarterForelder = 'MOR' | 'FAR_MEDMOR';

export const getStarterForelder = (
    hvemPlanlegger: HvemPlanlegger,
    fordeling: FordelingPlanlegger | undefined,
    barnet: OmBarnetPlanlegger | undefined,
): StarterForelder | undefined => {
    if (!barnet || !kanVelgeHvemSomStarterPermisjonen(hvemPlanlegger) || !erBarnetAdoptert(barnet)) {
        return undefined;
    }

    if (!fordeling?.hvemStarterPermisjon) {
        return undefined;
    }

    return fordeling?.hvemStarterPermisjon === 'søker2' ? 'FAR_MEDMOR' : 'MOR';
};

/** Navn (uten capitalize) til bruk internt ved bytte av søker1/søker2, konsistent med getNavnPåSøker1/2 */
const getRawNavnForHvemStarterPermisjon = (
    hvemPlanlegger: ParSomKanVelgeStarter,
    intl: IntlShape,
): { navnSøker1: string; navnSøker2: string } => {
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) {
        return {
            navnSøker1: erGyldigNavn(hvemPlanlegger.navnPåFar)
                ? hvemPlanlegger.navnPåFar
                : intl.formatMessage({ id: 'HvemPlanlegger.DefaultFar1Navn' }),
            navnSøker2: erGyldigNavn(hvemPlanlegger.navnPåMedfar)
                ? hvemPlanlegger.navnPåMedfar
                : intl.formatMessage({ id: 'HvemPlanlegger.DefaultFar2Navn' }),
        };
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return {
            navnSøker1: erGyldigNavn(hvemPlanlegger.navnPåMor)
                ? hvemPlanlegger.navnPåMor
                : intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' }),
            navnSøker2: erGyldigNavn(hvemPlanlegger.navnPåMedmor)
                ? hvemPlanlegger.navnPåMedmor
                : intl.formatMessage({ id: 'HvemPlanlegger.DefaultMedMorNavn' }),
        };
    }
    return {
        navnSøker1: erGyldigNavn(hvemPlanlegger.navnPåMor)
            ? hvemPlanlegger.navnPåMor
            : intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' }),
        navnSøker2: erGyldigNavn(hvemPlanlegger.navnPåFar)
            ? hvemPlanlegger.navnPåFar
            : intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' }),
    };
};

/** Navn (eller fallback "Far 1"/"Far 2"/"Mor"/"Medmor"/"Far") til bruk i spørsmålet om hvem som starter permisjonen */
export const getNavnForHvemStarterPermisjon = (
    hvemPlanlegger: ParSomKanVelgeStarter,
    intl: IntlShape,
): { navnSøker1: string; navnSøker2: string } => {
    const { navnSøker1, navnSøker2 } = getRawNavnForHvemStarterPermisjon(hvemPlanlegger, intl);
    return {
        navnSøker1: capitalizeFirstLetter(navnSøker1),
        navnSøker2: capitalizeFirstLetter(navnSøker2),
    };
};

/**
 * For likekjønnede par, samt mor/far, ved adopsjon kan brukeren velge hvem som starter permisjonen
 * (se {@link FordelingSteg}). Denne funksjonen bytter om på navnefeltene slik at "søker1" alltid samsvarer
 * med den som faktisk starter, uavhengig av hvilken rekkefølge navnene ble oppgitt i på steget
 * "Hvem planlegger" (eller, for mor/far, uavhengig av at mor normalt er søker1). Alle andre steder i appen
 * som viser eller beregner søker1/søker2 (uttaksdata, fordelingsslider, uttaksplanforslag) skal bruke denne
 * "effektive" versjonen av hvemPlanlegger fremfor rådataen fra HVEM_PLANLEGGER-konteksten.
 *
 * Fallback-navn ("Far 1"/"Far 2") blir "bakt inn" som faktiske navn ved bytte, slik at identiteten følger
 * personen selv om navn ikke er oppgitt (ellers ville f.eks. "Far 1" alltid vist seg som søker1 uansett hvem
 * som faktisk starter permisjonen, siden begge de opprinnelige navnefeltene da er tomme). Navnet lagres uten
 * capitalize, slik at det er konsistent med de rå fallback-navnene ellers i appen (bl.a. erIkkeSplittbartNavn).
 */
export const getEffektivHvemPlanlegger = (
    hvemPlanlegger: HvemPlanlegger,
    fordeling: FordelingPlanlegger | undefined,
    barnet: OmBarnetPlanlegger | undefined,
    intl: IntlShape,
): HvemPlanlegger => {
    if (!barnet || !kanVelgeHvemSomStarterPermisjonen(hvemPlanlegger) || !erBarnetAdoptert(barnet)) {
        return hvemPlanlegger;
    }
    if (fordeling?.hvemStarterPermisjon !== 'søker2') {
        return hvemPlanlegger;
    }
    const { navnSøker1, navnSøker2 } = getRawNavnForHvemStarterPermisjon(hvemPlanlegger, intl);
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) {
        return {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: navnSøker2,
            navnPåMedfar: navnSøker1,
        };
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMor: navnSøker2,
            navnPåMedmor: navnSøker1,
        };
    }
    return {
        type: HvemPlanleggerType.MOR_OG_FAR,
        navnPåMor: navnSøker2,
        navnPåFar: navnSøker1,
    };
};

export const erFarSøker2 = (hvemPlanlegger: HvemPlanlegger): hvemPlanlegger is FarOgFar | MorOgFar =>
    hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR;

const getNavnPåSøker1 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR) {
        return intl.formatMessage({ id: 'Du' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR) {
        return intl.formatMessage({ id: 'Du' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return hvemPlanlegger.navnPåMor || intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) {
        return hvemPlanlegger.navnPåFar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFar1Navn' });
    }
    // Kun MOR_OG_FAR gjenstår her
    return hvemPlanlegger.navnPåMor || intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' });
};

export const getNavnPåForeldre = (
    hvemPlanlegger: HvemPlanlegger,
    intl: IntlShape,
): {
    mor: string;
    farMedmor: string;
} => {
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR) {
        return {
            farMedmor: intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' }),
            mor: intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' }),
        };
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) {
        return {
            farMedmor: erGyldigNavn(hvemPlanlegger.navnPåFar)
                ? hvemPlanlegger.navnPåFar
                : intl.formatMessage({ id: 'HvemPlanlegger.DefaultFar1Navn' }),
            mor: erGyldigNavn(hvemPlanlegger.navnPåMedfar)
                ? hvemPlanlegger.navnPåMedfar
                : intl.formatMessage({ id: 'HvemPlanlegger.DefaultFar2Navn' }),
        };
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR) {
        return {
            farMedmor: intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' }),
            mor: intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' }),
        };
    }

    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return {
            farMedmor: erGyldigNavn(hvemPlanlegger.navnPåMedmor)
                ? hvemPlanlegger.navnPåMedmor
                : intl.formatMessage({ id: 'HvemPlanlegger.DefaultMedMorNavn' }),
            mor: erGyldigNavn(hvemPlanlegger.navnPåMor)
                ? hvemPlanlegger.navnPåMor
                : intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' }),
        };
    }

    return {
        farMedmor: erGyldigNavn(hvemPlanlegger.navnPåFar)
            ? hvemPlanlegger.navnPåFar
            : intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' }),
        mor: erGyldigNavn(hvemPlanlegger.navnPåMor)
            ? hvemPlanlegger.navnPåMor
            : intl.formatMessage({ id: 'HvemPlanlegger.DefaultMorNavn' }),
    };
};

const getNavnPåSøker2 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return hvemPlanlegger.navnPåMedmor || intl.formatMessage({ id: 'HvemPlanlegger.DefaultMedMorNavn' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR) {
        return hvemPlanlegger.navnPåFar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFarNavn' });
    }
    if (hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR) {
        return hvemPlanlegger.navnPåMedfar || intl.formatMessage({ id: 'HvemPlanlegger.DefaultFar2Navn' });
    }
    return intl.formatMessage({ id: 'HvemPlanlegger.DefaultAnnenForelderNavn' });
};

/** Navn som ikke skal splittes ved henting av "fornavn" (de er allerede en kort, komplett betegnelse) */
const erIkkeSplittbartNavn = (navn: string, intl: IntlShape): boolean =>
    [
        intl.formatMessage({ id: 'HvemPlanlegger.DefaultAnnenForelderNavn' }),
        intl.formatMessage({ id: 'HvemPlanlegger.DefaultFar1Navn' }),
        intl.formatMessage({ id: 'HvemPlanlegger.DefaultFar2Navn' }),
    ].includes(navn);

export const getFornavnPåSøker1 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string => {
    const navn = getNavnPåSøker1(hvemPlanlegger, intl);
    return erIkkeSplittbartNavn(navn, intl) ? navn : navn.split(' ')[0]!;
};

export const getFornavnPåSøker2 = (hvemPlanlegger: HvemPlanlegger, intl: IntlShape): string | undefined => {
    const navn = getNavnPåSøker2(hvemPlanlegger, intl);
    if (!navn) {
        return undefined;
    }
    return erIkkeSplittbartNavn(navn, intl) ? navn : navn.split(' ')[0];
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
    const sisteBokstav = (navn.at(-1) ?? '').toLowerCase();
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
