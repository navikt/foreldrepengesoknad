export enum Path {
    VELKOMMEN = '/velkommen',
    SØKERSITUASJON = '/soknad/søkersituasjon',
    OM_BARNET = '/soknad/om-barnet',
    DOKUMENTASJON = '/soknad/dokumentasjon',
    UTENLANDSOPPHOLD = '/soknad/utenlandsopphold',
    SISTE_UTENLANDSOPPHOLD = '/soknad/siste-utenlandsopphold',
    NESTE_UTENLANDSOPPHOLD = '/soknad/neste-utenlandsopphold',
    OPPSUMMERING = '/soknad/oppsummering',
    KVITTERING = '/kvittering',
}

export const PATH_ORDER = [
    Path.VELKOMMEN,
    Path.SØKERSITUASJON,
    Path.OM_BARNET,
    Path.DOKUMENTASJON,
    Path.UTENLANDSOPPHOLD,
    Path.SISTE_UTENLANDSOPPHOLD,
    Path.NESTE_UTENLANDSOPPHOLD,
    Path.OPPSUMMERING,
    Path.KVITTERING,
];

export const REQUIRED_APP_STEPS = [
    Path.SØKERSITUASJON,
    Path.OM_BARNET,
    Path.DOKUMENTASJON,
    Path.UTENLANDSOPPHOLD,
    Path.OPPSUMMERING,
];
