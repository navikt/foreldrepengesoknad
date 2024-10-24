export enum SøknadRoute {
    FORSIDE = '/',
    BARNET = '/barnet',
    UTENLANDSOPPHOLD = '/utenlandsopphold',
    HAR_BODD_I_UTLANDET = '/har-bodd-i-utlandet',
    SKAL_BO_I_UTLANDET = '/skal-bo-i-utlandet',
    ARBEIDSFORHOLD_OG_INNTEKT = '/arbeid',
    FRILANS = '/frilans',
    NÆRING = '/naering',
    ARBEID_I_UTLANDET = '/arbeid-i-utlandet',
    VELG_ARBEID = '/velg-arbeid',
    SKJEMA = '/skjema',
    TILRETTELEGGING = '/tilrettelegging',
    PERIODER = '/perioder',
    OPPSUMMERING = '/oppsummering',
}

export type RouteParams = {
    tilretteleggingId: string;
};

export const TILRETTELEGGING_PARAM = ':tilretteleggingId';

export const addTilretteleggingIdToRoute = (route: SøknadRoute, id: string) => {
    if ([SøknadRoute.SKJEMA, SøknadRoute.TILRETTELEGGING, SøknadRoute.PERIODER].includes(route)) {
        return `${route}/${id}`;
    }
    throw new Error(`Rute ${route} kan ikke ha param`);
};
