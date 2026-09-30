import { erLokaltEllerDev } from '@navikt/fp-utils';

import { getLenker } from './lenker';

vi.mock('@navikt/fp-utils', { spy: true });

describe('getLenker', () => {
    afterEach(() => {
        vi.mocked(erLokaltEllerDev).mockReset();
    });

    it('bruker dev-adresser lokalt og i dev', () => {
        vi.mocked(erLokaltEllerDev).mockReturnValue(true);

        expect(getLenker()).toEqual({
            foreldrepengesoknad: 'https://www.intern.dev.nav.no/foreldrepenger/soknad',
            svangerskapspengesoknad: 'https://www.intern.dev.nav.no/svangerskapspenger/soknad',
            engangsstønadSøknad: 'https://www.intern.dev.nav.no/engangsstonad/soknad',
            minSide: 'https://www.ansatt.dev.nav.no/minside',
            brukerprofil: 'https://www.ansatt.dev.nav.no/person/personopplysninger',
            arbeidsforholdMineSider: 'https://www.ansatt.dev.nav.no/person/personopplysninger/nb/#arbeidsforhold',
            utbetalingsoversikt: 'https://www.ansatt.dev.nav.no/utbetalingsoversikt/',
            klage: 'https://klage.intern.dev.nav.no/nb/klage',
            skrivTilOss: 'https://innboks.dev.nav.no/s/skriv-til-oss?category=Familie',
        });
    });

    it('bruker produksjonsadresser i prod', () => {
        vi.mocked(erLokaltEllerDev).mockReturnValue(false);

        expect(getLenker()).toEqual({
            foreldrepengesoknad: 'https://www.nav.no/foreldrepenger/soknad',
            svangerskapspengesoknad: 'https://www.nav.no/svangerskapspenger/soknad',
            engangsstønadSøknad: 'https://www.nav.no/engangsstonad/soknad',
            minSide: 'https://www.nav.no/minside',
            brukerprofil: 'https://www.nav.no/person/personopplysninger',
            arbeidsforholdMineSider: 'https://www.nav.no/person/personopplysninger/nb/#arbeidsforhold',
            utbetalingsoversikt: 'https://www.nav.no/utbetalingsoversikt/',
            klage: 'https://klage.nav.no/nb/klage',
            skrivTilOss: 'https://innboks.nav.no/s/skriv-til-oss?category=Familie',
        });
    });
});
