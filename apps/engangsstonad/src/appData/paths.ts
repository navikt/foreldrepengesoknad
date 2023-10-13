export enum Path {
    VELKOMMEN = '/velkommen',
    SØKERSITUASJON = '/soknad/søkersituasjon',
    OM_BARNET = '/soknad/om-barnet',
    TERMINBEKREFTELSE = '/soknad/terminbekreftelse',
    ADOPSJONSBEKREFTELSE = '/soknad/adopsjonsbekreftelse',
    UTENLANDSOPPHOLD = '/soknad/utenlandsopphold',
    UTENLANDSOPPHOLD_PERIODER = '/soknad/utenlandsopphold-perioder',
    OPPSUMMERING = '/soknad/oppsummering',
    KVITTERING = '/kvittering',
}

export const PATH_ORDER = [
    Path.VELKOMMEN,
    Path.SØKERSITUASJON,
    Path.OM_BARNET,
    Path.TERMINBEKREFTELSE,
    Path.ADOPSJONSBEKREFTELSE,
    Path.UTENLANDSOPPHOLD,
    Path.UTENLANDSOPPHOLD_PERIODER,
    Path.OPPSUMMERING,
    Path.KVITTERING,
];

export const REQUIRED_APP_STEPS = [Path.SØKERSITUASJON, Path.OM_BARNET, Path.UTENLANDSOPPHOLD, Path.OPPSUMMERING];
