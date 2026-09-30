import { links } from '@navikt/fp-constants';
import { erLokaltEllerDev } from '@navikt/fp-utils';

export const getLenker = () => {
    const erDev = erLokaltEllerDev();
    const søknadHost = erDev ? 'https://www.intern.dev.nav.no' : 'https://www.nav.no';
    const minSideHost = erDev ? 'https://www.ansatt.dev.nav.no' : 'https://www.nav.no';

    return {
        foreldrepengesoknad: `${søknadHost}/foreldrepenger/soknad`,
        svangerskapspengesoknad: `${søknadHost}/svangerskapspenger/soknad`,
        engangsstønadSøknad: `${søknadHost}/engangsstonad/soknad`,
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
