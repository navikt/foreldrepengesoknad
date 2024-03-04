enum SøknadRoutes {
    VELKOMMEN = '/',
    SØKERSITUASJON = '/soknad/sokersituasjon',
    OM_BARNET = '/soknad/om-barnet',
    ANNEN_FORELDER = '/soknad/annen-forelder',
    PERIODE_MED_FORELDREPENGER = '/soknad/periode-med-foreldrepenger',
    FORDELING = '/soknad/fordeling',
    UTTAKSPLAN = '/soknad/uttaksplan',
    UTENLANDSOPPHOLD = '/soknad/utenlandsopphold',
    TIDLIGERE_UTENLANDSOPPHOLD = '/soknad/tidligere-utenlandsopphold',
    SENERE_UTENLANDSOPPHOLD = '/soknad/senere-utenlandsopphold',
    INNTEKTSINFORMASJON = '/soknad/inntektsinformasjon',
    DOKUMENTASJON = '/soknad/dokumentasjon',
    OPPSUMMERING = '/soknad/oppsummering',
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
    SøknadRoutes.DOKUMENTASJON,
    SøknadRoutes.UTENLANDSOPPHOLD,
    SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
    SøknadRoutes.SENERE_UTENLANDSOPPHOLD,
    SøknadRoutes.INNTEKTSINFORMASJON,
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
    SøknadRoutes.INNTEKTSINFORMASJON,
    SøknadRoutes.OPPSUMMERING,
];

export const REQUIRED_APP_STEPS_ENDRINGSSØKNAD = [SøknadRoutes.UTTAKSPLAN, SøknadRoutes.OPPSUMMERING];

export default SøknadRoutes;
