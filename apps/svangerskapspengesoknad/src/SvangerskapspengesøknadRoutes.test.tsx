import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { SvpMellomlagretData, VERSJON_MELLOMLAGRING } from 'appData/useMellomlagreSøknad';
import { MemoryRouter, useLocation } from 'react-router';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EksternArbeidsforholdDto_fpoversikt, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { IntlProvider, uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';

import { SvangerskapspengesøknadRoutes } from './SvangerskapspengesøknadRoutes';
import nbMessages from './intl/nb_NO.json';

vi.mock('./pages/forside/Forside', () => ({ Forside: () => null }));

const AKTIV_ID = '975326209';
const ANNEN_AKTIV_ID = '990322244';
const INAKTIV_ID = '896929119';

const lagArbeidsforhold = (id: string, tom?: string): EksternArbeidsforholdDto_fpoversikt => ({
    arbeidsgiverId: id,
    arbeidsgiverIdType: 'orgnr',
    arbeidsgiverNavn: `Arbeidsgiver ${id}`,
    fom: '2025-01-01',
    tom,
    stillingsprosent: 100,
});

const søkerInfo: SvpPersonopplysningerDto_fpoversikt = {
    fnr: '12345678901',
    fødselsdato: '1990-01-01',
    kjønn: 'K',
    navn: { fornavn: 'Kari', etternavn: 'Nordmann' },
    frilansoppdrag: [],
    selvstendigNæring: [],
    arbeidsforhold: [
        lagArbeidsforhold(AKTIV_ID),
        lagArbeidsforhold(ANNEN_AKTIV_ID),
        lagArbeidsforhold(INAKTIV_ID, '2025-06-01'),
    ],
};

const Lokasjon = () => <div data-testid="lokasjon">{useLocation().pathname}</div>;

const renderMedMellomlagretRute = (appRoute: string) => {
    const mellomlagretData: SvpMellomlagretData = {
        version: VERSJON_MELLOMLAGRING,
        søkerInfo,
        [ContextDataType.APP_ROUTE]: appRoute,
        [ContextDataType.OM_BARNET]: { erBarnetFødt: false, fødselsdato: undefined, termindato: '2026-12-01' },
        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
            harHattArbeidIUtlandet: false,
            harJobbetSomFrilans: false,
            harJobbetSomSelvstendigNæringsdrivende: false,
        },
        [ContextDataType.VALGTE_ARBEIDSFORHOLD]: [AKTIV_ID, ANNEN_AKTIV_ID, INAKTIV_ID],
    };

    return render(
        <QueryClientProvider client={new QueryClient()}>
            <IntlProvider
                locale="nb"
                messagesGroupedByLocale={{
                    nb: {
                        ...nbMessages,
                        ...uiMessages.nb,
                        ...formHookMessages.nb,
                        ...utilsMessages.nb,
                        ...filopplasterMessages.nb,
                        ...arbeidsforholdOgInntektMessages.nb,
                    },
                }}
            >
                <MemoryRouter>
                    <SvpDataContext initialState={mellomlagretData}>
                        <SvangerskapspengesøknadRoutes søkerInfo={søkerInfo} mellomlagretData={mellomlagretData} />
                    </SvpDataContext>
                    <Lokasjon />
                </MemoryRouter>
            </IntlProvider>
        </QueryClientProvider>,
    );
};

describe('<SvangerskapspengesøknadRoutes>', () => {
    it('skal sende til arbeidsforhold-steget når mellomlagret rute gjelder et arbeidsforhold som ikke lenger er gyldig', async () => {
        renderMedMellomlagretRute(addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, INAKTIV_ID));

        expect(await screen.findByText(SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT)).toBeInTheDocument();
    });

    it('skal beholde mellomlagret rute når arbeidsforholdet fortsatt er gyldig', async () => {
        const rute = addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, AKTIV_ID);
        renderMedMellomlagretRute(rute);

        expect(await screen.findByText(rute)).toBeInTheDocument();
        expect(await screen.findByText('Neste steg')).toBeInTheDocument();
        expect(screen.getByTestId('lokasjon')).toHaveTextContent(rute);
    });
});
