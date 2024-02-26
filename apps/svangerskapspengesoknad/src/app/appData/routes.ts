enum SøknadRoutes {
    FORSIDE = '/',
    BARNET = '/barnet',
    UTENLANDSOPPHOLD = '/utenlandsopphold',
    HAR_BODD_I_UTLANDET = '/har-bodd-i-utlandet',
    SKAL_BO_I_UTLANDET = '/skal-bo-i-utlandet',
    INNTEKTSINFORMASJON = '/arbeid',
    FRILANS = '/frilans',
    NÆRING = '/naering',
    ARBEID_I_UTLANDET = '/arbeid-i-utlandet',
    VELG_ARBEID = '/velg-arbeid',
    SKJEMA = '/skjema',
    TILRETTELEGGING = '/tilrettelegging',
    PERIODER = '/perioder',
    OPPSUMMERING = '/oppsummering',
}

export const ROUTES_ORDER = [
    SøknadRoutes.FORSIDE,
    SøknadRoutes.BARNET,
    SøknadRoutes.UTENLANDSOPPHOLD,
    SøknadRoutes.HAR_BODD_I_UTLANDET,
    SøknadRoutes.SKAL_BO_I_UTLANDET,
    SøknadRoutes.INNTEKTSINFORMASJON,
    SøknadRoutes.FRILANS,
    SøknadRoutes.NÆRING,
    SøknadRoutes.ARBEID_I_UTLANDET,
    SøknadRoutes.VELG_ARBEID,
    SøknadRoutes.SKJEMA,
    SøknadRoutes.TILRETTELEGGING,
    SøknadRoutes.PERIODER,
    SøknadRoutes.OPPSUMMERING,
];

export const REQUIRED_APP_STEPS = [
    SøknadRoutes.BARNET,
    SøknadRoutes.UTENLANDSOPPHOLD,
    SøknadRoutes.INNTEKTSINFORMASJON,
    SøknadRoutes.SKJEMA,
    SøknadRoutes.TILRETTELEGGING,
    SøknadRoutes.OPPSUMMERING,
];

export default SøknadRoutes;
