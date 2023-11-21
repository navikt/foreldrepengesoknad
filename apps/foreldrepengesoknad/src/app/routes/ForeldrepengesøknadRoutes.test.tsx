import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { allCommonMessages } from '@navikt/fp-common';
import Person from '@navikt/fp-common/src/common/types/Person';
import { IntlProvider } from '@navikt/fp-ui';
import { FpDataContext, FpDataType } from 'app/context/FpDataContext';
import SøknadRoutes from './routes';
import ForeldrepengesøknadRoutes from './ForeldrepengesøknadRoutes';
import nbMessages from '../intl/nb_NO.json';

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: { ...nbMessages, ...allCommonMessages.nb },
};

vi.mock('app/utils/hooks/useSaveLoadedRoute', () => {
    return { default: vi.fn() };
});

describe('<ForeldrepengesøknadRoutes>', () => {
    it('skal vise velkommen-side når denne ruten er valgt', async () => {
        render(
            <BrowserRouter>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <FpDataContext>
                        <ForeldrepengesøknadRoutes
                            locale="nb"
                            onChangeLocale={() => ({})}
                            lagretCurrentRoute={SøknadRoutes.VELKOMMEN}
                            søkerInfo={{
                                arbeidsforhold: [],
                                person: {
                                    fornavn: 'Ola',
                                } as Person,
                                registrerteBarn: [],
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
        render(
            <BrowserRouter>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <FpDataContext
                        initialState={{
                            [FpDataType.SØKERSITUASJON]: {
                                situasjon: 'fødsel',
                                rolle: 'mor',
                            },
                            [FpDataType.SØKER]: {
                                erAleneOmOmsorg: false,
                                språkkode: 'nb',
                                harHattAnnenInntektSiste10Mnd: false,
                                harJobbetSomFrilansSiste10Mnd: false,
                                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            },
                        }}
                    >
                        <ForeldrepengesøknadRoutes
                            locale="nb"
                            onChangeLocale={() => ({})}
                            lagretCurrentRoute={SøknadRoutes.OM_BARNET}
                            søkerInfo={{
                                person: {
                                    erMyndig: true,
                                    fornavn: 'Ola',
                                } as Person,
                                arbeidsforhold: [],
                                registrerteBarn: [],
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
