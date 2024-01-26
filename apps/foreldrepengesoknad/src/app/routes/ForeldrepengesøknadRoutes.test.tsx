import { allCommonMessages } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søker, SøkerBarn } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';
import { render, screen } from '@testing-library/react';
import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import { BrowserRouter } from 'react-router-dom';
import nbMessages from '../intl/nb_NO.json';
import ForeldrepengesøknadRoutes from './ForeldrepengesøknadRoutes';
import SøknadRoutes from './routes';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
};

vi.mock('app/utils/hooks/useSaveLoadedRoute', () => {
    return { default: vi.fn() };
});

describe('<ForeldrepengesøknadRoutes>', () => {
    it('skal vise velkommen-side når denne ruten er valgt', async () => {
        initAmplitude();
        render(
            <BrowserRouter>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <FpDataContext>
                        <ForeldrepengesøknadRoutes
                            locale="nb"
                            onChangeLocale={() => ({})}
                            currentRoute={SøknadRoutes.VELKOMMEN}
                            søkerInfo={{
                                arbeidsforhold: [],
                                søker: {
                                    fornavn: 'Ola',
                                    barn: [] as SøkerBarn[],
                                } as Søker,
                            }}
                            saker={[]}
                            lagretErEndringssøknad={false}
                            lagretHarGodkjentVilkår={false}
                            setKvittering={() => undefined}
                        />
                    </FpDataContext>
                </IntlProvider>
            </BrowserRouter>,
        );

        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
    });

    it('skal vise om-barnet-side når denne ruten er valgt', async () => {
        initAmplitude();
        render(
            <BrowserRouter>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <FpDataContext
                        initialState={{
                            [ContextDataType.SØKERSITUASJON]: {
                                situasjon: 'fødsel',
                                rolle: 'mor',
                            },
                            [ContextDataType.SØKER_DATA]: {
                                harHattAnnenInntektSiste10Mnd: false,
                                harJobbetSomFrilansSiste10Mnd: false,
                                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            },
                        }}
                    >
                        <ForeldrepengesøknadRoutes
                            locale="nb"
                            onChangeLocale={() => ({})}
                            currentRoute={SøknadRoutes.OM_BARNET}
                            søkerInfo={{
                                søker: {
                                    fornavn: 'Ola',
                                    barn: [] as SøkerBarn[],
                                    fødselsdato: '2000-01-01',
                                } as Søker,
                                arbeidsforhold: [],
                            }}
                            saker={[]}
                            lagretErEndringssøknad={false}
                            lagretHarGodkjentVilkår
                            lagretSøknadGjelderNyttBarn={false}
                            setKvittering={() => undefined}
                        />
                    </FpDataContext>
                </IntlProvider>
            </BrowserRouter>,
        );

        expect(await screen.findByText('Barnet')).toBeInTheDocument();
        expect(await screen.findByText('Er barnet født?')).toBeInTheDocument();
    });
});
