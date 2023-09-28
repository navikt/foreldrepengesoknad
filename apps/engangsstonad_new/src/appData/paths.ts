export enum Path {
    VELKOMMEN = '/',
    SØKERSITUASJON = '/soknad/søkersituasjon',
    OM_BARNET = '/soknad/om-barnet',
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
    Path.UTENLANDSOPPHOLD,
    Path.SISTE_UTENLANDSOPPHOLD,
    Path.NESTE_UTENLANDSOPPHOLD,
    Path.OPPSUMMERING,
    Path.KVITTERING,
];

export const MINIMUM_APP_PATH = [Path.SØKERSITUASJON, Path.OM_BARNET, Path.UTENLANDSOPPHOLD, Path.OPPSUMMERING];
