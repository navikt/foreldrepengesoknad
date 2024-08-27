enum SøknadRoutes {
    VELKOMMEN = '/',
    SØKERSITUASJON = '/soker',
    OM_BARNET = '/barnet',
    ANNEN_FORELDER = '/den-andre-forelderen',
    PERIODE_MED_FORELDREPENGER = '/periode',
    FORDELING = '/fordeling',
    UTTAKSPLAN = '/plan',
    UTENLANDSOPPHOLD = '/utenlandsopphold',
    TIDLIGERE_UTENLANDSOPPHOLD = '/tidligere-utenlandsopphold',
    SENERE_UTENLANDSOPPHOLD = '/senere-utenlandsopphold',
    ARBEID_OG_INNTEKT = '/arbeid-og-inntekt',
    EGEN_NÆRING = '/selvstendig-naringsdrivende',
    FRILANS = '/frilans',
    ANDRE_INNTEKTER = '/andre-inntekter',
    DOKUMENTASJON = '/dokumentasjon',
    OPPSUMMERING = '/oppsummering',
    IKKE_MYNDIG = 'ikke-myndig',
}

export const ROUTES_ORDER = [
    SøknadRoutes.VELKOMMEN,
    SøknadRoutes.SØKERSITUASJON,
    SøknadRoutes.OM_BARNET,
    SøknadRoutes.ANNEN_FORELDER,
    SøknadRoutes.PERIODE_MED_FORELDREPENGER,
    SøknadRoutes.FORDELING,
    SøknadRoutes.UTTAKSPLAN,
    SøknadRoutes.UTENLANDSOPPHOLD,
    SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
    SøknadRoutes.SENERE_UTENLANDSOPPHOLD,
    SøknadRoutes.ARBEID_OG_INNTEKT,
    SøknadRoutes.FRILANS,
    SøknadRoutes.EGEN_NÆRING,
    SøknadRoutes.ANDRE_INNTEKTER,
    SøknadRoutes.DOKUMENTASJON,
    SøknadRoutes.OPPSUMMERING,
];

export const REQUIRED_APP_STEPS = [
    SøknadRoutes.SØKERSITUASJON,
    SøknadRoutes.OM_BARNET,
    SøknadRoutes.ANNEN_FORELDER,
    SøknadRoutes.PERIODE_MED_FORELDREPENGER,
    SøknadRoutes.FORDELING,
    SøknadRoutes.UTTAKSPLAN,
    SøknadRoutes.UTENLANDSOPPHOLD,
    SøknadRoutes.ARBEID_OG_INNTEKT,
    SøknadRoutes.OPPSUMMERING,
];

export const REQUIRED_APP_STEPS_ENDRINGSSØKNAD = [SøknadRoutes.UTTAKSPLAN, SøknadRoutes.OPPSUMMERING];

export default SøknadRoutes;
