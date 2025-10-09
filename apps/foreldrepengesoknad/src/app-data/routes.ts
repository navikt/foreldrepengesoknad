import { Periode } from '@navikt/fp-common';
import { uttaksplanInneholderPerioderUtenKonto } from '@navikt/fp-uttaksplan';

export enum SøknadRoutes {
    VELKOMMEN = '/',
    SØKERSITUASJON = '/soker',
    OM_BARNET = '/barnet',
    UTENLANDSOPPHOLD = '/utenlandsopphold',
    TIDLIGERE_UTENLANDSOPPHOLD = '/tidligere-utenlandsopphold',
    SENERE_UTENLANDSOPPHOLD = '/senere-utenlandsopphold',
    ARBEID_OG_INNTEKT = '/arbeid-og-inntekt',
    EGEN_NÆRING = '/selvstendig-naringsdrivende',
    FRILANS = '/frilans',
    ANDRE_INNTEKTER = '/andre-inntekter',
    ANNEN_FORELDER = '/den-andre-forelderen',
    PERIODE_MED_FORELDREPENGER = '/periode',
    FORDELING = '/fordeling',
    UTTAKSPLAN = '/plan',
    DOKUMENTASJON = '/dokumentasjon',
    OPPSUMMERING = '/oppsummering',
    IKKE_MYNDIG = 'ikke-myndig',
    KVITTERING = '/kitttering',
}

export const ROUTES_ORDER = [
    SøknadRoutes.VELKOMMEN,
    SøknadRoutes.SØKERSITUASJON,
    SøknadRoutes.OM_BARNET,
    SøknadRoutes.UTENLANDSOPPHOLD,
    SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
    SøknadRoutes.SENERE_UTENLANDSOPPHOLD,
    SøknadRoutes.ARBEID_OG_INNTEKT,
    SøknadRoutes.FRILANS,
    SøknadRoutes.EGEN_NÆRING,
    SøknadRoutes.ANDRE_INNTEKTER,
    SøknadRoutes.ANNEN_FORELDER,
    SøknadRoutes.PERIODE_MED_FORELDREPENGER,
    SøknadRoutes.FORDELING,
    SøknadRoutes.UTTAKSPLAN,
    SøknadRoutes.DOKUMENTASJON,
    SøknadRoutes.OPPSUMMERING,
];

export const REQUIRED_APP_STEPS = [
    SøknadRoutes.SØKERSITUASJON,
    SøknadRoutes.OM_BARNET,
    SøknadRoutes.UTENLANDSOPPHOLD,
    SøknadRoutes.ARBEID_OG_INNTEKT,
    SøknadRoutes.ANNEN_FORELDER,
    SøknadRoutes.PERIODE_MED_FORELDREPENGER,
    SøknadRoutes.FORDELING,
    SøknadRoutes.UTTAKSPLAN,
    SøknadRoutes.OPPSUMMERING,
];

export const REQUIRED_APP_STEPS_ENDRINGSSØKNAD = [SøknadRoutes.UTTAKSPLAN, SøknadRoutes.OPPSUMMERING];

export const isRouteAvailable = (
    route: SøknadRoutes,
    harGodkjentVilkår: boolean,
    uttaksplan: Periode[] = [],
): boolean => {
    switch (route) {
        case SøknadRoutes.SØKERSITUASJON:
            return harGodkjentVilkår === true;
        case SøknadRoutes.OPPSUMMERING:
            return uttaksplanInneholderPerioderUtenKonto(uttaksplan) === false && uttaksplan.length > 0;
        default:
            return true;
    }
};
