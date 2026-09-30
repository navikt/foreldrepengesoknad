const PROD_LENKER = {
    foreldrepengesoknad: 'https://www.nav.no/foreldrepenger/soknad',
    svangerskapspengesoknad: 'https://www.nav.no/svangerskapspenger/soknad',
    engangsstønadSøknad: 'https://www.nav.no/engangsstonad/soknad',
    innsyn: 'https://www.nav.no/foreldrepenger/oversikt',
    minSide: 'https://www.nav.no/minside',
    brukerprofil: 'https://www.nav.no/person/personopplysninger',
    arbeidsforholdMineSider: 'https://www.nav.no/person/personopplysninger/nb/#arbeidsforhold',
    utbetalingsoversikt: 'https://www.nav.no/utbetalingsoversikt/',
    klage: 'https://klage.nav.no/nb/klage',
    skrivTilOss: 'https://innboks.nav.no/s/skriv-til-oss?category=Familie',
} as const;

const DEV_LENKER = {
    foreldrepengesoknad: 'https://www.intern.dev.nav.no/foreldrepenger/soknad',
    svangerskapspengesoknad: 'https://www.intern.dev.nav.no/svangerskapspenger/soknad',
    engangsstønadSøknad: 'https://www.intern.dev.nav.no/engangsstonad/soknad',
    innsyn: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt',
    minSide: 'https://www.ansatt.dev.nav.no/minside',
    brukerprofil: 'https://www.ansatt.dev.nav.no/person/personopplysninger',
    arbeidsforholdMineSider: 'https://www.ansatt.dev.nav.no/person/personopplysninger/nb/#arbeidsforhold',
    utbetalingsoversikt: 'https://www.ansatt.dev.nav.no/utbetalingsoversikt/',
    klage: 'https://klage.intern.dev.nav.no/nb/klage',
    skrivTilOss: 'https://innboks.dev.nav.no/s/skriv-til-oss?category=Familie',
} as const satisfies Record<keyof typeof PROD_LENKER, string>;

const LOKALE_LENKER = {
    foreldrepengesoknad: 'http://localhost:9101/foreldrepenger/soknad',
    svangerskapspengesoknad: 'http://localhost:9102/svangerskapspenger/soknad',
    engangsstønadSøknad: 'http://localhost:9103/engangsstonad/soknad',
    innsyn: 'http://localhost:9100/foreldrepenger/oversikt',
    minSide: 'https://www.ansatt.dev.nav.no/minside',
    brukerprofil: 'https://www.ansatt.dev.nav.no/person/personopplysninger',
    arbeidsforholdMineSider: 'https://www.ansatt.dev.nav.no/person/personopplysninger/nb/#arbeidsforhold',
    utbetalingsoversikt: 'https://www.ansatt.dev.nav.no/utbetalingsoversikt/',
    klage: 'https://klage.intern.dev.nav.no/nb/klage',
    skrivTilOss: 'https://innboks.dev.nav.no/s/skriv-til-oss?category=Familie',
} as const satisfies Record<keyof typeof PROD_LENKER, string>;

export const getLenker = (hostname = globalThis.location.hostname) => {
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
        return LOKALE_LENKER;
    }

    if (hostname.endsWith('.dev.nav.no')) {
        return DEV_LENKER;
    }

    return PROD_LENKER;
};
