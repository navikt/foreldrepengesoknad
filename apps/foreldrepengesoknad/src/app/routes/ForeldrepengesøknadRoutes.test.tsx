import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { allCommonMessages, Søkerinfo } from '@navikt/fp-common';
import SøknadRoutes from './routes';
import * as context from 'app/context/hooks/useForeldrepengesøknadContext';
import ForeldrepengesøknadRoutes from './ForeldrepengesøknadRoutes';
import { Søknad } from 'app/context/types/Søknad';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Person from '@navikt/fp-common/src/common/types/Person';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/nb_NO.json';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
};

vi.mock('app/utils/hooks/useSaveLoadedRoute', () => {
    return { default: vi.fn() };
});

describe('<ForeldrepengesøknadRoutes>', () => {
    const state: ForeldrepengesøknadContextState = {
        version: 5,
        currentRoute: SøknadRoutes.VELKOMMEN,
        søkerinfo: {
            arbeidsforhold: [],
            person: {
                fornavn: 'Ola',
            } as Person,
            registrerteBarn: [],
        } as Søkerinfo,
        søknad: {
            søker: {
                språkkode: 'nb',
            },
        } as Søknad,
        saker: [],
        kvittering: undefined!,
        antallUkerIUttaksplan: undefined!,
        endringstidspunkt: undefined,
        perioderSomSkalSendesInn: [],
        harUttaksplanBlittSlettet: false,
        brukerSvarteJaPåAutoJustering: undefined,
        søknadGjelderEtNyttBarn: undefined!,
        barnFraNesteSak: undefined,
        manglerDokumentasjon: false,
    };

    it('skal vise velkommen-side når denne ruten er valgt', async () => {
        vi.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state,
            dispatch: () => vi.fn(),
        }));
        render(
            <BrowserRouter>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ForeldrepengesøknadRoutes
                        fornavn="Espen"
                        locale="nb"
                        onChangeLocale={() => ({})}
                        currentRoute={SøknadRoutes.VELKOMMEN}
                    />
                </IntlProvider>
            </BrowserRouter>,
        );

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
    });

    it('skal vise om-barnet-side når denne ruten er valgt', async () => {
        vi.spyOn(context, 'useForeldrepengesøknadContext').mockImplementation(() => ({
            state: {
                ...state,
                currentRoute: SøknadRoutes.OM_BARNET,
                søknad: {
                    harGodkjentVilkår: true,
                    søkersituasjon: {
                        situasjon: 'fødsel',
                        rolle: 'mor',
                    },
                    søker: {
                        språkkode: 'nb',
                    },
                } as Søknad,
                søkerinfo: {
                    person: {
                        erMyndig: true,
                        fornavn: 'Ola',
                    } as Person,
                    arbeidsforhold: [],
                    registrerteBarn: [],
                } as Søkerinfo,
                saker: [],
                søknadGjelderEtNyttBarn: true,
            },
            dispatch: () => vi.fn(),
        }));
        render(
            <BrowserRouter>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ForeldrepengesøknadRoutes
                        fornavn="Espen"
                        locale="nb"
                        onChangeLocale={() => ({})}
                        currentRoute={SøknadRoutes.OM_BARNET}
                    />
                </IntlProvider>
            </BrowserRouter>,
        );

        expect(await screen.findByText('Barnet')).toBeInTheDocument();
        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
    });
});
