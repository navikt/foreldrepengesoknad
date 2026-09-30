import { links } from '@navikt/fp-constants';

export const getLenker = (hostname = globalThis.location.hostname) => {
    const erLokalt = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
    const erDev = erLokalt || hostname.endsWith('.dev.nav.no');
    const søknadHost = erDev ? 'https://www.intern.dev.nav.no' : 'https://www.nav.no';
    const minSideHost = erDev ? 'https://www.ansatt.dev.nav.no' : 'https://www.nav.no';

    return {
        foreldrepengesoknad: `${erLokalt ? 'http://localhost:9101' : søknadHost}/foreldrepenger/soknad`,
        svangerskapspengesoknad: `${erLokalt ? 'http://localhost:9102' : søknadHost}/svangerskapspenger/soknad`,
        engangsstønadSøknad: `${erLokalt ? 'http://localhost:9103' : søknadHost}/engangsstonad/soknad`,
        innsyn: `${erLokalt ? 'http://localhost:9100' : søknadHost}/foreldrepenger/oversikt`,
        minSide: `${minSideHost}/minside`,
        brukerprofil: erDev ? 'https://www.ansatt.dev.nav.no/person/personopplysninger' : links.brukerprofil,
        arbeidsforholdMineSider: erDev
            ? 'https://www.ansatt.dev.nav.no/person/personopplysninger/nb/#arbeidsforhold'
            : links.arbeidsforholdMineSider,
        utbetalingsoversikt: erDev ? 'https://www.ansatt.dev.nav.no/utbetalingsoversikt/' : links.utbetalingsoversikt,
        klage: erDev ? 'https://klage.intern.dev.nav.no/nb/klage' : 'https://klage.nav.no/nb/klage',
        skrivTilOss: erDev ? 'https://innboks.dev.nav.no/s/skriv-til-oss?category=Familie' : links.skrivTilOss,
    } as const;
};
